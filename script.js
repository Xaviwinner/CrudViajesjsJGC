class Cliente {
  constructor(nombre, apellido, email, telefono) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
  }
}
class Viaje {
  constructor(codigo, destino, precio, tipo) {
    this.codigo = codigo;
    this.destino = destino;
    this.precio = precio;
    this.tipo = tipo; 
  }
}
class Reserva {
  constructor(cliente, viaje, fecha) {
    this.cliente = cliente;
    this.viaje = viaje;
    this.fecha = fecha; 
  }
}
let clientes = [];
let viajes = [];
let reservas = [];
// Clientes
const eleccionnombre = document.getElementById("nombre");
const eleccionapellidos = document.getElementById("apellidos");
const eleccionmail = document.getElementById("gmail");
const eleccionnumero = document.getElementById("numero");
const botoncliente = document.getElementById("botondelcliente");
const tabladeclientes = document.getElementById("tablacliente");
// Viajes
const codigopaquete = document.getElementById("codigo");
const dest = document.getElementById("destino");
const precio = document.getElementById("coste");
const eleccionpaquete = document.getElementById("tipopaquete");
const tipopaquere = document.getElementById("selectorpaquete");
const botondelvieje = document.getElementById("añadirviaje");
const tabladeviajes = document.getElementById("tablaviajes");
// Reservas
const btnSelectCliente = document.getElementById("btnSelectCliente");
const btnSelectViaje = document.getElementById("btnSelectViaje");
const selectordelcliente = document.getElementById("selectorcliente");
const selectordelviaje = document.getElementById("selectorviaje");
const botondelasreservas = document.getElementById("botondereservas");
const tabladereservas = document.getElementById("tablareservas");
function guardarTodo() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
  localStorage.setItem("viajes", JSON.stringify(viajes));
  localStorage.setItem("reservas", JSON.stringify(reservas));
}
function cargarTodo() {
  clientes = JSON.parse(localStorage.getItem("clientes")) ;
  viajes = JSON.parse(localStorage.getItem("viajes")) ;
  reservas = JSON.parse(localStorage.getItem("reservas")) ;
}
function pintarClientes() {
  tabladeclientes.innerHTML = "";

  clientes.forEach((cliente, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cliente.nombre}</td>
      <td>${cliente.apellido}</td>
      <td>${cliente.email}</td>
      <td>${cliente.telefono}</td>
      <td>
        <button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button>
      </td>
    `;

    tabladeclientes.appendChild(tr);
  });
}
botoncliente.addEventListener("click", () => {
  const nombre = eleccionnombre.value.trim();
  const apellidos = eleccionapellidos.value.trim();
  const email = eleccionmail.value.trim();
  const telefono = eleccionnumero.value.trim();

  if (!nombre || !apellidos || !email || !telefono) {
    alert("rellena todos los campos del cliente");
    return;
  }
  const nuevoCliente = new Cliente(nombre, apellidos, email, telefono);
  clientes.push(nuevoCliente);

  guardarTodo();
  pintarClientes();
  pintarDropdownClientes();
});
tabladeclientes.addEventListener("click", (evento) => {
  if (
    evento.target.tagName === "BUTTON" && evento.target.dataset.index !== undefined
  ) {
    const index = Number(evento.target.dataset.index);

    clientes.splice(index, 1);

    guardarTodo();
    pintarClientes();
    pintarDropdownClientes();
  }
});
let clienteSeleccionadoIndex = null;
function pintarDropdownClientes() {
  selectordelcliente.innerHTML = "";

  clientes.forEach((cliente, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button class="dropdown-item" type="button" data-index="${index}">
        ${cliente.nombre} ${cliente.apellido}
      </button>
    `;
    selectordelcliente.appendChild(li);
  });
}
selectordelcliente.addEventListener("click", (evento) => {
  if (
    evento.target.tagName === "BUTTON" &&
    evento.target.dataset.index !== undefined
  ) {
    clienteSeleccionadoIndex = Number(evento.target.dataset.index);

    const cliente = clientes[clienteSeleccionadoIndex];
    btnSelectCliente.textContent = `${cliente.nombre} ${cliente.apellido}`;
  }
});
let tipoPaqueteSeleccionado = null; 
tipopaquere.addEventListener("click", (evento) => {
  if (evento.target.tagName === "BUTTON") {
    tipoPaqueteSeleccionado = evento.target.textContent.trim(); // "solo" o "empaquetado"
    eleccionpaquete.textContent = `Tipo: ${tipoPaqueteSeleccionado}`;
  }
});
function pintarViajes() {
  tabladeviajes.innerHTML = "";

  viajes.forEach((viaje, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${viaje.codigo}</td>
      <td>${viaje.destino}</td>
      <td>${viaje.precio}</td>
      <td>${viaje.tipo}</td>
      <td>
        <button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button>
      </td>
    `;

    tabladeviajes.appendChild(tr);
  });
}
tabladeviajes.addEventListener("click", (evento) => {
  if (
    evento.target.tagName === "BUTTON" &&
    evento.target.dataset.index !== undefined
  ) {
    const index = Number(evento.target.dataset.index);

    viajes.splice(index, 1);

    guardarTodo();
    pintarViajes();
    pintarDropdownViajes();
  }
});

botondelvieje.addEventListener("click", () => {
  const codigo = codigopaquete.value.trim();
  const destino = dest.value.trim();
  const precioTexto = precio.value.trim();
  const precio = Number(precioTexto);
  if (!codigo || !destino || !precioTexto) {
    alert("rellena código destino y precio");
    return;
  }

  if (precio <= 0) {
    alert("el precio debe ser un número mayor que 0");
    return;
  }

  if (!tipoPaqueteSeleccionado) {
    alert("selecciona un tipo de paquete");
    return;
  }
  const nuevoViaje = new Viaje(codigo, destino, precio, tipoPaqueteSeleccionado);
  viajes.push(nuevoViaje);
  guardarTodo();
  pintarViajes();
  pintarDropdownViajes();
  codigopaquete.value = "";
  dest.value = "";
  precio.value = "";
  tipoPaqueteSeleccionado = null;
  eleccionpaquete.textContent = "Tipo de paquete";
});

cargarTodo();
pintarClientes();
pintarDropdownClientes();
pintarViajes();
pintarDropdownViajes();
pintarReservas();
