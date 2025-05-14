/**
 * Lista principal de amigos.
 * @type {string[]}
 */
let listaAmigos = [];

/**
 * Maneja el evento de agregar un amigo:
 * valida el nombre, lo agrega a la lista y actualiza la vista.
 * @returns {void}
 */
function adicionar() {
  const inputNombre = document.getElementById("nombre-amigo");
  const nombre = inputNombre.value.trim().toUpperCase();

  if (!esNombreValido(nombre)) return;

  listaAmigos.push(nombre);
  inputNombre.value = "";
  actualizarVistaLista();
  limpiarResultadosSorteo();
  actualizarBotonSorteo();
}

/**
 * Valida si el nombre ingresado es correcto y único.
 * @param {string} nombre - Nombre a validar.
 * @returns {boolean} - Retorna true si es válido.
 */
function esNombreValido(nombre) {
  if (!nombre) {
    alert("Por favor, escribe un nombre.");
    return false;
  }

  if (!/^[A-ZÁÉÍÓÚÑ ]+$/i.test(nombre)) {
    alert("El nombre solo puede contener letras y espacios.");
    return false;
  }

  if (listaAmigos.includes(nombre)) {
    alert("El nombre ya ha sido agregado.");
    return false;
  }

  return true;
}

/**
 * Realiza el sorteo y muestra resultados si hay suficientes participantes.
 * @returns {void}
 */
function sortear() {
  if (listaAmigos.length < 4) {
    alert("¡Se necesitan al menos 4 participantes!");
    return;
  }

  const resultados = generarSorteo();
  mostrarResultadosSorteo(resultados);
}

/**
 * Genera parejas aleatorias sin repeticiones.
 * @returns {string[]} - Lista de resultados del sorteo.
 */
function generarSorteo() {
  const mezcla = [...listaAmigos];
  mezclarLista(mezcla);

  return mezcla.map(
    (amigo, i) => `${amigo} → ${mezcla[(i + 1) % mezcla.length]}`
  );
}

/**
 * Mezcla una lista usando el algoritmo de Fisher-Yates.
 * @param {string[]} lista - Lista de amigos a mezclar.
 * @returns {void}
 */
function mezclarLista(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
}

/**
 * Muestra los resultados del sorteo en el DOM.
 * @param {string[]} resultados - Resultados generados.
 * @returns {void}
 */
function mostrarResultadosSorteo(resultados) {
  const contenedor = document.getElementById("lista-sorteo");
  contenedor.innerHTML = resultados.join("<br>");
}

/**
 * Reinicia la lista de amigos y limpia la vista solo si hay contenido.
 * @returns {void}
 */
function reiniciar() {
  const hayAmigos = listaAmigos.length > 0;
  const resultadosSorteo = document
    .getElementById("lista-sorteo")
    .innerHTML.trim();

  if (!hayAmigos && !resultadosSorteo) {
    alert("Aún no se ha agregado ningún amigo ni realizado un sorteo.");
    return;
  }

  listaAmigos = [];
  actualizarVistaLista();
  limpiarResultadosSorteo();
  alert("La lista de amigos y los resultados del sorteo han sido reiniciados.");
  actualizarBotonSorteo(); // Asegura que el botón de sorteo se deshabilite al reiniciar
}

/**
 * Limpia los resultados del sorteo en el DOM.
 * @returns {void}
 */
function limpiarResultadosSorteo() {
  document.getElementById("lista-sorteo").innerHTML = "";
}

/**
 * Muestra la lista de amigos en pantalla y permite su eliminación.
 * @returns {void}
 */
function actualizarVistaLista() {
  const contenedor = document.getElementById("lista-amigos");
  contenedor.innerHTML = "";

  listaAmigos.forEach((amigo, i) => {
    const p = document.createElement("p");
    p.textContent = amigo;
    p.addEventListener("click", () => eliminarAmigo(i));
    contenedor.appendChild(p);
  });
}

/**
 * Elimina un amigo de la lista por índice y actualiza la vista.
 * @param {number} i - Índice del amigo a eliminar.
 * @returns {void}
 */
function eliminarAmigo(i) {
  const eliminado = listaAmigos.splice(i, 1)[0];
  actualizarVistaLista();
  limpiarResultadosSorteo();
  alert(`"${eliminado}" ha sido eliminado.`);
  actualizarBotonSorteo(); // Actualiza el estado del botón después de eliminar un amigo
}

/**
 * Permite agregar un amigo presionando Enter en el input.
 * Ejecuta la función 'adicionar' y evita el envío del formulario.
 */
document.addEventListener("DOMContentLoaded", () => {
  const inputNombre = document.getElementById("nombre-amigo");
  inputNombre.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      adicionar();
    }
  });

  // Actualiza el estado del botón al cargar la página
  actualizarBotonSorteo();
});

/**
 * Deshabilita o habilita el botón de sorteo según el número de amigos.
 * @returns {void}
 */
function actualizarBotonSorteo() {
  const botonSorteo = document.querySelector(".button.secondary");
  if (listaAmigos.length < 4) {
    botonSorteo.disabled = true;
    botonSorteo.classList.add("disabled");
  } else {
    botonSorteo.disabled = false;
    botonSorteo.classList.remove("disabled");
  }
}
