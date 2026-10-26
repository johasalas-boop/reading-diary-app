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
      <div class="acciones-libro">
        <button class="boton-editar-libro" type="button">Editar</button>
        <button class="boton-borrar-libro" type="button">Borrar</button>
      </div>
    `;

    // Al hacer clic en la tarjeta, abrimos la vista de capítulos de ese libro.
    tarjeta.addEventListener("click", () => abrirVistaCapitulos(indice));

    // Los botones están dentro de la tarjeta, así que frenamos la propagación
    // del clic para que no dispare también el "abrir vista de capítulos".
    tarjeta.querySelector(".boton-editar-libro").addEventListener("click", evento => {
      evento.stopPropagation();
      editarLibro(indice);
    });

    tarjeta.querySelector(".boton-borrar-libro").addEventListener("click", evento => {
      evento.stopPropagation();
      borrarLibro(indice);
    });

    contenedor.appendChild(tarjeta);
  });
}

renderBiblioteca();

// --- Formulario para agregar / editar libros ---

const formulario = document.getElementById("form-agregar");
const inputTitulo = document.getElementById("input-titulo");
const inputAutor = document.getElementById("input-autor");
const inputEstado = document.getElementById("input-estado");
const botonGuardarLibro = document.getElementById("boton-guardar-libro");
const botonCancelarEdicionLibro = document.getElementById("boton-cancelar-edicion-libro");

// Si es null, el formulario está agregando un libro nuevo.
// Si tiene un número, es el índice del libro que se está editando.
let indiceLibroEditando = null;

function borrarLibro(indice) {
  const confirmado = confirm("¿Seguro que querés borrar este libro? También se van a borrar sus capítulos cargados.");
  if (!confirmado) return;

  libros.splice(indice, 1);
  renderBiblioteca();
}

function editarLibro(indice) {
  const libro = libros[indice];

  indiceLibroEditando = indice;

  inputTitulo.value = libro.titulo;
  inputAutor.value = libro.autor;
  inputEstado.value = libro.estado;

  botonGuardarLibro.textContent = "Guardar cambios";
  botonCancelarEdicionLibro.style.display = "inline-block";

  formulario.scrollIntoView({ behavior: "smooth" });
}

function salirModoEdicionLibro() {
  indiceLibroEditando = null;
  formulario.reset();
  botonGuardarLibro.textContent = "Agregar";
  botonCancelarEdicionLibro.style.display = "none";
}

botonCancelarEdicionLibro.addEventListener("click", salirModoEdicionLibro);

formulario.addEventListener("submit", evento => {
  // Evita que el formulario recargue la página (su comportamiento por defecto).
  evento.preventDefault();

  if (indiceLibroEditando === null) {
    libros.push({
      titulo: inputTitulo.value,
      autor: inputAutor.value,
      estado: inputEstado.value,
      capitulos: []
    });
  } else {
    // Actualizamos los datos del libro sin tocar los capítulos que ya tenía.
    const libro = libros[indiceLibroEditando];
    libro.titulo = inputTitulo.value;
    libro.autor = inputAutor.value;
    libro.estado = inputEstado.value;
  }

  renderBiblioteca();
  salirModoEdicionLibro();
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

  renderGrafico();
}

// --- Curva emocional ---

// Los elementos SVG no se crean con document.createElement (eso es para HTML),
// sino con document.createElementNS, pasándole la "dirección" del lenguaje SVG.
const svgNS = "http://www.w3.org/2000/svg";

const graficoEmocional = document.getElementById("grafico-emocional");
const mensajeGraficoVacio = document.getElementById("mensaje-grafico-vacio");

// Dibuja la curva de intensidad emocional del libro que se está viendo.
function renderGrafico() {
  const capitulos = libros[indiceLibroActual].capitulos;

  if (capitulos.length === 0) {
    graficoEmocional.style.display = "none";
    mensajeGraficoVacio.style.display = "block";
    return;
  }

  graficoEmocional.style.display = "block";
  mensajeGraficoVacio.style.display = "none";
  graficoEmocional.innerHTML = "";

  // Medidas del "lienzo" (coinciden con el viewBox del SVG en el HTML).
  const ancho = 300;
  const alto = 160;
  const margen = 20;
  const anchoGrafico = ancho - margen * 2;
  const altoGrafico = alto - margen * 2;

  // Líneas horizontales de fondo, una por cada nivel de intensidad (0 a 5).
  for (let nivel = 0; nivel <= 5; nivel++) {
    const y = margen + ((5 - nivel) / 5) * altoGrafico;

    const linea = document.createElementNS(svgNS, "line");
    linea.setAttribute("x1", margen);
    linea.setAttribute("x2", ancho - margen);
    linea.setAttribute("y1", y);
    linea.setAttribute("y2", y);
    linea.setAttribute("class", "linea-nivel");
    graficoEmocional.appendChild(linea);

    const etiqueta = document.createElementNS(svgNS, "text");
    etiqueta.setAttribute("x", margen - 6);
    etiqueta.setAttribute("y", y + 3);
    etiqueta.setAttribute("class", "etiqueta-nivel");
    etiqueta.textContent = nivel;
    graficoEmocional.appendChild(etiqueta);
  }

  // Calculamos la posición (x, y) de cada capítulo según su intensidad.
  const puntos = capitulos.map((capitulo, indice) => {
    const x = capitulos.length === 1
      ? margen + anchoGrafico / 2
      : margen + (indice / (capitulos.length - 1)) * anchoGrafico;
    const y = margen + ((5 - capitulo.intensidad) / 5) * altoGrafico;
    return { x, y };
  });

  // La línea que conecta los puntos (solo tiene sentido con 2 o más capítulos).
  if (puntos.length > 1) {
    const puntosTexto = puntos.map(punto => `${punto.x},${punto.y}`).join(" ");
    const linea = document.createElementNS(svgNS, "polyline");
    linea.setAttribute("points", puntosTexto);
    linea.setAttribute("class", "linea-curva");
    graficoEmocional.appendChild(linea);
  }

  // Un círculo por cada capítulo.
  puntos.forEach(punto => {
    const circulo = document.createElementNS(svgNS, "circle");
    circulo.setAttribute("cx", punto.x);
    circulo.setAttribute("cy", punto.y);
    circulo.setAttribute("r", 4);
    circulo.setAttribute("class", "punto-curva");
    graficoEmocional.appendChild(circulo);
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

// --- Chips de emociones ---

// Lista de emociones que se pueden elegir. Arranca con las 9 de siempre,
// pero se le pueden sumar nuevas con el botón "+ Agregar".
let emocionesDisponibles = [
  "tristeza", "tension", "risa", "ternura", "enojo",
  "ansiedad", "sorpresa", "spicy", "cringe"
];

// Las emociones marcadas en el formulario que está abierto en este momento.
let emocionesSeleccionadas = [];

const contenedorChipsEmociones = document.getElementById("contenedor-chips-emociones");
const inputNuevaEmocion = document.getElementById("input-nueva-emocion");
const botonAgregarEmocion = document.getElementById("boton-agregar-emocion");

// Dibuja un chip por cada emoción disponible, marcando los que estén seleccionados.
function renderChipsEmociones() {
  contenedorChipsEmociones.innerHTML = "";

  emocionesDisponibles.forEach(emocion => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip-emocion";
    chip.textContent = emocion;

    if (emocionesSeleccionadas.includes(emocion)) {
      chip.classList.add("seleccionado");
    }

    chip.addEventListener("click", () => {
      if (emocionesSeleccionadas.includes(emocion)) {
        // Ya estaba marcada: la sacamos.
        emocionesSeleccionadas = emocionesSeleccionadas.filter(e => e !== emocion);
      } else {
        // No estaba marcada: la agregamos.
        emocionesSeleccionadas.push(emocion);
      }
      renderChipsEmociones();
    });

    contenedorChipsEmociones.appendChild(chip);
  });
}

renderChipsEmociones();

botonAgregarEmocion.addEventListener("click", () => {
  const nombreNuevaEmocion = inputNuevaEmocion.value.trim();
  if (!nombreNuevaEmocion) return;

  // Evitamos duplicados sin importar mayúsculas/minúsculas.
  const yaExiste = emocionesDisponibles.some(
    emocion => emocion.toLowerCase() === nombreNuevaEmocion.toLowerCase()
  );

  if (!yaExiste) {
    emocionesDisponibles.push(nombreNuevaEmocion);
  }

  // La dejamos seleccionada de una, ya que la acabás de cargar para este capítulo.
  if (!emocionesSeleccionadas.includes(nombreNuevaEmocion)) {
    emocionesSeleccionadas.push(nombreNuevaEmocion);
  }

  inputNuevaEmocion.value = "";
  renderChipsEmociones();
});

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

  // Si el capítulo tiene alguna emoción que ya no está en la lista disponible
  // (por ejemplo, se cargó en otra sesión), la agregamos para poder mostrarla marcada.
  capitulo.emociones.forEach(emocion => {
    if (!emocionesDisponibles.includes(emocion)) {
      emocionesDisponibles.push(emocion);
    }
  });

  emocionesSeleccionadas = [...capitulo.emociones];
  renderChipsEmociones();

  botonGuardarCapitulo.textContent = "Guardar cambios";
  botonCancelarEdicion.style.display = "inline-block";

  // Llevamos la vista hacia el formulario, por si el capítulo estaba más abajo.
  formularioCapitulo.scrollIntoView({ behavior: "smooth" });
}

function salirModoEdicion() {
  indiceCapituloEditando = null;
  formularioCapitulo.reset();
  valorIntensidad.textContent = "0";
  emocionesSeleccionadas = [];
  renderChipsEmociones();
  botonGuardarCapitulo.textContent = "Agregar capítulo";
  botonCancelarEdicion.style.display = "none";
}

botonCancelarEdicion.addEventListener("click", salirModoEdicion);

formularioCapitulo.addEventListener("submit", evento => {
  evento.preventDefault();

  const datosCapitulo = {
    nombre: inputNombreCapitulo.value,
    intensidad: Number(inputIntensidad.value),
    emociones: [...emocionesSeleccionadas],
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
