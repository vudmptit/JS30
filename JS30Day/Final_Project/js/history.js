// history.js - Hiển thị lịch sử đơn hàng và in hóa đơ
document.addEventListener("DOMContentLoaded", function () {
  // Lấy username hiện tại
  const username = localStorage.getItem('userLoggedIn') || 'guest';
  // Lấy lịch sử đặt bàn và order theo user
  const bookingHistory = JSON.parse(localStorage.getItem(`bookingHistory_${username}`)) || [];
  const orderHistory = JSON.parse(localStorage.getItem(`orderHistory_${username}`)) || [];

  // Lấy phần tử chứa lịch sử (cần có trong HTML)
  const container = document.getElementById("history-container");
  if (!container) {
    console.error("Thiếu phần tử #history-container trong HTML.");
    return;
  }

  // Nếu không có đơn hàng nào
  if (orderHistory.length === 0) {
    container.innerHTML = '<p style="text-align: center;">Bạn chưa có đơn hàng nào.</p>';
    return;
  }

  // Hiển thị lịch sử đặt bàn chi tiết nếu có
  let bookingHtml = '';
  if (bookingHistory.length > 0) {
    bookingHtml += `
      <h2 style="color:#b08968; margin-bottom:12px;">Lịch sử đặt bàn</h2>
      <table class="history-table" border="1" cellpadding="10" cellspacing="0">
        <thead>
          <tr>
            <th>STT</th>
            <th>Thời gian đặt</th>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Số khách</th>
            <th>Khu vực</th>
          </tr>
        </thead>
        <tbody>
    `;
    bookingHistory.forEach((b, idx) => {
      bookingHtml += `
        <tr>
          <td>${idx + 1}</td>
          <td>${b.createdAt ? new Date(b.createdAt).toLocaleString('vi-VN') : ''}</td>
          <td>${b.name}</td>
          <td>${b.phone}</td>
          <td>${b.email}</td>
          <td>${b.date}</td>
          <td>${b.time}</td>
          <td>${b.guest}</td>
          <td>${b.area}</td>
        </tr>
      `;
    });
    bookingHtml += '</tbody></table><br>';
  }

  // Hiển thị bảng lịch sử đơn hàng
  let html = '';
  if (orderHistory.length > 0) {
    html += `
      <table class="history-table" border="1" cellpadding="10" cellspacing="0">
        <thead>
          <tr>
            <th>STT</th>
            <th>Thời gian đặt</th>
            <th>Tổng tiền</th>
            <th>Thông tin đơn hàng</th>
          </tr>
        </thead>
        <tbody>
    `;
    orderHistory.forEach((order, index) => {
      const itemList = order.items.map(item =>
        `<div>${item.name} (x${item.quantity})</div>`
      ).join("");
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${order.date}</td>
          <td>${order.total.toLocaleString('vi-VN')} VNĐ</td>
          <td data-total="${order.total}">
            ${itemList}
            <hr>
            <div><strong>Họ tên:</strong> ${order.customer?.name || ""}</div>
            <div><strong>SĐT:</strong> ${order.customer?.phone || ""}</div>
            <div><strong>Email:</strong> ${order.customer?.email || ""}</div>
            <div><strong>Thanh toán:</strong> ${order.customer?.method || ""}</div>
            <button class="print-btn" onclick="printOrder(this)">🖨️ In hóa đơn</button>
          </td>
        </tr>
      `;
    });
    html += `</tbody></table>`;
  }
  container.innerHTML = bookingHtml + html;

  // Xử lý nút xóa lịch sử (cần có button#clear-history-btn)
  const clearBtn = document.getElementById("clear-history-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      const confirmClear = confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử mua hàng?");
      if (confirmClear) {
        localStorage.removeItem(`orderHistory_${username}`);
        alert("Đã xóa toàn bộ lịch sử mua hàng.");
        location.reload();
      }
    });
  }

  // --- Bổ sung chức năng xóa cho lịch sử đặt bàn ---
  // Xóa lịch sử đặt bàn
  const clearBookingBtn = document.getElementById('clear-booking-btn');
  if (clearBookingBtn) {
    clearBookingBtn.addEventListener('click', function () {
      const confirmClear = confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử đặt bàn?');
      if (confirmClear) {
        localStorage.removeItem(`bookingHistory_${username}`);
        alert('Đã xóa toàn bộ lịch sử đặt bàn.');
        location.reload();
      }
    });
  }
});

// Hàm in hóa đơn (dùng window.open)
function printOrder(button) {
  const td = button.closest("td");
  if (!td) return;
  // Clone nội dung đơn hàng
  const cloned = td.cloneNode(true);
  // Xóa nút in trong bản sao
  const printBtn = cloned.querySelector(".print-btn");
  if (printBtn) printBtn.remove();
  // Lấy tổng tiền từ thuộc tính data-total
  const total = td.getAttribute("data-total");
  // Mở popup và in
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
    <head>
      <title>Hóa đơn</title>
      <style>
        body { font-family: Arial; padding: 20px; }
        h2 { text-align: center; }
        div { margin-bottom: 6px; }
        hr { margin: 10px 0; }
        .total-print { font-size: 18px; color: #b08968; font-weight: bold; margin-top: 18px; border-top: 2px solid #b08968; padding-top: 10px; }
      </style>
    </head>
    <body>
      <h2>🧾 HÓA ĐƠN MUA HÀNG</h2>
      ${cloned.innerHTML}
      <div class="total-print">Tổng tiền: ${Number(total).toLocaleString('vi-VN')} VNĐ</div>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

