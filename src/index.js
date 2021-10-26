const $contenedorJuego = document.querySelector("#contenedor-juego");
const $containerContenedorModal = document.querySelector(
  "#container-contenedor-modal"
);
const $tituloModal = document.querySelector("#titulo-modal");
const $descripcionModal = document.querySelector("#descripcion-modal");
const $botonComenzar = document.querySelector("#boton-comenzar");

let colores = [
  "brown",
  "purple",
  "green",
  "red",
  "blue",
  "orange",
  "yellow",
  "pink",
];
let informacionPrimerCarta = "";
let informacionSegundaCarta = "";
let intentos = 0;
let modalCambiado = false;

const generarCartas = () => {
  const coloresCartas = mezclarColores(colores.concat(colores));

  const $contenedorCartas = document.createElement("div");
  $contenedorCartas.className = "contenedor-cartas";

  coloresCartas.forEach((color) => {
    const $carta = document.createElement("div");
    $carta.className = "carta";

    const $informacionCarta = document.createElement("div");
    $informacionCarta.className = "informacion-carta";
    $informacionCarta.style.backgroundColor = color;

    $carta.appendChild($informacionCarta);
    $contenedorCartas.appendChild($carta);
  });

  $contenedorJuego.appendChild($contenedorCartas);
};

const mezclarColores = (colores) => {
  let coloresRandom = colores.sort(() => {
    return 0.5 - Math.random();
  });

  return coloresRandom;
};

generarCartas();

$botonComenzar.onclick = () => {
  if (modalCambiado) {
    $contenedorJuego.firstChild.remove();
  }

  iniciarJuego();
};

const iniciarJuego = () => {
  if (modalCambiado) {
    generarCartas(coloresCartas);
    intentos = 0;
  }

  $containerContenedorModal.className = "oculto";
  habilitarInputJugador();
};

const habilitarInputJugador = () => {
  $contenedorJuego.onclick = (evento) => {
    if (evento.target.className === "informacion-carta") {
      manejarClickCarta(evento.target);
    }
  };
};

const manejarClickCarta = ($informacionCarta) => {
  $informacionCarta.style.opacity = 1;

  if (informacionPrimerCarta === "") {
    informacionPrimerCarta = $informacionCarta;
  } else if ($informacionCarta !== informacionPrimerCarta) {
    informacionSegundaCarta = $informacionCarta;

    manejarCorrespondenciaCartas(
      informacionPrimerCarta,
      informacionSegundaCarta
    );
    informacionPrimerCarta = "";
    informacionSegundaCarta = "";
  }
};

const manejarCorrespondenciaCartas = (
  $informacionPrimerCarta,
  $informacionSegundaCarta
) => {
  const colorPrimerCarta = $informacionPrimerCarta.style.backgroundColor;
  const colorSegundaCarta = $informacionSegundaCarta.style.backgroundColor;

  if (colorPrimerCarta === colorSegundaCarta) {
    setTimeout(() => {
      eliminarCartas($informacionPrimerCarta, $informacionSegundaCarta);

      verificarFinDelJuego();
    }, 500);
  } else {
    setTimeout(() => {
      $informacionPrimerCarta.style.opacity = 0;
      $informacionSegundaCarta.style.opacity = 0;
    }, 500);
  }

  intentos++;
};

const eliminarCartas = ($informacionPrimerCarta, $informacionSegundaCarta) => {
  $informacionPrimerCarta.parentNode.style.backgroundColor = "transparent";
  $informacionSegundaCarta.parentNode.style.backgroundColor = "transparent";

  $informacionPrimerCarta.remove();
  $informacionSegundaCarta.remove();
};

const verificarFinDelJuego = () => {
  if (document.querySelectorAll(".informacion-carta").length === 0) {
    $containerContenedorModal.className = $containerContenedorModal.id;

    mostrarModalFinJuego();
  }
};

const mostrarModalFinJuego = () => {
  if (modalCambiado) {
    $descripcionModal.textContent = `Terminaste el juego en ${intentos} intentos. Si asi lo deseas, podes pulsar comenzar para volver a jugar.`;
  } else {
    $tituloModal.textContent = "Felicidades!";
    $descripcionModal.textContent = `Terminaste el juego en ${intentos} intentos. Si asi lo deseas, podes pulsar comenzar para volver a jugar.`;
    modalCambiado = true;
  }
};
