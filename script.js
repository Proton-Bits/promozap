const KEYS = ['perfume', 'esportes', 'ferramentas', 'tech'];

function loadLinks() {
  KEYS.forEach(key => {
    const saved = localStorage.getItem('pz_link_' + key);
    if (saved) {
      document.getElementById('link-' + key).value = saved;
      updateBtn(key, saved);
    }
  });
}

function updateBtn(key, url) {
  const btn = document.getElementById('btn-' + key);
  if (url && url.startsWith('http')) {
    btn.href = url;
    btn.classList.remove('disabled');
    btn.setAttribute('target', '_blank');
  } else {
    btn.href = '#';
    btn.classList.add('disabled');
    btn.removeAttribute('target');
  }
}

function saveLink(key) {
  const input = document.getElementById('link-' + key);
  const val = input.value.trim();
  localStorage.setItem('pz_link_' + key, val);
  updateBtn(key, val);
  showToast('Link do grupo salvo! 📦');
  const saveBtn = document.querySelector('[onclick="saveLink(\'' + key + '\')"]');
  if (saveBtn) {
    saveBtn.textContent = '✅';
    setTimeout(() => saveBtn.textContent = '💾', 1500);
  }
}

function joinGroup(e, key) {
  const btn = document.getElementById('btn-' + key);
  if (btn.classList.contains('disabled')) {
    e.preventDefault();
    showToast('⚠️ Adicione o link do grupo primeiro!');
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

document.querySelectorAll('.link-input').forEach(input => {
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const key = input.id.replace('link-', '');
      saveLink(key);
    }
  });
});

document.querySelector('a[href="#grupos"]').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.groups-grid').scrollIntoView({ behavior: 'smooth' });
});

loadLinks();
