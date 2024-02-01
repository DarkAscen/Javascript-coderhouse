const contenedor = document.getElementById("contenedor")
const pagarCarrito = document.querySelector("img#carrito")
const botonVolver = document.querySelector("button#volver")
const inputBuscar = document.querySelector("input.buscador")

function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) ?? []
}

const carrito = recuperarCarrito()

let peluchesDisponibles = [{nombre: "OSO POLAR", id: 1, valor: 46, descripcion: "Peluche de un oso polar", imagen: "./imagenes/osoPolar.webp"},
    {nombre: "PINGUINO", id: 2, valor: 32, descripcion: "Peluche de un pinguino", imagen: "./imagenes/pinguino.webp"},
    {nombre: "FOCA", id: 3, valor: 18, descripcion: "Peluche de una foca", imagen: "./imagenes/foca.webp"},
    {nombre: "ORCA", id: 4, valor: 22, descripcion: "Peluche de orca", imagen: "./imagenes/orca.jpg"},
    {nombre: "BALLENA AZUL", id: 5, valor: 36, descripcion: "Peluche de ballena azul", imagen: "./imagenes/ballenaAzul.jpg"},
    {nombre: "PEZ", id: 6, valor: 16, descripcion: "Peluche de pez de la Antartida", imagen: "./imagenes/pez.jpeg"}];

inputBuscar.addEventListener("keypress", (e)=> {
    if (e.key === "Enter" && inputBuscar.value.trim() !== "") {
        const resultado = peluchesDisponibles.filter((peluche)=> peluche.nombre.includes(inputBuscar.value.trim().toUpperCase()) )
        cargarPeluches(resultado.length > 0 ? resultado : peluchesDisponibles);
    }
})

inputBuscar.addEventListener("input", ()=> {
    inputBuscar.value.trim() === "" && cargarPeluches(peluchesDisponibles);
})

function cartaPeluche (peluche) {
    return `<div class="carta">
                <div><img src="${peluche.imagen}" class="imagen"></div>
                <div class="cartaNombre"><p>${peluche.nombre}</p></div>
                <div class="cartaPrecio"><p>$${peluche.valor} USD</p></div>
                <button id="${peluche.id}" class="button button-outline button-add" title="Agregar al carrito">COMPRAR</button>
            </div>`
}

function cartaError () {
    return `<div class="card">
                <h3>No se han podido cargar los productos</h3>
            </div>`
}

function cargarPeluches (array) {
    if (array.length > 0) {
        contenedor.innerHTML = "";

        array.forEach((peluche)=> {
            contenedor.innerHTML += cartaPeluche(peluche)
        })
        botonesComprar();
        } else {
        contenedor.innerHTML = cartaError ()
    }
}

cargarPeluches(peluchesDisponibles)

pagarCarrito.addEventListener("mousemove", ()=> {
    if (carrito.length > 0) {
        pagarCarrito.title = "Usted posee " + carrito.length + " productos en el carrito";
    }
})

pagarCarrito.addEventListener("click", ()=> {
    carrito.length > 0 ? location.href = "../paginas/checkout.html" : notificar('El carrito se encuentra vacio.', 'darkorange');
})

function botonesComprar () {
    const botonesComprar = document.querySelectorAll("button.button-add");
    for (let boton of botonesComprar) {
        boton.addEventListener("click", ()=> {
            const pelucheSeleccionado = peluchesDisponibles.find((peluche)=> peluche.id === parseInt(boton.id));
            carrito.push(pelucheSeleccionado);
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
            notificar(`${pelucheSeleccionado.nombre} se agregó al carrito.`, 'green')
        })
    }
}

function notificar(mensaje, estilo) {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        style: { background: estilo, }
    }).showToast()
}