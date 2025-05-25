let vidaGorila = 100;
let ataquesFeitos = 0;
let humanos = Array(100).fill(true);
const logEl = document.getElementById("log");
 
function salvar() {
  localStorage.setItem("vidaGorila", vidaGorila);
  localStorage.setItem("ataquesFeitos", ataquesFeitos);
  localStorage.setItem("humanos", JSON.stringify(humanos));
}
 
function carregar() {
  vidaGorila = parseInt(localStorage.getItem("vidaGorila")) || 100;
  ataquesFeitos = parseInt(localStorage.getItem("ataquesFeitos")) || 0;
  humanos = JSON.parse(localStorage.getItem("humanos")) || Array(100).fill(true);
}
 
function atualizar() {
  document.getElementById("vidaGorila").innerText = vidaGorila;
  document.getElementById("humanosRestantes").innerText = humanos.filter(Boolean).length;
  document.getElementById("ataques").innerText = ataquesFeitos;
 
  if (vidaGorila <= 0) {
    log("💀 O gorila foi derrotado pelos humanos!");
    desativarBotoes();
  }
}
 
function log(texto) {
  const p = document.createElement("p");
  p.textContent = "> " + texto;
  logEl.appendChild(p);
  logEl.scrollTop = logEl.scrollHeight;
}
 
function atacar() {
  const humanosRestantes = humanos.filter(Boolean).length;
  if (humanosRestantes === 0) {
    log("✅ Todos os humanos foram derrotados!");
    return;
  }
 
  const dano = Math.floor(Math.random() * 20) + 1;
  const humanoIndex = humanos.findIndex(h => h);
 
  if (humanoIndex !== -1) {
    humanos[humanoIndex] = false;
    log(`💥 Gorila atacou e causou ${dano} de dano! Humano eliminado.`);
  }
 
  ataquesFeitos++;
  salvar();
  atualizar();
 
  // Humanos revidam automaticamente
  setTimeout(ataqueHumano, 1000);
}
 
function ataqueHumano() {
  const humanosRestantes = humanos.filter(Boolean).length;
  if (humanosRestantes === 0 || vidaGorila <= 0) return;
 
  const chance = Math.random(); // 0 a 1
  if (chance <= 0.7) { // 70% de chance de acertar
    const dano = Math.floor(Math.random() * 11) + 5; // 5 a 15 de dano
    vidaGorila = Math.max(0, vidaGorila - dano);
    log(`🗡️ Humanos contra-atacaram! Gorila sofreu ${dano} de dano.`);
  } else {
    log(`💨 Humanos erraram o ataque!`);
  }
 
  salvar();
  atualizar();
}
 
function defender() {
  log("🛡️ Gorila está em posição de defesa.");
}
 
function curar() {
  if (vidaGorila <= 0) {
    log("⚠️ O gorila está morto e não pode se curar.");
    return;
  }
 
  const cura = Math.floor(Math.random() * 15) + 5;
  vidaGorila = Math.min(100, vidaGorila + cura);
  log(`💚 Gorila se curou em ${cura} pontos.`);
  salvar();
  atualizar();
}
 
function resetar() {
  vidaGorila = 100;
  ataquesFeitos = 0;
  humanos = Array(100).fill(true);
  logEl.innerHTML = "";
  log("🔄 Jogo reiniciado!");
  salvar();
  atualizar();
  ativarBotoes();
}
 
function desativarBotoes() {
  document.querySelectorAll("button").forEach(btn => {
    if (btn.textContent !== "🔄 Resetar") btn.disabled = true;
  });
}
 
function ativarBotoes() {
  document.querySelectorAll("button").forEach(btn => {
    btn.disabled = false;
  });
}
 
carregar();
atualizar();
 