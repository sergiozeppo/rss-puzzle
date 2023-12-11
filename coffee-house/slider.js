document.addEventListener("DOMContentLoaded", function () {
  const prevSlide = document.getElementById("arrow-left");
  const nextSlide = document.getElementById("arrow-right");
  const sliderContainer = document.getElementById("row-slider");
  const sliders = [
    document.getElementById("slide-1"),
    document.getElementById("slide-2"),
    document.getElementById("slide-3"),
  ];
  const bars = [
    document.getElementById("fill1"),
    document.getElementById("fill2"),
    document.getElementById("fill3"),
  ];

  let index = 0;

  function activateCarousel() {
    bars[0].classList.add("active");
  }

  function slidingCarousel() {
    const nextSlidePos = -index * 100;
    for (let i = 0; i < sliders.length; i++) {
      const slide = sliders[i];
      const bar = bars[i];
      slide.style.transform = `translateX(${nextSlidePos}%)`;
      i === index
        ? bar.classList.add("active")
        : bar.classList.remove("active");
    }
  }

  function rotateRight() {
    index < sliders.length - 1 ? index++ : (index = 0);
    slidingCarousel();
    continueAuto();
  }

  function rorateLeft() {
    index > 0 ? index-- : (index = sliders.length - 1);
    slidingCarousel();
    continueAuto();
  }

  nextSlide.addEventListener("click", rotateRight);
  prevSlide.addEventListener("click", rorateLeft);

  let interval;

  function autoPlay() {
    interval = setInterval(() => {
      rotateRight();
    }, 5000);
  }

  function pauseAutoPlay() {
    clearInterval(interval);
  }

  function continueAuto() {
    clearInterval(interval);
    autoPlay();
  }

  sliderContainer.addEventListener("mouseenter", pauseAutoPlay);
  sliderContainer.addEventListener("mouseleave", autoPlay);

  autoPlay();

  window.addEventListener("load", activateCarousel);

  // Listen to swipe
  let touchStartX = 0;
  let touchEndX = 0;

  function touchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function touchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    swipe();
  }

  function swipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      rotateRight();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      rorateLeft();
    }
  }

  sliders.forEach((slide) => {
    slide.addEventListener("touchstart", touchStart);
    slide.addEventListener("touchend", touchEnd);
  });
});
