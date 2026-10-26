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

// Dibuja todos los libros del array en pantalla.
// La llamamos al abrir la página, y de nuevo cada vez que se agrega un libro.
function renderBiblioteca() {
  // Vaciamos la caja antes de volver a dibujar, para no duplicar tarjetas.
  contenedor.innerHTML = "";

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
}

renderBiblioteca();

// --- Formulario para agregar libros ---

const formulario = document.getElementById("form-agregar");

formulario.addEventListener("submit", evento => {
  // Evita que el formulario recargue la página (su comportamiento por defecto).
  evento.preventDefault();

  const inputTitulo = document.getElementById("input-titulo");
  const inputAutor = document.getElementById("input-autor");
  const inputEstado = document.getElementById("input-estado");

  libros.push({
    titulo: inputTitulo.value,
    autor: inputAutor.value,
    estado: inputEstado.value
  });

  renderBiblioteca();

  // Limpiamos el formulario para cargar el siguiente libro.
  formulario.reset();
});
