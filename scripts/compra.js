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
    const botonesEliminar = document.querySelectorAll("td.eliminar");
    botonesEliminar.forEach((boton) => {
        // Usamos onclick para evitar duplicar eventos al recargar la tabla
        boton.onclick = () => eliminarPeluche(boton.id);
    });
}


function eliminarPeluche(pelucheId) {
    let carritoActual = devolverCarrito() || [];
    const indice = carritoActual.findIndex((p) => p.id === parseInt(pelucheId));

    if (indice !== -1) {
        if (carritoActual[indice].cantidad > 1) {
            carritoActual[indice].cantidad--;
        } else {
            carritoActual.splice(indice, 1);
        }

        localStorage.setItem("miCarrito", JSON.stringify(carritoActual));
        
        cargarCarrito();
        mostrarTotal();
    }
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
    const carritoParaSumar = devolverCarrito() || [];
    return carritoParaSumar.reduce((acc, p) => acc + (p.valor * p.cantidad), 0);
}


function mostrarTotal() {
    totalCompra.textContent =  "$ " + totalCarrito() + " USD";
}
mostrarTotal()
