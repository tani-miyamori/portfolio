const STORAGE_KEY   = 'portfolio_works_v1';
const HASH_KEY      = 'portfolio_admin_hash';
const SESSION_KEY   = 'portfolio_admin_session';

let works           = [];
let pendingDeleteId = null;
let editingId       = null;

/* =====================================================
   Crypto
===================================================== */
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/* =====================================================
   Storage
===================================================== */
function loadWorks() {
  works = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveWorks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
}

/* =====================================================
   Auth — screen switcher
===================================================== */
const SCREENS = ['setupScreen', 'loginScreen', 'adminDashboard'];

function showScreen(id) {
  SCREENS.forEach(s => {
    document.getElementById(s).style.display = s === id ? '' : 'none';
  });
}

function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

function init() {
  showAdminDashboard();
}

/* =====================================================
   Setup form (first time)
===================================================== */
document.getElementById('setupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const pw1 = document.getElementById('setupPw').value;
  const pw2 = document.getElementById('setupPw2').value;

  if (pw1.length < 8) { toast('パスワードは8文字以上にしてください', 'error'); return; }
  if (pw1 !== pw2)    { toast('パスワードが一致しません', 'error'); return; }

  localStorage.setItem(HASH_KEY, await sha256(pw1));
  sessionStorage.setItem(SESSION_KEY, 'true');
  showAdminDashboard();
  toast('パスワードを設定しました', 'success');
});

/* =====================================================
   Login form
===================================================== */
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const pw   = document.getElementById('loginPw').value;
  const hash = await sha256(pw);

  if (hash === localStorage.getItem(HASH_KEY)) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    document.getElementById('loginError').style.display = 'none';
    showAdminDashboard();
  } else {
    document.getElementById('loginPw').classList.add('is-error');
    document.getElementById('loginError').style.display = '';
    toast('パスワードが違います', 'error');
  }
});

/* =====================================================
   Logout
===================================================== */
document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem(SESSION_KEY);
  document.getElementById('loginPw').value = '';
  document.getElementById('loginPw').classList.remove('is-error');
  document.getElementById('loginError').style.display = 'none';
  showScreen('loginScreen');
  setTimeout(() => document.getElementById('loginPw').focus(), 50);
  toast('ログアウトしました', 'success');
});

/* =====================================================
   Admin dashboard
===================================================== */
function showAdminDashboard() {
  loadWorks();
  showScreen('adminDashboard');
  renderWorks();
}

function renderWorks() {
  const list  = document.getElementById('worksList');
  const empty = document.getElementById('emptyState');

  if (works.length === 0) {
    list.innerHTML        = '';
    empty.style.display   = 'flex';
    return;
  }

  empty.style.display = 'none';
  list.innerHTML = works.map(adminRowHTML).join('');

  list.querySelectorAll('[data-edit]').forEach(btn =>
    btn.addEventListener('click', () => openEditModal(Number(btn.dataset.edit)))
  );
  list.querySelectorAll('[data-delete]').forEach(btn =>
    btn.addEventListener('click', () => askDelete(Number(btn.dataset.delete)))
  );
}

function adminRowHTML(work) {
  const thumb = work.thumbUrl
    || `https://image.thum.io/get/width/240/crop/135/${encodeURIComponent(work.url)}`;
  return `
    <div class="admin-row" data-id="${work.id}">
      <img class="admin-row__thumb" src="${thumb}" alt="${esc(work.title)}"
        loading="lazy" onerror="this.src='assets/placeholder.svg'">
      <div class="admin-row__info">
        <p class="admin-row__title">${esc(work.title)}</p>
        <a class="admin-row__url" href="${esc(work.url)}" target="_blank" rel="noopener">${esc(work.url)}</a>
      </div>
      <div class="admin-row__actions">
        <button class="btn btn--outline-dark btn--sm" data-edit="${work.id}">編集</button>
        <button class="btn btn--danger btn--sm" data-delete="${work.id}">削除</button>
      </div>
    </div>`;
}

/* =====================================================
   Thumbnail — file upload + resize
===================================================== */
document.getElementById('thumbFileBtn').addEventListener('click', () => {
  document.getElementById('thumbFileInput').click();
});

document.getElementById('thumbFileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  resizeAndPreview(file);
  e.target.value = '';
});

document.getElementById('thumbInput').addEventListener('input', () => {
  updateThumbPreview(document.getElementById('thumbInput').value.trim());
});

document.getElementById('thumbClearBtn').addEventListener('click', () => {
  document.getElementById('thumbInput').value = '';
  updateThumbPreview('');
});

function resizeAndPreview(file) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      const MAX_W = 800;
      const ratio = Math.min(1, MAX_W / img.width);
      const canvas = document.createElement('canvas');
      canvas.width  = Math.round(img.width  * ratio);
      canvas.height = Math.round(img.height * ratio);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      document.getElementById('thumbInput').value = dataUrl;
      updateThumbPreview(dataUrl);
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function updateThumbPreview(src) {
  const previewImg   = document.getElementById('thumbPreviewImg');
  const previewEmpty = document.getElementById('thumbPreviewEmpty');
  const clearBtn     = document.getElementById('thumbClearBtn');

  if (src) {
    previewImg.src           = src;
    previewImg.style.display = '';
    previewEmpty.style.display = 'none';
    clearBtn.style.display   = '';
  } else {
    previewImg.src           = '';
    previewImg.style.display = 'none';
    previewEmpty.style.display = '';
    clearBtn.style.display   = 'none';
  }
}

/* =====================================================
   Add / Edit modal
===================================================== */
function openAddModal() {
  editingId = null;
  document.getElementById('workModalTitle').textContent    = '作品を追加';
  document.getElementById('workFormSubmit').textContent    = '追加する';
  document.getElementById('workForm').reset();
  document.getElementById('editId').value = '';
  updateThumbPreview('');
  clearFormErrors();
  document.getElementById('workModal').classList.add('is-open');
  setTimeout(() => document.getElementById('urlInput').focus(), 50);
}

function openEditModal(id) {
  const work = works.find(w => w.id === id);
  if (!work) return;

  editingId = id;
  document.getElementById('workModalTitle').textContent    = '作品を編集';
  document.getElementById('workFormSubmit').textContent    = '保存する';
  document.getElementById('editId').value                  = id;
  document.getElementById('urlInput').value                = work.url       || '';
  document.getElementById('titleInput').value              = work.title     || '';
  document.getElementById('thumbInput').value              = work.thumbUrl  || '';
  updateThumbPreview(work.thumbUrl || '');
  document.getElementById('commentInput').value            = work.comment   || '';
  document.getElementById('priceInput').value              = work.price     || '';
  document.getElementById('periodInput').value             = work.period    || '';
  document.getElementById('scopeInput').value              = work.scope     || '';
  document.getElementById('ingenuityInput').value          = work.ingenuity || '';
  clearFormErrors();
  document.getElementById('workModal').classList.add('is-open');
  setTimeout(() => document.getElementById('titleInput').focus(), 50);
}

function closeWorkModal() {
  document.getElementById('workModal').classList.remove('is-open');
  document.getElementById('workForm').reset();
  updateThumbPreview('');
  clearFormErrors();
  editingId = null;
}

document.getElementById('workForm').addEventListener('submit', (e) => {
  e.preventDefault();
  clearFormErrors();

  const url   = document.getElementById('urlInput').value.trim();
  const title = document.getElementById('titleInput').value.trim();
  let valid   = true;

  if (!url)   { showFieldError('urlInput',   'URLを入力してください');    valid = false; }
  if (!title) { showFieldError('titleInput', 'タイトルを入力してください'); valid = false; }
  if (!valid) return;

  const data = {
    url,
    title,
    thumbUrl:  document.getElementById('thumbInput').value.trim(),
    comment:   document.getElementById('commentInput').value.trim(),
    price:     document.getElementById('priceInput').value.trim(),
    period:    document.getElementById('periodInput').value.trim(),
    scope:     document.getElementById('scopeInput').value.trim(),
    ingenuity: document.getElementById('ingenuityInput').value.trim(),
  };

  if (editingId !== null) {
    const idx = works.findIndex(w => w.id === editingId);
    if (idx !== -1) works[idx] = { ...works[idx], ...data };
    toast('作品を更新しました', 'success');
  } else {
    works.unshift({ id: Date.now(), ...data, addedAt: new Date().toISOString() });
    toast('作品を追加しました', 'success');
  }

  saveWorks();
  renderWorks();
  closeWorkModal();
});

document.getElementById('workModalClose').addEventListener('click', closeWorkModal);
document.getElementById('workModalBackdrop').addEventListener('click', closeWorkModal);
document.getElementById('workFormCancel').addEventListener('click', closeWorkModal);
document.getElementById('addWorkBtn').addEventListener('click', openAddModal);
document.getElementById('emptyAddBtn').addEventListener('click', openAddModal);

/* =====================================================
   Delete
===================================================== */
function askDelete(id) {
  pendingDeleteId = id;
  document.getElementById('confirmDialog').classList.add('is-open');
}

function closeConfirm() {
  pendingDeleteId = null;
  document.getElementById('confirmDialog').classList.remove('is-open');
}

document.getElementById('confirmCancel').addEventListener('click', closeConfirm);
document.getElementById('confirmBackdrop').addEventListener('click', closeConfirm);
document.getElementById('confirmOk').addEventListener('click', () => {
  if (pendingDeleteId === null) return;
  works = works.filter(w => w.id !== pendingDeleteId);
  saveWorks();
  renderWorks();
  closeConfirm();
  toast('削除しました', 'success');
});

/* =====================================================
   Keyboard
===================================================== */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  closeWorkModal();
  closeConfirm();
});

/* =====================================================
   Toast
===================================================== */
function toast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  const el        = document.createElement('div');
  el.className    = `toast toast--${type}`;
  el.textContent  = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* =====================================================
   Form helpers
===================================================== */
function showFieldError(id, msg) {
  const input = document.getElementById(id);
  input.classList.add('is-error');
  const err       = document.createElement('span');
  err.className   = 'form__error';
  err.textContent = msg;
  input.parentElement.appendChild(err);
}

function clearFormErrors() {
  document.querySelectorAll('.form__input.is-error, .form__textarea.is-error')
    .forEach(el => el.classList.remove('is-error'));
  document.querySelectorAll('.form__error').forEach(el => el.remove());
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* =====================================================
   Init
===================================================== */
init();
