// Datos de ejemplo (inventados) para probar la app sin usar datos reales.
const libros = [
  {
    titulo: "The Vegetarian",
    autor: "Han Kang",
    estado: "terminado"
  },
  {
    titulo: "I'm Starting to Worry About This Black Box of Doom",
    autor: "Jason Pargin",
    estado: "leyendo"
  },
  {
    titulo: "These Letters End in Tears",
    autor: "Musih Tedji Xaviere",
    estado: "abandonado"
  }
];

// Busca la caja vacía del HTML (el div con id "biblioteca").
const contenedor = document.getElementById("biblioteca");

// Por cada libro, armamos su tarjeta en HTML y la agregamos a la caja.
libros.forEach(libro => {
  const tarjeta = document.createElement("div");
  tarjeta.className = "libro";

  tarjeta.innerHTML = `
    <h2>${libro.titulo}</h2>
    <p>${libro.autor}</p>
    <span class="estado estado-${libro.estado}">${libro.estado}</span>
  `;

  contenedor.appendChild(tarjeta);
});
