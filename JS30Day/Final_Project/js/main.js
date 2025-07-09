// === Carousel Logic ===
const track = document.getElementById('carouselTrack');
if (track) {
  let slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carousel = document.getElementById('coffeeCarousel');
  const intervalTime = 4000;
  let autoSlide;

  // Tạo clone slide đầu và cuối để tạo hiệu ứng vô hạn
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.id = "first-clone";
  lastClone.id = "last-clone";
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  // Cập nhật lại danh sách slide
  slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 1;
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

  // Xử lý khi kết thúc chuyển động: reset lại nếu đang ở clone
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

  // Tự động trượt
  function startAutoSlide() {
    autoSlide = setInterval(goToNextSlide, intervalTime);
  }
  function stopAutoSlide() {
    clearInterval(autoSlide);
  }
  startAutoSlide();
}

// === Cập nhật thông tin người dùng ===
function updateUserInfo() {
  const username = localStorage.getItem("userLoggedIn");
  const greetingElement = document.querySelector(".navbar-greeting span");
  
  if (greetingElement) {
    if (username) {
      // Lấy tên từ email (phần trước @)
      const displayName = username.split('@')[0];
      greetingElement.textContent = `Xin chào, ${displayName}!`;
    } else {
      greetingElement.textContent = "Xin chào, Khách hàng!";
    }
  }
}

// === Đăng xuất ===
document.getElementById("logout-btn").addEventListener("click", function () {
  // Đồng bộ với key userLoggedIn thay vì loggedInUser
  localStorage.removeItem("userLoggedIn");
  window.location.href = "/JS30Day/Final_Project/html/SignIn.html";
});

// === Back to Top Button ===
(function () {
  const btn = document.createElement('button');
  btn.innerHTML = '⬆';
  btn.id = 'backToTopBtn';
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    zIndex: '9999',
    display: 'none',
    background: 'linear-gradient(90deg, #b08968 60%, #d19151 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    fontSize: '1.5rem',
    boxShadow: '0 2px 8px rgba(186, 133, 80, 0.18)',
    cursor: 'pointer',
    transition: 'opacity 0.3s'
  });
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.style.display = (window.scrollY > 300) ? 'block' : 'none';
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Cập nhật thông tin người dùng khi trang load
document.addEventListener('DOMContentLoaded', function() {
  updateUserInfo();
});

