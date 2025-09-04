// const slides = Array.from(document.querySelectorAll('#testimonial-viewport > article'));
// let currentIndex = 0;

// function scrollToSlide(index) {
//   if (index < 0 || index >= slides.length) return;
//   currentIndex = index;

//   const container = document.getElementById('testimonial-viewport');
//   const target = slides[currentIndex];

//   // Calculate horizontal offset of the target slide
//   const offsetLeft = target.offsetLeft;

//   // Scroll the container horizontally
//   container.scrollTo({
//     left: offsetLeft,
//     behavior: 'smooth'
//   });
// }

// function nextTestimonial() {
//   console.log('next');
//   scrollToSlide((currentIndex + 1) % slides.length);
// }

// function prevTestimonial() {
//   console.log('prev');
//   scrollToSlide((currentIndex - 1 + slides.length) % slides.length);
// }

// Slides & state
const slides = Array.from(document.querySelectorAll('#testimonial-viewport > article'));
const container = document.getElementById('testimonial-viewport');
const dots = Array.from(document.querySelectorAll('#testimonial-dots [data-index]'));
let currentIndex = 0;

// --- Active dot helpers ---
function setActiveDot(index) {
  dots.forEach((dot, i) => {
    const isActive = i === index;
    dot.setAttribute('data-active', isActive ? 'true' : 'false');
    if (isActive) {
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.removeAttribute('aria-current');
    }
  });
}

// --- Scroll to a specific slide ---
function scrollToSlide(index) {
  if (index < 0 || index >= slides.length) return;

  currentIndex = index;
  const target = slides[currentIndex];
  const offsetLeft = target.offsetLeft;

  container.scrollTo({
    left: offsetLeft,
    behavior: 'smooth'
  });

  // Reflect immediately in dots (don’t wait for smooth scroll end)
  setActiveDot(currentIndex);
}

// --- Chevron controls (unchanged, now auto-update dots) ---
function nextTestimonial() {
  scrollToSlide((currentIndex + 1) % slides.length);
}

function prevTestimonial() {
  scrollToSlide((currentIndex - 1 + slides.length) % slides.length);
}

// --- Dot clicks -> scroll & update ---
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = Number(dot.dataset.index);
    scrollToSlide(index);
  });
});

// --- Sync dots when user scrolls manually ---
let scrollTick = null;
function syncFromScroll() {
  // Find the slide whose left edge is closest to current scroll position
  const scrollCenter = container.scrollLeft + container.clientWidth / 2;
  let closestIdx = 0;
  let closestDist = Infinity;

  for (let i = 0; i < slides.length; i++) {
    const slideCenter = slides[i].offsetLeft + slides[i].offsetWidth / 2;
    const dist = Math.abs(slideCenter - scrollCenter);
    if (dist < closestDist) {
      closestDist = dist;
      closestIdx = i;
    }
  }

  if (closestIdx !== currentIndex) {
    currentIndex = closestIdx;
    setActiveDot(currentIndex);
  }
}

// Throttle with rAF for smoothness
container.addEventListener('scroll', () => {
  if (scrollTick) return;
  scrollTick = requestAnimationFrame(() => {
    syncFromScroll();
    scrollTick = null;
  });
});

// Initial state
setActiveDot(0);