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
    $informacionCarta.className = "infromacion-carta";
    $informacionCarta.style.backgroundColor = color;

    $carta.appendChild($informacionCarta);
    $contenedorCartas.appendChild($carta);
  });

  $contenedorJuego.appendChild($contenedorCartas);
};

generarCartas(coloresCartas);
