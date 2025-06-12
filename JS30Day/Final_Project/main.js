 const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carousel = document.getElementById('coffeeCarousel');

    let currentIndex = 0;
    const totalSlides = slides.length;
    const intervalTime = 4000;
    let autoSlide;

    function updateSlidePosition() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function goToNextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlidePosition();
    }

    function goToPrevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlidePosition();
    }

    function startAutoSlide() {
      autoSlide = setInterval(goToNextSlide, intervalTime);
    }

    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    nextBtn.addEventListener('click', () => {
      goToNextSlide();
    });

    prevBtn.addEventListener('click', () => {
      goToPrevSlide();
    });

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();

    // Slider End

    // caì đặt thời gian

  window.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('current-date');

    const now = new Date();

    // ngày
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;

  });

  // Tự động cập nhật thời gian hiện tại vào input time mỗi giây
window.addEventListener('DOMContentLoaded', () => {
  const timeInput = document.getElementById('current-time');
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeInput.value = `${hours}:${minutes}`;
  }
  updateTime();
  setInterval(updateTime, 1000);  
});

// đánh giá khách hàng
    const buttons = document.querySelectorAll('.btn-testi');
    const items = document.querySelectorAll('.testimonial-item');

  
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');

            items.forEach(item => item.classList.remove('active'));
            buttons.forEach(btn => btn.classList.remove('active'));

            document.querySelector(`.testimonial-item[data-index="${index}"]`).classList.add('active');
            button.classList.add('active');
        });
    });

    // di chuột để ảnh hưởng đến nút tương ứngứng
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const index = item.getAttribute('data-index');
            const btn = document.querySelector(`.btn-testi[data-index="${index}"]`);
            btn.classList.add('hovered');
        });
        item.addEventListener('mouseleave', () => {
            const index = item.getAttribute('data-index');
            const btn = document.querySelector(`.btn-testi[data-index="${index}"]`);
            btn.classList.remove('hovered');
        });
    });
