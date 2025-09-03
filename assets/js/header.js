// Accessible toggle for mobile nav
const btn = document.getElementById('navToggle');
const panel = document.getElementById('mobileNav');
const openIcon = document.getElementById('iconOpen');
const closeIcon = document.getElementById('iconClose');

const mobileHeader = document.getElementById('mobileNav');

function setOpen(isOpen) {
  panel.dataset.open = isOpen ? 'true' : 'false';
  btn.setAttribute('aria-expanded', String(isOpen));
  btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  openIcon.classList.toggle('hidden', isOpen);
  closeIcon.classList.toggle('hidden', !isOpen);
  mobileHeader.classList.toggle('hidden', !isOpen);
}

setOpen(false);

btn.addEventListener('click', () => setOpen(panel.dataset.open !== 'true'));

// Close when clicking a link or outside
panel.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') setOpen(false);
});
document.addEventListener('click', (e) => {
  if (!panel.contains(e.target) && !btn.contains(e.target)) setOpen(false);
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setOpen(false);
});

function scrollToSection(sectionId) {
  var element = document.getElementById(sectionId);
  var headerOffset = 80;
  var elementPosition = element.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
  });
}
