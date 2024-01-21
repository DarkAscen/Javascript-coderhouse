let compra = confirm("¿Desea realizar una compra?");


function calculoCompra(valor1, valor2) {
    let valorPuntos = valor1 * valor2;
    console.log("El valor es de " + valorPuntos + "$ ");
}

do {
    if (compra) {
        let compraPuntos = prompt("Ingrese la cantidad de puntos a comprar (La cantidad permitida se encuentra entre 500 y 8000 puntos)");
        if (compraPuntos >= 500 && compraPuntos <= 8000) {
            let rangoCompra;
            if (compraPuntos >= 500 && compraPuntos < 1500) {
                rangoCompra = 10;
                calculoCompra(compraPuntos, rangoCompra);
            }   else if (compraPuntos >= 1500 && compraPuntos < 3000) {
                rangoCompra = 9;
                calculoCompra(compraPuntos, rangoCompra);
            }   else if (compraPuntos >= 3000 && compraPuntos < 5000) {
                rangoCompra = 8;
                calculoCompra(compraPuntos, rangoCompra);
            }   else if (compraPuntos >= 5000 && compraPuntos <= 8000) {
                rangoCompra = 6;
                calculoCompra(compraPuntos, rangoCompra);
            }   
            compra = confirm("¿Desea realizar otra compra?");
            if (compra === false) {
                console.log("Gracias por su visita.")
            }
        }   else {
                console.log("La cantidad de puntos indicada no se encuentran dentro del rango permitido de compra o ingreso un valor no válido.");
        }
    } else {
        console.log("Gracias por su visita.")
    }
} while (compra); 