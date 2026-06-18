// Rastreamento de clique no botão do WhatsApp (Meta Pixel)
//
// Por que isso existe: o clique nesses botões leva o usuário para fora do
// site (chat.whatsapp.com). Disparar o evento via "onclick" direto no HTML
// (como era antes) roda no mesmo instante em que o navegador já está indo
// embora da página — em conexões lentas ou no navegador in-app do
// Instagram/Facebook (que é o que abre ao clicar no anúncio), o pedido de
// rede do Pixel pode não terminar de ser enviado, e o evento se perde.
//
// A função abaixo:
// 1. Bloqueia a navegação automática do <a href="...">.
// 2. Abre a aba do WhatsApp IMEDIATAMENTE (window.open precisa rodar
//    dentro do clique do usuário, senão o navegador bloqueia como pop-up —
//    por isso isso NÃO pode esperar o Pixel responder antes de abrir).
// 3. Dispara o evento 'Contact' do Pixel (mais adequado que 'Lead' para
//    "iniciar uma conversa"). Como a aba aberta é nova, a aba original
//    (onde o script está rodando) continua viva tempo suficiente para a
//    requisição do Pixel ser enviada — diferente de uma navegação que
//    troca de página na mesma aba.
function trackWhatsappClick(event, url) {
  event.preventDefault();
  window.open(url, '_blank');

  if (typeof fbq === 'function') {
    fbq('track', 'Contact');
  }
}

// Lógica de admin panel removida — descomentar quando houver painel de gerenciamento de links
//
// const KEYS = ['perfume', 'esportes', 'ferramentas', 'tech'];
//
// function loadLinks() {
//   KEYS.forEach(key => {
//     const saved = localStorage.getItem('pz_link_' + key);
//     if (saved) {
//       document.getElementById('link-' + key).value = saved;
//       updateBtn(key, saved);
//     }
//   });
// }
//
// function updateBtn(key, url) {
//   const btn = document.getElementById('btn-' + key);
//   if (url && url.startsWith('http')) {
//     btn.href = url;
//     btn.classList.remove('disabled');
//     btn.setAttribute('target', '_blank');
//   } else {
//     btn.href = '#';
//     btn.classList.add('disabled');
//     btn.removeAttribute('target');
//   }
// }
//
// function saveLink(key) {
//   const input = document.getElementById('link-' + key);
//   const val = input.value.trim();
//   localStorage.setItem('pz_link_' + key, val);
//   updateBtn(key, val);
//   showToast('Link do grupo salvo! 📦');
//   const saveBtn = document.querySelector('[onclick="saveLink(\'' + key + '\')"]');
//   if (saveBtn) {
//     saveBtn.textContent = '✅';
//     setTimeout(() => saveBtn.textContent = '💾', 1500);
//   }
// }
//
// function joinGroup(e, key) {
//   const btn = document.getElementById('btn-' + key);
//   if (btn.classList.contains('disabled')) {
//     e.preventDefault();
//     showToast('⚠️ Adicione o link do grupo primeiro!');
//   }
// }
//
// function showToast(msg) {
//   const t = document.getElementById('toast');
//   t.textContent = msg;
//   t.classList.add('show');
//   setTimeout(() => t.classList.remove('show'), 2800);
// }
//
// document.querySelectorAll('.link-input').forEach(input => {
//   input.addEventListener('keydown', e => {
//     if (e.key === 'Enter') {
//       const key = input.id.replace('link-', '');
//       saveLink(key);
//     }
//   });
// });
//
// loadLinks();
