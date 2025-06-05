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