
// ==== LỌC MENU THEO LOẠI ==== //
const filterButtons = document.querySelectorAll(".filter-btn");
const menuGroups = document.querySelectorAll(".menu-group");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Cập nhật class active
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedCategory = button.dataset.category;

        menuGroups.forEach(group => {
            if (selectedCategory === "all" || group.dataset.group === selectedCategory) {
                group.style.display = "block";
            } else {
                group.style.display = "none";
            }
        });
    });
});

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

// === Lấy giỏ hàng theo user đã đăng nhập ===
function getCurrentUserCart() {
  const username = localStorage.getItem("userLoggedIn") || "guest";
  const cartKey = `cart_${username}`;
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

// === Lưu giỏ hàng theo user đã đăng nhập ===
function saveCurrentUserCart(cart) {
  const username = localStorage.getItem("userLoggedIn") || "guest";
  const cartKey = `cart_${username}`;
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

// === Tính tổng số lượng sản phẩm trong giỏ và hiển thị trên badge ===
function getCartTotalQuantity() {
  const cart = getCurrentUserCart();
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

function updateCartBadge(count) {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = count;
    badge.classList.add('animate');
    setTimeout(() => badge.classList.remove('animate'), 400);
  }
}

// === Thêm sản phẩm vào giỏ (tăng số lượng nếu trùng) ===
function setupOrderButtons() {
  document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      let cart = getCurrentUserCart();
      const itemElem = btn.closest('.menu-item');
      const name = itemElem.querySelector('h4')?.textContent || 'Unknown Item';
      const priceElem = btn.closest('.menu-item-content')?.querySelector('.menu-price');
      const priceText = priceElem?.textContent || '0 VND';
      const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
      console.log(" Giá lấy được:", priceText, "→", price);
      const img = itemElem.querySelector('img')?.src || '';

      let found = false;
      for (let item of cart) {
        if (item.name === name && item.price === price && item.img === img) {
          item.quantity = (item.quantity || 1) + 1;
          found = true;
          break;
        }
      }

      if (!found) {
        cart.push({ name, price, img, quantity: 1 });
      }

      saveCurrentUserCart(cart);
      const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      updateCartBadge(totalQuantity);
      showToast("Đã thêm vào giỏ hàng!");
    });
  });
}

// === Yêu thích (trái tim) ===
document.addEventListener('DOMContentLoaded', () => {
  setupOrderButtons();
  const cartCount = getCartTotalQuantity();
  updateCartBadge(cartCount);

  document.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      btn.classList.toggle('active');
    });
  });

  // Thêm sự kiện click vào từng sản phẩm để chuyển sang trang chi tiết
  document.querySelectorAll('.menu-item').forEach((item, idx) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function (e) {
      // Không chuyển trang nếu click vào nút order hoặc fav
      if (e.target.closest('.btn-order') || e.target.closest('.btn-fav')) return;
      // Lấy thông tin sản phẩm
      const name = item.querySelector('h4')?.textContent || '';
      const priceElem = item.querySelector('.menu-price');
      const priceText = priceElem?.textContent || '0 VND';
      const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
      const img = item.querySelector('img')?.src || '';
      const desc = item.querySelector('.menu-description')?.textContent || '';
      // Lưu thông tin sản phẩm vào localStorage (danh sách tạm)
      let products = JSON.parse(localStorage.getItem('menuProducts')) || [];
      // Kiểm tra đã có chưa
      let foundIdx = products.findIndex(p => p.name === name && p.price === price && p.img === img);
      if (foundIdx === -1) {
        products.push({ name, price, img, desc });
        foundIdx = products.length - 1;
      }
      localStorage.setItem('menuProducts', JSON.stringify(products));
      // Chuyển sang trang chi tiết, truyền index
      window.location.href = `detailed-product.html?id=${foundIdx}`;
    });
  });
});

// === Hiệu ứng animation khi lọc menu ===
function animateMenuItems() {
  const items = document.querySelectorAll('.menu-item');
  items.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'none';
  });

  setTimeout(() => {
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.transition = 'all 0.4s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 80);
    });
  }, 50);
}

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(animateMenuItems, 0);
  });
});

// === Sticky shadow khi cuộn trang ===
window.addEventListener('scroll', function () {
  document.body.classList.toggle('scrolled', window.scrollY > 10);
});
