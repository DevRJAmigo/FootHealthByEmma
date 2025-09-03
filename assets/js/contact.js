const form = document.getElementById('contact-form');
const modal = document.getElementById('success-modal');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  openModal('success-modal');
  return;

  const formData = new FormData(form);

  try {
    const response = await fetch('https://usebasin.com/f/f287a13855c1', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      openModal('success-modal');
    } else {
      alert('There was an error. Please try again or email me directly.');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again later.');
  }
});