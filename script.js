// Contact Form Submit
const form = document.getElementById("contact-form");
const scriptURL = "https://script.google.com/macros/s/AKfycbwvrMewCswNUWIWRkZnAJGpsuFb_lLxnfVwLYlAMMY5zWuTrJSV_OAmIUfHwbDaxy4a/exec";

form.addEventListener("submit", e => {
  e.preventDefault();

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form)  // ✅ send as FormData, not JSON
  })
    .then(response => {
      alert("✅ Thank you! We will contact you soon.");
      form.reset();
    })
    .catch(error => {
      console.error("Error!", error.message);
      alert("❌ Something went wrong. Please try again!");
    });
});
// Hamburger menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  hamburger.classList.toggle('active');
  nav.classList.toggle('show');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Sliders
function nudgeSlider(selector, dir = 1) {
  const el = document.querySelector(selector);
  if (!el) return;
  const card = el.querySelector('.card');
  const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.9;
  el.scrollBy({ left: step * dir, behavior: 'smooth' });
}

document.querySelectorAll('.slider-btn').forEach(btn => {
  const target = btn.dataset.target;
  btn.addEventListener('click', () => nudgeSlider(target, btn.classList.contains('next') ? 1 : -1));
});

// Keyboard support for focused sliders
document.querySelectorAll('.slider').forEach(slider => {
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nudgeSlider('#' + slider.id, 1);
    if (e.key === 'ArrowLeft') nudgeSlider('#' + slider.id, -1);
  });
});

// Back-to-top visibility
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) toTop.classList.add('show');
  else toTop.classList.remove('show');
});

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Lazy sheen loop for hero card
setInterval(() => {
  const shine = document.querySelector('.shine');
  if (shine) {
    shine.style.animation = 'none';
    void shine.offsetWidth; // reflow
    shine.style.animation = '';
  }
}, 5000);

// Optional: drag-to-scroll for sliders (desktop)
document.querySelectorAll('.slider').forEach(s => {
  let isDown = false, startX = 0, scrollLeft = 0;
  s.addEventListener('mousedown', (e) => {
    isDown = true;
    s.classList.add('dragging');
    startX = e.pageX - s.offsetLeft;
    scrollLeft = s.scrollLeft;
    e.preventDefault();
  });
  window.addEventListener('mouseup', () => { isDown = false; s.classList.remove('dragging'); });
  s.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - s.offsetLeft;
    const walk = (x - startX) * 1.2;
    s.scrollLeft = scrollLeft - walk;
  });
  // touch
  let touchStartX = 0, touchScrollLeft = 0;
  s.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchScrollLeft = s.scrollLeft;
  }, {passive:true});
  s.addEventListener('touchmove', (e) => {
    const x = e.touches[0].clientX;
    const walk = (x - touchStartX) * 1.1;
    s.scrollLeft = touchScrollLeft - walk;
  }, {passive:true});
});
