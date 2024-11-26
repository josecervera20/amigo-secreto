let listaAmigos = [];

/**
 * Añade un amigo a la lista si es válido.
 */
function adicionar() {
  const inputNombreAmigo = document.getElementById("nombre-amigo");
  const nombreAmigo = inputNombreAmigo.value.trim().toUpperCase();

  if (!validarNombreAmigo(nombreAmigo)) return;

  agregarAmigo(nombreAmigo);
  limpiarInput(inputNombreAmigo);
  actualizarVistaLista();
  limpiarResultadosSorteo();
}

/**
 * Valida que el nombre del amigo no sea vacío, ni contenga números o caracteres especiales, ni esté repetido.
 * @param {string} nombreAmigo - Nombre del amigo.
 * @returns {boolean} - Indica si el nombre es válido.
 */
function validarNombreAmigo(nombreAmigo) {
  if (!nombreAmigo) {
    alert("Por favor, escribe un nombre.");
    return false;
  }

  if (!/^[A-ZÁÉÍÓÚÑ ]+$/i.test(nombreAmigo)) {
    alert(
      "El nombre solo puede contener letras y espacios. Intenta nuevamente."
    );
    return false;
  }

  if (listaAmigos.includes(nombreAmigo)) {
    alert("El nombre ya ha sido agregado. Intenta con otro.");
    return false;
  }

  return true;
}

/**
 * Agrega un amigo a la lista.
 * @param {string} nombreAmigo - Nombre del amigo.
 */
function agregarAmigo(nombreAmigo) {
  listaAmigos.push(nombreAmigo);
}

/**
 * Limpia el campo de entrada.
 * @param {HTMLElement} input - Elemento de entrada a limpiar.
 */
function limpiarInput(input) {
  input.value = "";
}

/**
 * Realiza el sorteo si hay al menos 4 participantes.
 */
function sortear() {
  if (listaAmigos.length < 4) {
    alert("¡Necesitamos al menos 4 participantes para realizar el sorteo!");
    return;
  }

  const resultadoSorteo = generarSorteo();
  mostrarResultadosSorteo(resultadoSorteo);
}

/**
 * Genera los pares para el sorteo.
 * @returns {string[]} - Lista de resultados del sorteo.
 */
function generarSorteo() {
  const listaMezclada = [...listaAmigos];
  mezclarLista(listaMezclada);

  return listaMezclada.map(
    (amigo, index) =>
      `${amigo} → ${listaMezclada[(index + 1) % listaMezclada.length]}`
  );
}

/**
 * Mezcla la lista de amigos de forma aleatoria.
 * @param {string[]} lista - Lista de amigos a mezclar.
 */
function mezclarLista(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const indiceAleatorio = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[i]];
  }
}

/**
 * Muestra los resultados del sorteo en la vista.
 * @param {string[]} resultados - Resultados del sorteo.
 */
function mostrarResultadosSorteo(resultados) {
  const contenedorResultados = document.getElementById("lista-sorteo");
  contenedorResultados.innerHTML = resultados.join("<br>");
}

/**
 * Reinicia el programa limpiando las listas y las vistas.
 */
function reiniciar() {
  listaAmigos = [];
  limpiarResultadosSorteo();
  actualizarVistaLista();
  alert("¡La lista y el sorteo han sido reiniciados!");
}

/**
 * Limpia los resultados del sorteo en la vista.
 */
function limpiarResultadosSorteo() {
  const contenedorResultados = document.getElementById("lista-sorteo");
  contenedorResultados.innerHTML = "";
}

/**
 * Actualiza la vista de la lista de amigos.
 */
function actualizarVistaLista() {
  const contenedorAmigos = document.getElementById("lista-amigos");
  contenedorAmigos.innerHTML = "";

  listaAmigos.forEach((amigo, index) => {
    const parrafo = document.createElement("p");
    parrafo.textContent = amigo;
    parrafo.addEventListener("click", () => eliminarAmigo(index));
    contenedorAmigos.appendChild(parrafo);
  });
}

/**
 * Elimina un amigo de la lista según su posición y muestra un mensaje con su nombre.
 * @param {number} index - Índice del amigo a eliminar.
 */
function eliminarAmigo(index) {
  const nombreEliminado = listaAmigos[index];
  listaAmigos.splice(index, 1);
  actualizarVistaLista();
  limpiarResultadosSorteo();
  alert(`"${nombreEliminado}" ha sido eliminado de la lista.`);
}
