const contenedor = document.getElementById("contenedor")
const pagarCarrito = document.querySelector("img#carrito")
const botonVolver = document.querySelector("button#volver")
const inputBuscar = document.querySelector("input.buscador")
const recibirPeluches = "scripts/peluchesDisponibles.json"


function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) ?? []
}


const carrito = recuperarCarrito()


const peluchesDisponibles = [];


inputBuscar.addEventListener("keypress", (e)=> {
    if (e.key === "Enter" && inputBuscar.value.trim() !== "") {
        const resultado = peluchesDisponibles.filter((peluche)=> peluche.nombre.includes(inputBuscar.value.trim().toUpperCase()) )
        cargarPeluches(resultado.length > 0 ? resultado : peluchesDisponibles);
    }
})


inputBuscar.addEventListener("input", ()=> {
    inputBuscar.value.trim() === "" && cargarPeluches(peluchesDisponibles);
})


function peluchesJson() {
    fetch(recibirPeluches)
    .then((response)=> response.json())
    .then((data)=> peluchesDisponibles.push(...data))
    .then(()=> cargarPeluches(peluchesDisponibles))
    .catch((error)=> contenedor.innerHTML = cartaError())
}


peluchesJson()


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


function retornoPelucheNuevo(pelucheSeleccionado) {
    return pelucheNuevo = {
        id: pelucheSeleccionado.id,
        imagen: pelucheSeleccionado.imagen,
        nombre: pelucheSeleccionado.nombre,
        cantidad: 1,
        valor: pelucheSeleccionado.valor,
    }
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


pagarCarrito.addEventListener("mousemove", ()=> {
    if (carrito.length > 0) {
        pagarCarrito.title = "Usted posee " + carrito.length + " productos en el carrito";
    }
})


pagarCarrito.addEventListener("click", ()=> {
    carrito.length > 0 ? location.href = "./paginas/checkout.html" : notificar('El carrito se encuentra vacio.', 'darkorange');
})


function botonesComprar () {
    const botonesComprar = document.querySelectorAll("button.button-add");
    for (let boton of botonesComprar) {
        boton.addEventListener("click", ()=> {
            const pelucheSeleccionado = peluchesDisponibles.find((peluche)=> peluche.id === parseInt(boton.id));
            const enElCarrito = carrito.findIndex((peluche)=> peluche.id === pelucheSeleccionado.id)
            if (enElCarrito === -1) {
                const pelucheNuevo = retornoPelucheNuevo(pelucheSeleccionado)
                carrito.push(pelucheNuevo);
            } else {
                carrito[enElCarrito].cantidad++;
            }
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
