const $contenedorJuego = document.querySelector("#contenedor-juego");

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
 -mlet informacionPrimerCarta = "";
let informacionSegundaCarta = "";
let intentos = 0;

const mezclarColores = (colores) => {
  let coloresRandom = colores.sort(() => {
    return 0.5 - Math.random();
  });

  return coloresRandom;
};

const coloresCartas = mezclarColores(colores.concat(colores));

const generarCartas = (coloresCartas) => {
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

generarCartas(coloresCartas);

const eliminarCartas = ($informacionPrimerCarta, $informacionSegundaCarta) => {
  $informacionPrimerCarta.remove();
  $informacionSegundaCarta.remove();
};

const manejarCorrespondenciaCartas = (
  $informacionPrimerCarta,
  $informacionSegundaCarta
) => {
  const colorPrimerCarta = $informacionPrimerCarta.style.backgroundColor;
  const colorSegundaCarta = $informacionSegundaCarta.style.backgroundColor;

  if (colorPrimerCarta === colorSegundaCarta) {
    eliminarCartas($informacionPrimerCarta, $informacionSegundaCarta);

    verificarFinDelJuego();
  }

  intentos++;
};

const verificarFinDelJuego = () => {
  if (document.querySelectorAll(".informacion-carta").length === 0) {
    console.log(`Felicidades, terminaste el juego en ${intentos} intentos!`);
  }
};

const manejarClickCarta = ($informacionCarta) => {
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

$contenedorJuego.onclick = (evento) => {
  if (evento.target.className === "informacion-carta") {
    manejarClickCarta(evento.target);
  }
};
