const URL = "http://127.0.0.1:5500/";
const CANTIDAD_CARTAS = 16;

before(() => {
  cy.visit(URL);
});

describe("El juego existe", () => {
  it("Se genera modal", () => {
    cy.get(".contenido-modal");
  });

  it("Cartas son generadas", () => {
    cy.get("div.informacion-carta").should("have.length", CANTIDAD_CARTAS);
  });
});

describe("Juega juego", () => {
  let listaCartasPares, matrisCartasPares;

  it("Colores de cartas aleatorios", () => {
    cy.get("div.informacion-carta").then((cartas) => {
      let cartasOriginales = [];
      let cartasNuevas = [];

      cartas.each((indice, cartas) => {
        cartasOriginales.push(cartas.style.backgroundColor);
      });

      cy.visit(URL);

      cy.get("div.informacion-carta").then((cartas) => {
        cartas.each((indice, cartas) => {
          cartasNuevas.push(cartas.style.backgroundColor);
        });

        cy.wrap(cartasOriginales).should("not.deep.equal", cartasNuevas);
      });
    });
  });

  it("Modal se oculta al apretar comenzar", () => {
    cy.get("#boton-comenzar").click();
    cy.get("#container-contenedor-modal").should("have.class", "oculto");
  });

  it("Prueba combinacion erronea", () => {
    cy.get("div.informacion-carta").then((cartas) => {
      listaCartasPares = obtenerParesDeCartas(cartas);
      matrisCartasPares = Object.values(listaCartasPares);

      cy.get(matrisCartasPares[0][0]).click();
      cy.get(matrisCartasPares[1][0]).click();

      cy.get("div.informacion-carta").should("have.length", CANTIDAD_CARTAS);
    });
  });

  it("Resuelve juego", () => {
    cy.get("div.informacion-carta").should("have.length", CANTIDAD_CARTAS);

    matrisCartasPares.forEach((parCartas) => {
      cy.get(parCartas[0]).click();
      cy.get(parCartas[1]).click();
    });

    cy.get("div.informacion-carta").should("have.length", 0);
  });

  it("Aparece modal final", () => {
    cy.get("#container-contenedor-modal").should(
      "have.class",
      "container-contenedor-modal"
    );
  });

  it("Vuelve a generase juego al apretar comenzar", () => {
    cy.get("#boton-comenzar").click();
    cy.get("div.informacion-carta").should("have.length", CANTIDAD_CARTAS);
  });
});

function obtenerParesDeCartas(cartas) {
  const paresCartas = {};

  cartas.each((index, carta) => {
    const colorCarta = carta.style.backgroundColor;

    if (paresCartas[colorCarta]) {
      paresCartas[colorCarta].push(carta);
    } else {
      paresCartas[colorCarta] = [carta];
    }
  });

  return paresCartas;
}
