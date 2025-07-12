// history.js - Hiển thị lịch sử đơn hàng và in hóa đơn
document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem('userLoggedIn');
  
  if (!username) {
    alert('Vui lòng đăng nhập để xem lịch sử đơn hàng!');
    window.location.href = 'SignIn.html';
    return;
  }

  const greetingElement = document.querySelector(".navbar-greeting span");
  if (greetingElement) {
    const displayName = username.split('@')[0];
    greetingElement.textContent = `Xin chào, ${displayName}!`;
  }

  const bookingHistory = JSON.parse(localStorage.getItem(`bookingHistory_${username}`)) || [];
  const orderHistory = JSON.parse(localStorage.getItem(`orderHistory_${username}`)) || [];

  const container = document.getElementById("history-container");
  if (!container) {
    console.error("Thiếu phần tử #history-container trong HTML.");
    return;
  }

  // Kiểm tra nếu không có lịch sử nào
  if (bookingHistory.length === 0 && orderHistory.length === 0) {
    container.innerHTML = `
      <div class="empty-history">
        <i class="fas fa-shopping-bag"></i>
        <h3>Bạn chưa có đơn hàng nào</h3>
        <p>Hãy mua sắm và tạo đơn hàng đầu tiên của bạn!</p>
        <a href="menu.html" class="back-btn">
          <i class="fas fa-utensils"></i> Xem menu
        </a>
      </div>
    `;
    return;
  }

  // Hiển thị lịch sử đặt bàn
  let bookingHtml = '';
  if (bookingHistory.length > 0) {
    bookingHtml += `
      <div class="history-section">
        <h2 style="color:#b08968; margin-bottom:12px;">
          <i class="fas fa-calendar-check"></i> Lịch sử đặt bàn (${bookingHistory.length} đơn)
        </h2>
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
          <td>${b.createdAt ? new Date(b.createdAt).toLocaleString('vi-VN') : 'N/A'}</td>
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
    bookingHtml += '</tbody></table></div><br>';
  }

  // Hiển thị bảng lịch sử đơn hàng
  let html = '';
  if (orderHistory.length > 0) {
    html += `
      <div class="history-section">
        <h2 style="color:#b08968; margin-bottom:12px;">
          <i class="fas fa-shopping-cart"></i> Lịch sử mua hàng (${orderHistory.length} đơn)
        </h2>
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
        `<div>${item.name} (x${item.quantity}) - ${item.price.toLocaleString('vi-VN')} VNĐ</div>`
      ).join("");
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${order.date}</td>
          <td style="font-weight: bold; color: #d19151;">${order.total.toLocaleString('vi-VN')} VNĐ</td>
          <td data-total="${order.total}">
            <div style="margin-bottom: 10px;">
              <strong>Sản phẩm:</strong>
              ${itemList}
            </div>
            <hr>
            <div><strong>Họ tên:</strong> ${order.customer?.name || "N/A"}</div>
            <div><strong>SĐT:</strong> ${order.customer?.phone || "N/A"}</div>
            <div><strong>Email:</strong> ${order.customer?.email || "N/A"}</div>
            <div><strong>Thanh toán:</strong> ${order.customer?.method || "N/A"}</div>
            <button class="print-btn" onclick="printOrder(this)" style="margin-top: 10px; background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
              🖨️ In hóa đơn
            </button>
          </td>
        </tr>
      `;
    });
    html += `</tbody></table></div>`;
  }
  
  container.innerHTML = bookingHtml + html;

  // Xử lý nút xóa lịch sử
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
  const cloned = td.cloneNode(true);
  const printBtn = cloned.querySelector(".print-btn");

  if (printBtn) printBtn.remove();
  const total = td.getAttribute("data-total");
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
    <head>
      <title>Hóa đơn - Syntax Cafe</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          padding: 20px; 
          max-width: 600px; 
          margin: 0 auto; 
        }
        h2 { 
          text-align: center; 
          color: #b08968; 
          border-bottom: 2px solid #b08968; 
          padding-bottom: 10px; 
        }
        div { margin-bottom: 6px; }
        hr { margin: 10px 0; border: 1px solid #eee; }
        .total-print { 
          font-size: 18px; 
          color: #b08968; 
          font-weight: bold; 
          margin-top: 18px; 
          border-top: 2px solid #b08968; 
          padding-top: 10px; 
        }
        .header-print {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo {
          font-size: 24px;
          color: #b08968;
          margin-bottom: 5px;
        }
        .date-print {
          color: #666;
          font-size: 14px;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header-print">
        <div class="logo">☕ Syntax Cafe</div>
        <div class="date-print">Ngày in: ${new Date().toLocaleString('vi-VN')}</div>
      </div>
      <h2>🧾 HÓA ĐƠN MUA HÀNG</h2>
      ${cloned.innerHTML}
      <div class="total-print">Tổng tiền: ${Number(total).toLocaleString('vi-VN')} VNĐ</div>
      <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
        Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

