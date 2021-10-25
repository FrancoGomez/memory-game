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

let coloresCartas = colores.concat(colores);

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

generarCartas(coloresCartas)