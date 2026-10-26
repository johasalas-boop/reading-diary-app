// Datos de ejemplo (inventados) para probar la app sin usar datos reales.
const libros = [
  {
    titulo: "The Vegetarian",
    autor: "Han Kang",
    estado: "terminado",
    capitulos: []
  },
  {
    titulo: "I'm Starting to Worry About This Black Box of Doom",
    autor: "Jason Pargin",
    estado: "leyendo",
    capitulos: []
  },
  {
    titulo: "These Letters End in Tears",
    autor: "Musih Tedji Xaviere",
    estado: "abandonado",
    capitulos: []
  }
];

// --- Vista de biblioteca ---

const vistaBiblioteca = document.getElementById("vista-biblioteca");
const contenedor = document.getElementById("biblioteca");

// Dibuja todos los libros del array en pantalla.
// La llamamos al abrir la página, y de nuevo cada vez que se agrega un libro.
function renderBiblioteca() {
  // Vaciamos la caja antes de volver a dibujar, para no duplicar tarjetas.
  contenedor.innerHTML = "";

  libros.forEach((libro, indice) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "libro";

    tarjeta.innerHTML = `
      <h2>${libro.titulo}</h2>
      <p>${libro.autor}</p>
      <span class="estado estado-${libro.estado}">${libro.estado}</span>
    `;

    // Al hacer clic en la tarjeta, abrimos la vista de capítulos de ese libro.
    tarjeta.addEventListener("click", () => abrirVistaCapitulos(indice));

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
    estado: inputEstado.value,
    capitulos: []
  });

  renderBiblioteca();

  // Limpiamos el formulario para cargar el siguiente libro.
  formulario.reset();
});

// --- Vista de capítulos ---

const vistaCapitulos = document.getElementById("vista-capitulos");
const tituloLibroActual = document.getElementById("titulo-libro-actual");
const listaCapitulos = document.getElementById("lista-capitulos");
const botonVolver = document.getElementById("boton-volver");

// Guarda el índice (la posición en el array "libros") del libro que estamos viendo.
let indiceLibroActual = null;

function abrirVistaCapitulos(indice) {
  indiceLibroActual = indice;
  tituloLibroActual.textContent = libros[indice].titulo;

  vistaBiblioteca.style.display = "none";
  vistaCapitulos.style.display = "block";

  renderCapitulos();
}

botonVolver.addEventListener("click", () => {
  vistaCapitulos.style.display = "none";
  vistaBiblioteca.style.display = "block";
});

// Dibuja los capítulos del libro que se está viendo actualmente.
function renderCapitulos() {
  const libro = libros[indiceLibroActual];
  listaCapitulos.innerHTML = "";

  libro.capitulos.forEach((capitulo, indice) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "capitulo";

    const emocionesTexto = capitulo.emociones.join(", ");

    tarjeta.innerHTML = `
      <h3>Capítulo ${indice + 1}</h3>
      <p>Intensidad: ${capitulo.intensidad} / 5</p>
      <p>Emociones: ${emocionesTexto || "(ninguna marcada)"}</p>
      ${capitulo.nota ? `<p class="nota-capitulo">"${capitulo.nota}"</p>` : ""}
    `;

    listaCapitulos.appendChild(tarjeta);
  });
}

// El número al lado del slider se actualiza mientras lo arrastrás.
const inputIntensidad = document.getElementById("input-intensidad");
const valorIntensidad = document.getElementById("valor-intensidad");

inputIntensidad.addEventListener("input", () => {
  valorIntensidad.textContent = inputIntensidad.value;
});

// --- Formulario para agregar capítulos ---

const formularioCapitulo = document.getElementById("form-capitulo");
const inputNota = document.getElementById("input-nota");

formularioCapitulo.addEventListener("submit", evento => {
  evento.preventDefault();

  // Juntamos los checkboxes de emociones que estén marcados.
  const checkboxesMarcados = document.querySelectorAll('input[name="emocion"]:checked');
  const emociones = Array.from(checkboxesMarcados).map(checkbox => checkbox.value);

  libros[indiceLibroActual].capitulos.push({
    intensidad: Number(inputIntensidad.value),
    emociones: emociones,
    nota: inputNota.value
  });

  renderCapitulos();

  formularioCapitulo.reset();
  valorIntensidad.textContent = "0";
});
