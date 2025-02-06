// Slider Functionality
(function () {
  const slider = document.querySelector('.slider .list');
  const items = document.querySelectorAll('.slider .list .item');
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const dots = document.querySelectorAll('.slider .dots li');

  if (!slider || !items.length || !next || !prev || !dots.length) return;

  let active = 0;
  const lengthItems = items.length - 1;
  let refreshInterval = setInterval(() => next.click(), 3000);

  function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';

    document.querySelector('.slider .dots li.active')?.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => next.click(), 9000);
  }

  next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
  };

  prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      active = index;
      reloadSlider();
    });
  });

  window.onresize = reloadSlider;
  reloadSlider();
})();

// Dropdown Menu Functionality
(function () {
  const dropdowns = document.querySelectorAll('.navbar .dropdown-toggler');

  if (!dropdowns.length) return;

  document.addEventListener('click', (event) => {
    dropdowns.forEach((dropdown) => {
      const targetMenu = document.querySelector(`#${dropdown.dataset.dropdown}`);
      if (!targetMenu) return;

      if (dropdown.contains(event.target)) {
        targetMenu.classList.toggle('show');
      } else if (!targetMenu.contains(event.target)) {
        targetMenu.classList.remove('show');
      }
    });
  });
})();

// Mobile Menu Handling
(function () {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (!navbarToggler || !navbarMenu) return;

  navbarToggler.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
  });
})();

// Carousel Auto-Play
(function () {
  const sliderContainer = document.querySelector('.containervrd');
  const slider = document.querySelector('.sliderrd');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.pre');

  if (!sliderContainer || !slider || !nextButton || !prevButton) return;

  let intervalId;

  function startAutoPlay() {
    intervalId = setInterval(() => {
      const slides = document.querySelectorAll('.slide');
      slider.appendChild(slides[0]);
    }, 3500);
  }

  function stopAutoPlay() {
    clearInterval(intervalId);
  }

  sliderContainer.addEventListener('mouseenter', stopAutoPlay);
  sliderContainer.addEventListener('mouseleave', startAutoPlay);

  nextButton.addEventListener('click', () => {
    const slides = document.querySelectorAll('.slide');
    slider.appendChild(slides[0]);
  });

  prevButton.addEventListener('click', () => {
    const slides = document.querySelectorAll('.slide');
    slider.prepend(slides[slides.length - 1]);
  });

  startAutoPlay();
})();

// Animated Counter Functionality
(function () {
  const valueDisplays = document.querySelectorAll('.num');
  const interval = 4000;

  valueDisplays.forEach((valueDisplay) => {
    const startValue = 0;
    const endValue = parseInt(valueDisplay.getAttribute('data-val'), 10);

    if (isNaN(endValue)) {
      console.warn(`Invalid data-val for element:`, valueDisplay);
      return;
    }

    const duration = Math.max(Math.floor(interval / endValue), 1);
    let currentValue = startValue;

    const counter = setInterval(() => {
      currentValue += 1;
      valueDisplay.textContent = currentValue;

      if (currentValue >= endValue) {
        clearInterval(counter);
      }
    }, duration);
  });
})();
let index = 0;

function showTestimonials() {
  const slide = document.querySelector('.testimonial-slide');
  const testimonials = document.querySelectorAll('.testimonial');
  index++;

  if (index >= testimonials.length) {
    index = 0;
  }

  slide.style.transform = `translateX(-${index * 100}%)`;
}

// Auto-slide every 3 seconds
setInterval(showTestimonials, 3000);

