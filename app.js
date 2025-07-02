
// Elementos del DOM - el simbolo de $ es para recordar que es un elemtnos html
const $agregar = document.querySelector("#agregar");
const $borrar = document.querySelector("#borrar");
const $nombre = document.querySelector("#inputNombre");
const $listaDeVecinos = document.querySelector("#listaVecinos");
const $parrafo = document.querySelector("#mensaje");
const $ordenarPor = document.querySelector("#ordenarPor");

// Cargar vecinos . parseo si hay info, sino dejo un array vacia para q no de error
const vecinos = JSON.parse(localStorage.getItem("vecinos")) || [];

// Validar si el texto recibibo de imput cunple con la expresion para ver que no se usen solo esos caracteres
const esNombreValido = (texto) => /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(texto);

// Mostrar mensaje 
const mostrarTexto = (claseAgregada, claseQuitada, texto) => {
  $parrafo.classList.remove(claseQuitada);
  $parrafo.classList.add(claseAgregada);
  $parrafo.textContent = texto;
};

// Muestro mensaje cuando no haya vecinos en el localstorage usando la func mostrat texto
const listarVecinos = () => {
  $listaDeVecinos.innerHTML = "";

  if (vecinos.length === 0) {
    mostrarTexto("text", "success", "No hay vecinos para mostrar");
    return;
  }

  // Ordenoo la lsita usando el selector select, propago el array orignal y creo un a copia para ordenar y mostrar
  // sin modificar el original, con sort ordeno el nuevo array
  const vecinosOrdenados = [...vecinos];
  if ($ordenarPor.value === "nombre") {
    vecinosOrdenados.sort()
  }

  // recorro el ls para armar el listado creando los elementos li
  vecinosOrdenados.forEach((vecino, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${vecino}`;
    $listaDeVecinos.appendChild(li);
  });

  const total = document.createElement("li");
  total.textContent = `Total de vecinos: ${vecinos.length}`;
  total.classList.add("resumen");
  $listaDeVecinos.appendChild(total);
};

// Agregar vecino recortando los espacios en blanco pasando todo a mayuscla
const agregarVecino = () => {
  const valorNombre = $nombre.value.trim().toUpperCase();
  $parrafo.textContent = "";

  // controlo el imput para vacio, mayor a 3
  if (!valorNombre) {
    mostrarTexto("error", "success", "Debes ingresar un nombre.");
    return;
  }

  if (valorNombre.length < 3) {
    mostrarTexto("error", "success", "El nombre debe tener al menos 3 caracteres.");
    return;
  }

  // valido el texto enviado si esta dentro de los caracteres permitidos
  if (!esNombreValido(valorNombre)) {
    mostrarTexto("error", "success", "Solo se permiten letras y espacios.");
    return;
  }

  // agrego al array el vecino agregado y muestro mensaje
  vecinos.push(valorNombre);
  localStorage.setItem("vecinos", JSON.stringify(vecinos));
  $nombre.value = "";
  listarVecinos();
  mostrarTexto("success", "error", "Vecino agregado con éxito!");
};

// Borrar vecino
const borrarVecino = () => {
  const valorNombre = $nombre.value.trim().toUpperCase();

  if (!valorNombre) {
    mostrarTexto("error", "success", "Debes ingresar el nombre a borrar.");
    return;
  }

  const index = vecinos.indexOf(valorNombre);

  // valido si el ls esta  vacio
  if (index === -1) {
    mostrarTexto("error", "success", "No se encuentra el vecino a borrar.");
    return;
  }

  // elimino desde la posicion del index 1 posivion sola porque es 1 solo vecino 
  vecinos.splice(index, 1);
  localStorage.setItem("vecinos", JSON.stringify(vecinos));
  $nombre.value = "";
  listarVecinos();
  mostrarTexto("success", "error", "Vecino borrado con éxito 😎");
};

// Eventos
$agregar.addEventListener("click", agregarVecino);
$borrar.addEventListener("click", borrarVecino);
$ordenarPor.addEventListener("change", listarVecinos);

// Inicial
listarVecinos();
