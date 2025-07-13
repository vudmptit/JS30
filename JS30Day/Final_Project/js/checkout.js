// checkout.js - Xử lý hiển thị đơn hàng và xác nhận thanh toán
document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("userLoggedIn");
  if (!username) {
    localStorage.setItem("redirectAfterLogin", window.location.href);
    alert("Bạn cần đăng nhập để thanh toán.");
    window.location.href = "SignIn.html";
    return;
  }

  const cartKey = `cart_${username}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const summary = document.getElementById("checkout-summary");
  const form = document.getElementById("checkout-form");

  if (!summary || !form) {
    console.error("Thiếu phần tử #checkout-summary hoặc #checkout-form trong HTML.");
    return;
  }
  if (cart.length === 0) {
    summary.innerHTML = "<p>Giỏ hàng trống.</p>";
    form.style.display = "none";
    return;
  }

  // Hiển thị đơn hàng với ảnh, tên, số lượng, thành tiền
  let total = 0;
  let html = "";
  cart.forEach(item => {
    const qty = item.quantity || 1;
    const itemTotal = item.price * qty;
    total += itemTotal;

    const imageUrl = item.img || item.imageUrl || '';
    html += `
      <div class="checkout-item">
        <img src="${imageUrl}" alt="ảnh" class="checkout-img">
        <div class="checkout-item-info">
          <span><strong>${item.name}</strong></span>
          <span>Số lượng: x${qty}</span>
          <span>Thành tiền: ${itemTotal.toLocaleString()} đ</span>
        </div>
      </div>
    `;
  });
  html += `<p class="checkout-total"><strong>Tổng cộng: ${total.toLocaleString()} đ</strong></p>`;
  summary.innerHTML = html;

  // Xử lý chọn phương thức thanh toán 
  const paymentSelect = document.getElementById("payment-method");
  if (paymentSelect) {
    paymentSelect.addEventListener("change", function () {
      const value = this.value;
      const qrBank = document.getElementById("qr-bank");
      const qrMomo = document.getElementById("qr-momo");
      if (qrBank) qrBank.style.display = "none";
      if (qrMomo) qrMomo.style.display = "none";
      if (value === "bank" && qrBank) qrBank.style.display = "block";
      else if (value === "momo" && qrMomo) qrMomo.style.display = "block";
    });
  }

  // Xử lý submit thanh toán
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("fullname")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const method = paymentSelect ? paymentSelect.value : "";
    if (!name || !phone || !email || !method) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    // Tạo đơn hàng
    const order = {
      items: cart,
      total: total,
      date: new Date().toLocaleString(),
      customer: { name, phone, email, method }
    };
    // Lưu vào lịch sử đơn hàng
    const historyKey = `orderHistory_${username}`;
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    history.push(order);
    localStorage.setItem(historyKey, JSON.stringify(history));
    localStorage.removeItem(cartKey);
    alert("Thanh toán thành công! Đơn hàng đã được lưu.");
    window.location.href = "history.html";
  });
});
