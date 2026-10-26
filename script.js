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
    const encabezado = capitulo.nombre
      ? `Capítulo ${indice + 1} — ${capitulo.nombre}`
      : `Capítulo ${indice + 1}`;

    tarjeta.innerHTML = `
      <h3>${encabezado}</h3>
      <p>Intensidad: ${capitulo.intensidad} / 5</p>
      <p>Emociones: ${emocionesTexto || "(ninguna marcada)"}</p>
      ${capitulo.nota ? `<p class="nota-capitulo">"${capitulo.nota}"</p>` : ""}
      <div class="acciones-capitulo">
        <button class="boton-editar" type="button">Editar</button>
        <button class="boton-borrar" type="button">Borrar</button>
      </div>
    `;

    tarjeta.querySelector(".boton-editar").addEventListener("click", () => editarCapitulo(indice));
    tarjeta.querySelector(".boton-borrar").addEventListener("click", () => borrarCapitulo(indice));

    listaCapitulos.appendChild(tarjeta);
  });
}

// El número al lado del slider se actualiza mientras lo arrastrás.
const inputIntensidad = document.getElementById("input-intensidad");
const valorIntensidad = document.getElementById("valor-intensidad");

inputIntensidad.addEventListener("input", () => {
  valorIntensidad.textContent = inputIntensidad.value;
});

// --- Formulario para agregar / editar capítulos ---

const formularioCapitulo = document.getElementById("form-capitulo");
const inputNombreCapitulo = document.getElementById("input-nombre-capitulo");
const inputNota = document.getElementById("input-nota");
const botonGuardarCapitulo = document.getElementById("boton-guardar-capitulo");
const botonCancelarEdicion = document.getElementById("boton-cancelar-edicion");

// Si es null, el formulario está agregando un capítulo nuevo.
// Si tiene un número, es el índice del capítulo que se está editando.
let indiceCapituloEditando = null;

function borrarCapitulo(indice) {
  const confirmado = confirm("¿Seguro que querés borrar este capítulo?");
  if (!confirmado) return;

  libros[indiceLibroActual].capitulos.splice(indice, 1);
  renderCapitulos();
}

function editarCapitulo(indice) {
  const capitulo = libros[indiceLibroActual].capitulos[indice];

  indiceCapituloEditando = indice;

  inputNombreCapitulo.value = capitulo.nombre;
  inputIntensidad.value = capitulo.intensidad;
  valorIntensidad.textContent = capitulo.intensidad;
  inputNota.value = capitulo.nota;

  // Marcamos los checkboxes que correspondan a las emociones guardadas.
  document.querySelectorAll('input[name="emocion"]').forEach(checkbox => {
    checkbox.checked = capitulo.emociones.includes(checkbox.value);
  });

  botonGuardarCapitulo.textContent = "Guardar cambios";
  botonCancelarEdicion.style.display = "inline-block";

  // Llevamos la vista hacia el formulario, por si el capítulo estaba más abajo.
  formularioCapitulo.scrollIntoView({ behavior: "smooth" });
}

function salirModoEdicion() {
  indiceCapituloEditando = null;
  formularioCapitulo.reset();
  valorIntensidad.textContent = "0";
  botonGuardarCapitulo.textContent = "Agregar capítulo";
  botonCancelarEdicion.style.display = "none";
}

botonCancelarEdicion.addEventListener("click", salirModoEdicion);

formularioCapitulo.addEventListener("submit", evento => {
  evento.preventDefault();

  // Juntamos los checkboxes de emociones que estén marcados.
  const checkboxesMarcados = document.querySelectorAll('input[name="emocion"]:checked');
  const emociones = Array.from(checkboxesMarcados).map(checkbox => checkbox.value);

  const datosCapitulo = {
    nombre: inputNombreCapitulo.value,
    intensidad: Number(inputIntensidad.value),
    emociones: emociones,
    nota: inputNota.value
  };

  if (indiceCapituloEditando === null) {
    libros[indiceLibroActual].capitulos.push(datosCapitulo);
  } else {
    libros[indiceLibroActual].capitulos[indiceCapituloEditando] = datosCapitulo;
  }

  renderCapitulos();
  salirModoEdicion();
});
