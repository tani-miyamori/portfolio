const STORAGE_KEY = 'portfolio_works_v1';

let works = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

/* =====================================================
   Render
===================================================== */
function render() {
  const grid  = document.getElementById('portfolioGrid');
  const empty = document.getElementById('emptyState');

  if (works.length === 0) {
    grid.innerHTML       = '';
    empty.style.display  = 'flex';
    return;
  }

  empty.style.display = 'none';
  grid.innerHTML = works.map(cardHTML).join('');
}

function cardHTML(work) {
  const thumb = work.thumbUrl
    || `https://image.thum.io/get/width/600/crop/400/${encodeURIComponent(work.url)}`;

  const tags = [
    work.price  && `<span class="tag tag--price">💰 ${esc(work.price)}</span>`,
    work.period && `<span class="tag tag--period">🗓 ${esc(work.period)}</span>`,
    work.scope  && `<span class="tag tag--scope">🔧 ${esc(work.scope)}</span>`,
  ].filter(Boolean).join('');

  const details = work.ingenuity ? `
    <details class="card__details">
      <summary class="card__details-summary">工夫した点</summary>
      <p class="card__details-body">${esc(work.ingenuity)}</p>
    </details>` : '';

  return `
    <article class="card" data-id="${work.id}">
      <a href="${esc(work.url)}" target="_blank" rel="noopener noreferrer" class="card__preview">
        <img
          src="${thumb}"
          alt="${esc(work.title)}"
          class="card__img"
          loading="lazy"
          onerror="this.src='assets/placeholder.svg'"
        >
        <div class="card__preview-overlay">サイトを見る →</div>
      </a>
      <div class="card__body">
        <h3 class="card__title">${esc(work.title)}</h3>
        <a href="${esc(work.url)}" class="card__url" target="_blank" rel="noopener">${esc(work.url)}</a>
        ${work.comment ? `<p class="card__comment">${esc(work.comment)}</p>` : ''}
        ${tags ? `<div class="card__tags">${tags}</div>` : ''}
        ${details}
      </div>
    </article>`;
}

/* =====================================================
   Escape HTML
===================================================== */
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
render();
