document.addEventListener("DOMContentLoaded", () => {
  // Hiển thị loading
  const container = document.getElementById("product-detail-content");
  container.innerHTML = '<div style="text-align: center; padding: 40px;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: #b08968;"></i><p style="margin-top: 16px; color: #6d4c2b;">Đang tải thông tin sản phẩm...</p></div>';

  // === Hiển thị thông báo dạng toast ===
  function showToast(message) {
    let toast = document.getElementById('custom-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'custom-toast';
      Object.assign(toast.style, {
        position: 'fixed',
        bottom: '90px',
        right: '32px',
        background: 'linear-gradient(90deg, #b08968 60%, #d19151 100%)',
        color: '#fff',
        padding: '16px 32px',
        borderRadius: '24px',
        fontSize: '1rem',
        boxShadow: '0 2px 8px rgba(186, 133, 80, 0.18)',
        zIndex: '10000',
        opacity: '0',
        transition: 'opacity 0.4s'
      });
      document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 1800);
  }

  // === Cập nhật cart badge ===
  function updateCartBadge() {
    const username = localStorage.getItem("userLoggedIn") || "guest";
    const cartKey = `cart_${username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    const badge = document.getElementById('cart-badge');
    if (badge) {
      badge.textContent = totalQuantity;
      badge.classList.add('animate');
      setTimeout(() => badge.classList.remove('animate'), 400);
    }
  }

  // Cập nhật badge khi trang load
  updateCartBadge();

  // Mảng sản phẩm cố định
  const products = [
    // Coffee & Espresso
    {
      name: "Americano Coffee",
      price: 45000,
      img: "../img/img/americano.jpg",
      desc: "Classic espresso with hot water, bold and smooth. Perfect for those who love the pure taste of coffee without milk or sugar."
    },
    {
      name: "Cappuccino",
      price: 45000,
      img: "../img/img/capuchino.jpg",
      desc: "Perfect blend of espresso, steamed milk, and foam. A classic Italian coffee drink with a rich, creamy texture."
    },
    {
      name: "Caffe Latte",
      price: 45000,
      img: "../img/img/latte.webp",
      desc: "Smooth espresso with creamy steamed milk. A gentle introduction to coffee with a mild, sweet flavor."
    },
    {
      name: "Palm Sugar Milk Coffee",
      price: 35000,
      img: "../img/img/ice coffe.jpg",
      desc: "Vietnamese style with natural palm sugar sweetness. A traditional Vietnamese coffee with a unique caramel-like sweetness."
    },
    {
      name: "Ice Green Tea",
      price: 25000,
      img: "../img/img/ice green.jpg",
      desc: "Refreshing green tea served with ice. Perfect for hot days with its cooling and antioxidant properties."
    },
    {
      name: "Espresso",
      price: 35000,
      img: "../img/img/esspresso.jpg",
      desc: "Pure coffee essence, intense and aromatic. The foundation of all espresso-based drinks with concentrated flavor."
    },
    // Beverages
    {
      name: "Lemon Tea",
      price: 25000,
      img: "../img/img/lemon.jpg",
      desc: "Refreshing lemon tea with natural citrus flavor. Perfect for detox and refreshment."
    },
    {
      name: "Strawberry Drink",
      price: 35000,
      img: "../img/img/nước dâu.webp",
      desc: "Sweet strawberry drink with fresh fruit pieces. A fruity and refreshing beverage."
    },
    {
      name: "Lychee Tea",
      price: 30000,
      img: "../img/img/tra-vai-tth.jpg",
      desc: "Exotic lychee tea with tropical sweetness. A unique and refreshing drink."
    },
    {
      name: "Matcha Latte",
      price: 45000,
      img: "../img/img/mattchalate.jpg",
      desc: "Japanese green tea latte with creamy milk. Rich in antioxidants with a smooth, earthy flavor."
    },
    {
      name: "Red Velvet Latte",
      price: 50000,
      img: "../img/img/latte red.jpg",
      desc: "Decadent red velvet latte with cream cheese flavor. A dessert-like drink with rich, chocolatey taste."
    },
    {
      name: "Fresh Orange Juice",
      price: 35000,
      img: "../img/img/nước cam.avif",
      desc: "Freshly squeezed orange juice with natural sweetness. Packed with vitamin C and natural flavors."
    },
    // Food
    {
      name: "Vietnamese Bánh Mì",
      price: 45000,
      img: "../img/img/bánh mì.jpg",
      desc: "Traditional Vietnamese sandwich with fresh ingredients. Crispy baguette filled with meat, vegetables, and herbs."
    },
    {
      name: "Crispy Fried Chicken",
      price: 65000,
      img: "../img/img/gà rán.jpg",
      desc: "Crispy fried chicken with golden coating. Juicy and tender meat with a satisfying crunch."
    },
    {
      name: "Chicken Feet with Lemongrass",
      price: 55000,
      img: "../img/img/chân gà.jpg",
      desc: "Spicy chicken feet marinated with lemongrass. A popular Vietnamese street food with bold flavors."
    },
    {
      name: "Pizza",
      price: 120000,
      img: "../img/img/pizza.webp",
      desc: "Italian-style pizza with fresh toppings. Crispy crust with melted cheese and premium ingredients."
    },
    {
      name: "Grilled Beef Steak",
      price: 150000,
      img: "../img/img/steak.webp",
      desc: "Premium grilled beef steak with herbs. Tender and juicy meat cooked to perfection."
    },
    {
      name: "Bún Bò O Phương",
      price: 60000,
      img: "../img/img/bún bò.jpg",
      desc: "Spicy beef noodle soup from Central Vietnam. Rich broth with tender beef and fresh herbs."
    },
    // Desserts
    {
      name: "Classic Pudding",
      price: 10000,
      img: "../img/img/pudding.webp",
      desc: "Smooth vanilla pudding with caramel sauce. A classic dessert that's creamy, sweet, and satisfying."
    },
    {
      name: "Strawberry Pudding",
      price: 12000,
      img: "../img/img/pudding dâu.webp",
      desc: "Smooth strawberry pudding with fresh strawberries. Bursting with natural strawberry flavor and topped with fresh fruit."
    },
    {
      name: "Chocolate Pudding",
      price: 12000,
      img: "../img/img/pudding chocolate.webp",
      desc: "Rich chocolate pudding with cocoa powder. A chocolate lover's dream with deep, rich cocoa flavor."
    },
    {
      name: "Mango Pudding",
      price: 15000,
      img: "../img/img/pudding xoài.webp",
      desc: "Fresh mango pudding with tropical flavor. Sweet and refreshing with the natural taste of ripe mangoes."
    },
    {
      name: "Mixed Berry Pudding",
      price: 15000,
      img: "../img/img/pudding berry.webp",
      desc: "Mixed berries pudding with fresh fruit. A colorful and nutritious dessert packed with various berry flavors."
    },
    {
      name: "Caramel Flan",
      price: 15000,
      img: "../img/img/flan.webp",
      desc: "Smooth caramel flan with golden caramel sauce. A Spanish-style custard dessert with rich caramel flavor."
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));
  const product = products[productId];

  // Kiểm tra sản phẩm tồn tại
  if (!product || productId < 0 || productId >= products.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <i class="fa-solid fa-exclamation-triangle" style="font-size: 3rem; color: #d19151; margin-bottom: 16px;"></i>
        <h2 style="color: #b08968; margin-bottom: 16px;">Không tìm thấy sản phẩm!</h2>
        <p style="color: #6d4c2b; margin-bottom: 24px;">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <a href="menu.html" style="background: linear-gradient(90deg, #b08968 60%, #d19151 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
          <i class="fa-solid fa-arrow-left"></i> Quay lại Menu
        </a>
      </div>
    `;
    return;
  }

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
      <img src="${product.img}" alt="${product.name}" class="product-detail-img" onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNjAgODBDMTI4IDgwIDEwMiAxMDYgMTAyIDEzOEMxMDIgMTUwIDEwOCAxNjEgMTE4IDE2OEMxMDggMTc1IDEwMiAxODYgMTAyIDE5OEMxMDIgMjMwIDEyOCAyNTYgMTYwIDI1NkMxOTIgMjU2IDIxOCAyMzAgMjE4IDE5OEMyMTggMTg2IDIxMiAxNzUgMjAyIDE2OEMyMTIgMTYxIDIxOCAxNTAgMjE4IDEzOEMyMTggMTA2IDE5MiA4MCAxNjAgODBaIiBmaWxsPSIjQjA4OTY4Ii8+CjxwYXRoIGQ9Ik0xNjAgMTQwQzE3MiAxNDAgMTgyIDE1MCAxODIgMTYyQzE4MiAxNzQgMTcyIDE4NCAxNjAgMTg0QzE0OCAxODQgMTM4IDE3NCAxMzggMTYyQzEzOCAxNTAgMTQ4IDE0MCAxNjAgMTQwWiIgZmlsbD0iI0QxOTExNCIvPgo8L3N2Zz4K'; this.style.border='2px dashed #b08968'; this.style.padding='20px';" />
      <div class="product-detail-info">
        <h2>${product.name}</h2>
        <div class="product-price">${product.price.toLocaleString('vi-VN')} VND</div>
        <div class="product-desc">${product.desc}</div>
        <div class="product-rating">Đánh giá trung bình: <span style="color:#d19151;font-weight:600;">${avgRating}</span> ${starHtml} (${reviews.length} đánh giá)</div>
        <button id="add-to-cart-btn" class="btn-order" style="margin-top: 20px; padding: 12px 24px; background: linear-gradient(90deg, #b08968 60%, #d19151 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; transition: all 0.3s ease;">
          <i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  `;

  // nút thêm vào giỏ hàng
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
    
    // Cập nhật badge và hiển thị toast
    updateCartBadge();
    showToast("Đã thêm vào giỏ hàng!");
    
    // Hiệu ứng button
    const btn = this;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã thêm!';
    btn.style.background = 'linear-gradient(90deg, #28a745 60%, #20c997 100%)';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = 'linear-gradient(90deg, #b08968 60%, #d19151 100%)';
      btn.disabled = false;
    }, 2000);
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
    list.innerHTML = `
      <div style="text-align: center; padding: 20px; color: #6d4c2b;">
        <i class="fa-solid fa-comment-slash" style="font-size: 2rem; color: #b08968; margin-bottom: 8px;"></i>
        <p>Chưa có đánh giá nào.</p>
        <p style="font-size: 0.9rem; opacity: 0.7;">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
      </div>
    `;
    return;
  }
  
  // Sắp xếp đánh giá theo thời gian (mới nhất trước)
  const sortedReviews = reviews.slice().reverse();
  
  list.innerHTML = sortedReviews.map((r, index) => {
    let starHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= r.stars) starHtml += '<i class=\'fa-solid fa-star\' style=\'color:#d19151\'></i>';
      else starHtml += '<i class=\'fa-regular fa-star\' style=\'color:#b08968\'></i>';
    }
    
    const date = new Date().toLocaleDateString('vi-VN');
    
    return `
      <div class="review-item" style="animation: fadeInUp 0.5s ease ${index * 0.1}s both;">
        <div class="review-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="review-user">
            <strong>${r.username}</strong>
          </div>
          <div class="review-date" style="font-size: 0.8rem; color: #6d4c2b; opacity: 0.7;">
            ${date}
          </div>
        </div>
        <div class="review-stars" style="margin-bottom: 8px;">${starHtml}</div>
        <div class="review-text">${r.comment}</div>
      </div>
    `;
  }).join("");
}

// Thêm CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
