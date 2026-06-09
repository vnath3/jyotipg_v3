const modal = document.getElementById('leadModal');
const modalClose = document.getElementById('modalClose');
const tabs = document.querySelectorAll('.modal-tab');
const panels = document.querySelectorAll('.modal-panel');

function openModal(tabId) {
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (tabId) switchTab(tabId);
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
function switchTab(tabId) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  panels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + tabId));
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.modal || 'availability'));
});

function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  const utms = {};
  keys.forEach(k => { if (params.get(k)) utms[k] = params.get(k); });
  if (Object.keys(utms).length) sessionStorage.setItem('utms', JSON.stringify(utms));
  return JSON.parse(sessionStorage.getItem('utms') || '{}');
}

async function submitForm(formId, successId, formType) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const utms = getUTMParams();

    const nameField = form.querySelector('input[name="name"]');
    const phoneField = form.querySelector('input[name="phone"]');

    // Clear any previous errors
    form.querySelectorAll('.field-error').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    // Validate name
    if (!nameField.value.trim()) {
      nameField.classList.add('input-error');
      const err = document.createElement('p');
      err.className = 'field-error';
      err.textContent = 'Please enter your full name';
      nameField.parentNode.appendChild(err);
      return;
    }

    // Validate phone — strip spaces, check 10 digits
    const phoneRaw = phoneField.value.replace(/\s+/g, '');
    if (!/^\d{10}$/.test(phoneRaw)) {
      phoneField.classList.add('input-error');
      const err = document.createElement('p');
      err.className = 'field-error';
      err.textContent = 'Enter a valid 10-digit mobile number';
      phoneField.parentNode.appendChild(err);
      return;
    }

    // Clean phone before sending — always prefix +91
    const cleanPhone = '+91' + phoneRaw;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    try {
      await fetch('/.netlify/functions/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...utms, phone: cleanPhone, form_type: formType, tenant: 'jyoti-pg' })
      });
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      form.style.display = 'none';
      document.getElementById(successId).style.display = 'block';
      if (typeof gtag !== 'undefined') gtag('event', 'form_submit', { form_type: formType });
    } catch(err) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      console.error('Form error:', err);
    }
  });
}

submitForm('availabilityForm', 'av-success', 'availability');
submitForm('visitForm', 'vs-success', 'visit');
