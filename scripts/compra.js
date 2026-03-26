const tabla = document.querySelector("table tbody")
const botonComprar = document.querySelector("button#pagar")
const totalCompra = document.querySelector("td.precioTotal")


function devolverCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito"))
}


const carrito = devolverCarrito()


function filaDePeluche(peluche) {
    return `<tr>
                <td><img src=".${peluche.imagen}" alt="${peluche.nombre}" class="imagenCheck"></td>
                <td>${peluche.nombre}</td>
                <td>${peluche.cantidad}</td>
                <td>$ ${peluche.valor} USD</td>
                <td class="eliminar" id=${peluche.id}><span id="texto-eliminar">ELIMINAR</span></td>
            </tr>`
}


function filaVacia() {
    return `<tr>
                <td>Fila</td>
                <td>vacia</td>
                <td>de</td>
                <td>producto</td>
            </tr>`
}


function cargarCarrito() {
    if (carrito) {
        tabla.innerHTML = ""
        carrito.forEach((peluche)=> {
            tabla.innerHTML += filaDePeluche(peluche)
        })
        clickEliminar()
    } else {
        tabla.innerHTML = filaVacia()
    }
}
cargarCarrito()


botonComprar.addEventListener("click", ()=> {
    Swal.fire({
        icon: 'question',
        title: 'Confirmar compra',
        text: 'El valor de la compra es de $' + totalCarrito() + ' USD, ¿Desea realizar la compra?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((respuesta)=> {
        if(respuesta.isConfirmed) {
            localStorage.removeItem("miCarrito")
            carrito.length = 0
            botonComprar.setAttribute("disabled", "true")
            finalizarCompra()
            cargarCarrito()
            mostrarTotal()
        } 
    })
})


function clickEliminar() {
    const botonesEliminar = document.querySelectorAll("td.eliminar")
    if (botonesEliminar.length > 0) {
        botonesEliminar.forEach((botonEliminar)=> {
            botonEliminar.addEventListener("click", ()=> eliminarPeluche(botonEliminar.id))
        })
    }
}


function eliminarPeluche(pelucheId) {
    const indice = carrito.findIndex((peluche)=> peluche.id === parseInt(pelucheId))
    carrito[indice].cantidad === 1 ? carrito.splice(indice, 1) : carrito[indice].cantidad--
    cargarCarrito()
    mostrarTotal()
}


function finalizarCompra() {
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada satisfactoriamente',
        text: 'La compra se ha realizado de manera satisfactoria.',
        confirmButtonText: 'Aceptar'
    })
}


function totalCarrito() {
    if (carrito.length > 0) {
        let total = 0;
        carrito.forEach((peluche) => {
            total += peluche.valor * peluche.cantidad;
        });
        return total;
    } else {
        return 0;
    }
}


function mostrarTotal() {
    totalCompra.textContent =  "$ " + totalCarrito() + " USD";
}
mostrarTotal()
