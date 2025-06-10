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

    // Event listeners
    nextBtn.addEventListener('click', () => {
      goToNextSlide();
    });

    prevBtn.addEventListener('click', () => {
      goToPrevSlide();
    });

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Start
    startAutoSlide();

    // Slider End

    // Set date anh time

  window.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('current-date');
    const timeInput = document.getElementById('current-time');

    const now = new Date();

    // Format date to YYYY-MM-DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;

    // Format time to HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeInput.value = `${hours}:${minutes}`;
  });
