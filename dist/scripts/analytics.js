document.querySelectorAll('.btn-primary, .btn-outline, .btn-whatsapp').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof gtag === 'undefined') return;
    gtag('event', 'cta_click', {
      button_text: btn.textContent.trim(),
      button_location: btn.closest('section')?.className || 'unknown'
    });
  });
});

let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
window.addEventListener('scroll', () => {
  const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  [25, 50, 75, 100].forEach(mark => {
    if (pct >= mark && !scrollMarks[mark]) {
      scrollMarks[mark] = true;
      if (typeof gtag !== 'undefined') gtag('event', 'scroll_depth', { depth: mark });
    }
  });
});

const dismissWa = document.getElementById('dismissWa');
if (dismissWa) {
  dismissWa.addEventListener('click', () => {
    document.getElementById('stickyWa').style.display = 'none';
    if (typeof gtag !== 'undefined') gtag('event', 'sticky_wa_dismissed');
  });
}
