let peluchesDisponibles = [{nombre: "OSO POLAR", id: 1, valor: 60, descripcion: "Peluche de un oso polar"},
    {nombre: "PINGUINO", id: 2, valor: 18, descripcion: "Peluche de un pinguino"},
    {nombre: "ELEFANTE MARINO", id: 3, valor: 14, descripcion: "Peluche de un elefante marino"},
    {nombre: "ORCA", id: 4, valor: 42, descripcion: "Peluche de orca"},
    {nombre: "BALLENA AZUL", id: 5, valor: 36, descripcion: "Peluche de ballena azul"},
    {nombre: "PEZ", id: 6, valor: 24, descripcion: "Peluche de pez de la Antartida"}];

function agregarPeluche () {
    const nombre = prompt("Ingrese el nombre del peluche");
    const valor = parseFloat(prompt("Ingrese el valor del peluche"));
    const descripcion = prompt("Ingrese una descripcion del peluche");
    const nuevoPeluche = {
        nombre: nombre,
        valor: valor,
        descripcion: descripcion
    };
    peluchesDisponibles.push(nuevoPeluche);
    return "El peluche ha sido agregado satisfactoriamente";
}

function borrarPeluche () {
    const nombreIngresado = prompt("Ingrese el nombre del peluche a borrar");
    const nombreBorrar = nombreIngresado.toUpperCase();
    const index = peluchesDisponibles.findIndex(peluchesDisponibles => peluchesDisponibles.nombre === nombreBorrar)
    if (index !== -1) { 
        peluchesDisponibles.splice(index, 1);
        return console.log(nombreBorrar + " ha sido borrado con exito.")
    } else {
        alert("No se ha encontrado el peluche indicado.");
    }
}

function mostrarPeluches () {
    console.log("Lista de peluches:");
    console.table(peluchesDisponibles);
}

function buscarPeluche (id) {
    let pelucheBuscado = peluchesDisponibles.find((peluche) => peluche.id === parseInt(id))
    return pelucheBuscado;
}