/* =============================================
   LISE OLIVEIRA ATELIÊ — script.js
   Papelaria Personalizada | Viamão – RS
   ============================================= */

/* ---- CURSOR PERSONALIZADO ---- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ---- NAVBAR — efeito ao rolar ---- */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- ANIMAÇÃO DE ENTRADA AO ROLAR (REVEAL) ---- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

/* ---- FILTRO DE PRODUTOS ---- */
function filterProducts(cat, btn) {
  // Atualiza aba ativa
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Mostra/oculta cards
  document.querySelectorAll('.product-card').forEach(card => {
    if (cat === 'todos' || card.dataset.cat === cat) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ---- MODAL DE PRODUTO ---- */
function openModal(title, price, desc, emoji) {
  document.getElementById('modal-content').innerHTML = `
    <div style="font-size:3rem;margin-bottom:1rem">${emoji}</div>
    <h2 class="modal-title">${title}</h2>
    <div class="modal-price">${price}</div>
    <p class="modal-desc">${desc}</p>
    <div class="modal-cta">
      <a href="https://wa.me/5551999999999?text=Olá! Quero um orçamento de ${encodeURIComponent(title)} ${emoji}"
         target="_blank"
         class="whatsapp-btn"
         style="flex:1;text-align:center;justify-content:center;padding:1rem">
        💬 Pedir Orçamento
      </a>
      <button class="btn-outline" onclick="closeModal()" style="flex:1">Fechar</button>
    </div>
  `;
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// Fechar clicando fora do modal
document.getElementById('modal').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// Fechar com tecla Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ---- FORMULÁRIO → WHATSAPP ---- */
function submitForm() {
  const nome = document.getElementById('f-nome').value.trim();
  const tel  = document.getElementById('f-tel').value.trim();
  const tipo = document.getElementById('f-tipo').value;
  const qtd  = document.getElementById('f-qtd').value.trim();
  const msg  = document.getElementById('f-msg').value.trim();

  if (!nome || !tipo) {
    alert('Por favor, preencha pelo menos seu nome e o tipo de produto.');
    return;
  }

  const text =
    `Olá, Lise! 💕\n\n` +
    `Me chamo *${nome}*${tel ? ' (' + tel + ')' : ''} e gostaria de um orçamento:\n\n` +
    `📦 *Produto:* ${tipo}\n` +
    `📊 *Quantidade:* ${qtd || 'A definir'}\n` +
    `💬 *Detalhes:* ${msg || 'A combinar'}\n\n` +
    `Aguardo seu retorno!`;

  window.open(`https://wa.me/5551999999999?text=${encodeURIComponent(text)}`, '_blank');
  showToast();
}

/* ---- TOAST DE CONFIRMAÇÃO ---- */
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
