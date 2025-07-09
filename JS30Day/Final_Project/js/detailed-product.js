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
      </div>
    </div>
  `;

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
