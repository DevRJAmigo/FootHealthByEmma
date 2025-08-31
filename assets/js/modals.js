function openModal(id) {
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.getElementById(id).classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('privacy-modal').classList.add('hidden');
  document.getElementById('terms-modal').classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

// Close on ESC key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});