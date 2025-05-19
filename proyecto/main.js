const frases = {
  feliz: ["¡Sigue sonriendo! Hoy va a ser un gran día 😄", "Tu alegría es contagiosa 😃"],
  triste: ["Todo mejora con el tiempo 🌈", "Permítete sentir, luego sigue adelante 💪"],
  estresado: ["Respira profundo... tú puedes con esto 🧘‍♂️", "Haz una pausa, tu paz es prioridad 😌"],
  relajado: ["Qué bien se siente estar en calma 😎", "Disfruta este momento tranquilo 🌿"]
};

const botones = document.querySelectorAll("button[data-estado]");
const fraseEl = document.getElementById("frase");
const historialEl = document.getElementById("historial");

function guardarEstado(estado) {
  const hoy = new Date().toLocaleDateString("es-CO");
  const datos = JSON.parse(localStorage.getItem("historialMood")) || [];
  datos.push({ fecha: hoy, estado });
  localStorage.setItem("historialMood", JSON.stringify(datos));
}

function mostrarFrase(estado) {
  const opciones = frases[estado];
  const seleccionada = opciones[Math.floor(Math.random() * opciones.length)];
  fraseEl.textContent = seleccionada;
}

function actualizarHistorial() {
  historialEl.innerHTML = "";
  const datos = JSON.parse(localStorage.getItem("historialMood")) || [];
  const ultimos = datos.slice(-7).reverse(); // últimos 7 días
  ultimos.forEach(dato => {
    const emoji = {
      feliz: "😊",
      triste: "😔",
      estresado: "😤",
      relajado: "😎"
    }[dato.estado];
    const li = document.createElement("li");
    li.textContent = `${dato.fecha}: ${emoji}`;
    historialEl.appendChild(li);
  });
}

botones.forEach(btn => {
  btn.addEventListener("click", () => {
    const estado = btn.dataset.estado;
    mostrarFrase(estado);
    guardarEstado(estado);
    actualizarHistorial();
  });
});

actualizarHistorial();
