const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('navOverlay');

function openNav() { document.body.classList.add('nav-open'); }
function closeNav() { document.body.classList.remove('nav-open'); }

if (hamburger) hamburger.addEventListener('click', openNav);
if (navOverlay) navOverlay.addEventListener('click', closeNav);

document.querySelectorAll('.navbar-drawer a').forEach(function(link) {
  link.addEventListener('click', closeNav);
});
