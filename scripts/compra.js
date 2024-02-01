const tabla = document.querySelector("table tbody")
const botonComprar = document.querySelector("button#pagar")
const totalCompra = document.querySelector("td.precioTotal")
const botonEliminar = document.querySelector("th.eliminar")

function devolverCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito"))
}

const carrito = devolverCarrito()

function filaDeProducto(peluche) {
    return `<tr>
                <td><img src=".${peluche.imagen} alt="${peluche.nombre}" class="imagenCheck"></td>
                <td>${peluche.nombre}</td>
                <td>${peluche.valor} USD</td>
                <td>ELIMINAR PRODUCTO</td>
            </tr>`
    
}

if (carrito) {
    carrito.forEach((peluche)=> {
        tabla.innerHTML += filaDeProducto(peluche);
    })
}

function totalCarrito (){
}

botonComprar.addEventListener("click", ()=> {
    finalizarCompra()
    localStorage.removeItem("miCarrito")
    carrito.length = 0
    botonComprar.setAttribute("disabled", "true")
})

function finalizarCompra() {
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada satisfactoriamente',
        text: 'La compra se ha realizado de manera satisfactoria.',
        confirmButtonText: 'Aceptar'
    })
}

function totalCarrito() {
    let total = 0;
    carrito.forEach((peluche) => {
        total += peluche.valor;
    });
    return total;
}

totalCompra.textContent = totalCarrito() + " USD";