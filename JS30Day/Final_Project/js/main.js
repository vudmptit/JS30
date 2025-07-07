const track = document.getElementById('carouselTrack');
let slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carousel = document.getElementById('coffeeCarousel');

const intervalTime = 4000;
let autoSlide;

//  Clone slide đầu và cuối
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Cập nhật danh sách slide mới
slides = document.querySelectorAll('.carousel-slide');

let currentIndex = 1; // bắt đầu từ slide thứ 1 (sau lastClone)
track.style.transform = `translateX(-${currentIndex * 100}%)`;

function updateSlidePosition() {
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function goToNextSlide() {
  if (currentIndex >= slides.length - 1) return;
  currentIndex++;
  updateSlidePosition();
}

function goToPrevSlide() {
  if (currentIndex <= 0) return;
  currentIndex--;
  updateSlidePosition();
}

//  Reset về slide thật khi tới clone
track.addEventListener("transitionend", () => {
  if (slides[currentIndex].id === "first-clone") {
    track.style.transition = "none";
    currentIndex = 1;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  if (slides[currentIndex].id === "last-clone") {
    track.style.transition = "none";
    currentIndex = slides.length - 2;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
});

function startAutoSlide() {
  autoSlide = setInterval(goToNextSlide, intervalTime);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

//  Nút điều hướng
nextBtn.addEventListener('click', () => {
  goToNextSlide();
});

prevBtn.addEventListener('click', () => {
  goToPrevSlide();
});

//  Dừng khi hover
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();

// xử lý đăng xuất
document.getElementById("logout-btn").addEventListener("click", function () {
        // Xóa trạng thái đăng nhập
        localStorage.removeItem("loggedInUser");
        // Chuyển về trang đăng nhập
        window.location.href = "/JS30Day/Final_Project/html/SignIn.html";
    });

// === Back to Top Button ===
(function() {
    const btn = document.createElement('button');
    btn.innerHTML = '⬆';
    btn.id = 'backToTopBtn';
    btn.style.position = 'fixed';
    btn.style.bottom = '32px';
    btn.style.right = '32px';
    btn.style.zIndex = '9999';
    btn.style.display = 'none';
    btn.style.background = 'linear-gradient(90deg, #b08968 60%, #d19151 100%)';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '50%';
    btn.style.width = '48px';
    btn.style.height = '48px';
    btn.style.fontSize = '1.5rem';
    btn.style.boxShadow = '0 2px 8px rgba(186, 133, 80, 0.18)';
    btn.style.cursor = 'pointer';
    btn.style.transition = 'opacity 0.3s';
    document.body.appendChild(btn);
    window.addEventListener('scroll', function() {
        btn.style.display = (window.scrollY > 300) ? 'block' : 'none';
    });
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// === Toast Notification ===
function showToast(message) {
    let toast = document.getElementById('custom-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'custom-toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '90px';
        toast.style.right = '32px';
        toast.style.background = 'linear-gradient(90deg, #b08968 60%, #d19151 100%)';
        toast.style.color = '#fff';
        toast.style.padding = '16px 32px';
        toast.style.borderRadius = '24px';
        toast.style.fontSize = '1rem';
        toast.style.boxShadow = '0 2px 8px rgba(186, 133, 80, 0.18)';
        toast.style.zIndex = '10000';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 1800);
}

// xử lý thêm vào giỏ hàng
document.querySelectorAll(".btn-order").forEach(button => {
    button.addEventListener("click", function () {
        const item = this.closest(".menu-item");
        const name = item.querySelector("h4").innerText;
        const price = item.querySelector("p").innerText;
        const img = item.querySelector("img").src;

        const newItem = { name, price, img };

        // Lấy giỏ hàng hiện tại (nếu có)
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Thêm sản phẩm mới vào giỏ hàng
        cart.push(newItem);

        // Lưu lại vào localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        showToast("Đã thêm vào giỏ hàng!");
    });
});


class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.setupEventListeners();
    }

    loadCart() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    addItem(item) {
        this.cart.push(item);
        this.saveCart();
        this.showNotification('Item added to cart!');
    }

    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    setupEventListeners() {
        document.querySelectorAll(".btn-order").forEach(button => {
            button.addEventListener("click", (event) => this.handleOrderClick(event));
        });
    }

    handleOrderClick(event) {
        const item = event.target.closest(".menu-item");
        if (!item) return;

        const name = item.querySelector("h4")?.textContent || 'Unknown Item';
        const price = item.querySelector("p")?.textContent || '0 VND';
        const img = item.querySelector("img")?.src || '';

        const newItem = { 
            name, 
            price, 
            img,
            quantity: 1,
            id: Date.now() // Simple unique ID
        };

        this.addItem(newItem);
    }
}

// Authentication Manager
class AuthManager {
    constructor() {
        this.setupLogoutListener();
    }

    setupLogoutListener() {
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => this.handleLogout());
        }
    }

    handleLogout() {
        try {
            localStorage.removeItem(STORAGE_KEYS.LOGGED_IN_USER);
            window.location.href = ROUTES.SIGN_IN;
        } catch (error) {
            console.error('Error during logout:', error);
            // Fallback redirect
            window.location.href = ROUTES.SIGN_IN;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new Carousel('coffeeCarousel');
        new CartManager();
        new AuthManager();
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});