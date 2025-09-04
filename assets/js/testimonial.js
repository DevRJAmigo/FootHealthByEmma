const slides = Array.from(document.querySelectorAll('#testimonial-viewport > article'));
let currentIndex = 0;

function scrollToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  currentIndex = index;

  const container = document.getElementById('testimonial-viewport');
  const target = slides[currentIndex];

  // Calculate horizontal offset of the target slide
  const offsetLeft = target.offsetLeft;

  // Scroll the container horizontally
  container.scrollTo({
    left: offsetLeft,
    behavior: 'smooth'
  });
}

function nextTestimonial() {
  console.log('next');
  scrollToSlide((currentIndex + 1) % slides.length);
}

function prevTestimonial() {
  console.log('prev');
  scrollToSlide((currentIndex - 1 + slides.length) % slides.length);
}