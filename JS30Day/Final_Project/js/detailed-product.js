document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));
  const products = JSON.parse(localStorage.getItem("menuProducts")) || [];
  const product = products[productId];
  const container = document.getElementById("product-detail-content");

  if (!product) {
    container.innerHTML = "<p>Không tìm thấy sản phẩm!</p>";
    return;
  }

  // Lấy đánh giá
  const allReviews = JSON.parse(localStorage.getItem("productReviews")) || {};
  const reviews = allReviews[productId] || [];
  const avgRating = reviews.length ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1) : 0;

  // Hiển thị chi tiết sản phẩm
  let starHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.round(avgRating)) starHtml += '<i class="fa-solid fa-star" style="color:#d19151"></i>';
    else starHtml += '<i class="fa-regular fa-star" style="color:#b08968"></i>';
  }

  container.innerHTML = `
    <div class="product-detail-container">
      <img src="${product.img}" alt="${product.name}" class="product-detail-img" />
      <div class="product-detail-info">
        <h2>${product.name}</h2>
        <div class="product-price">${product.price.toLocaleString('vi-VN')} VND</div>
        <div class="product-desc">${product.desc}</div>
        <div class="product-rating">Đánh giá trung bình: <span style="color:#d19151;font-weight:600;">${avgRating}</span> ${starHtml} (${reviews.length} đánh giá)</div>
        <button id="add-to-cart-btn" class="btn-order" style="margin-top: 20px; padding: 12px 24px; background: linear-gradient(90deg, #b08968 60%, #d19151 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
          <i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  `;

  // Thêm sự kiện cho nút thêm vào giỏ hàng
  document.getElementById("add-to-cart-btn").addEventListener("click", function() {
    const username = localStorage.getItem("userLoggedIn") || "guest";
    const cartKey = `cart_${username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    let found = false;
    for (let item of cart) {
      if (item.name === product.name && item.price === product.price && item.img === product.img) {
        item.quantity = (item.quantity || 1) + 1;
        found = true;
        break;
      }
    }

    if (!found) {
      cart.push({ 
        name: product.name, 
        price: product.price, 
        img: product.img, 
        quantity: 1 
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  });

  renderReviews(productId);

  document.getElementById("submit-review").addEventListener("click", () => {
    const username = localStorage.getItem("userLoggedIn") || "Ẩn danh";
    const stars = parseInt(document.getElementById("review-stars").value);
    const comment = document.getElementById("review-comment").value.trim();
    if (!comment) {
      alert("Vui lòng nhập nhận xét.");
      return;
    }
    const allReviews = JSON.parse(localStorage.getItem("productReviews")) || {};
    const reviews = allReviews[productId] || [];
    reviews.push({ stars, comment, username });
    allReviews[productId] = reviews;
    localStorage.setItem("productReviews", JSON.stringify(allReviews));
    document.getElementById("review-comment").value = "";
    renderReviews(productId);
    alert("Cảm ơn bạn đã đánh giá!");
  });
});

function renderReviews(productId) {
  const list = document.getElementById("review-list");
  const allReviews = JSON.parse(localStorage.getItem("productReviews")) || {};
  const reviews = allReviews[productId] || [];
  if (reviews.length === 0) {
    list.innerHTML = "<p>Chưa có đánh giá nào.</p>";
    return;
  }
  list.innerHTML = reviews.map(r => {
    let starHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= r.stars) starHtml += '<i class=\'fa-solid fa-star\' style=\'color:#d19151\'></i>';
      else starHtml += '<i class=\'fa-regular fa-star\' style=\'color:#b08968\'></i>';
    }
    return `
      <div class="review-item">
        <div class="review-user">
          <strong>${r.username}</strong> đánh giá:
        </div>
        <div class="review-stars">${starHtml}</div>
        <div class="review-text">${r.comment}</div>
      </div>
    `;
  }).join("");
}
