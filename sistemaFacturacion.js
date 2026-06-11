function ocultarSecciones(){
    
    let componente = document.getElementById("btn-conceptos");
    let listaClass = componente.classList;
    listaClass.remove("active"); // Cambiado 'activa' por 'active' para que conecte con tu CSS

    let componente2 = document.getElementById("btn-calculos");
    let listaClass2 = componente2.classList;
    listaClass2.remove("active");

    let componente3 = document.getElementById("btn-sri");
    let listaClass3 = componente3.classList;
    listaClass3.remove("active");

    let componente4 = document.getElementById("btn-evaluacion");
    let listaClass4 = componente4.classList;
    listaClass4.remove("active");
 
    let componente5 = document.getElementById("btn-factura");
    let listaClass5 = componente5.classList;
    listaClass5.remove("active");

    // --- NUEVO: Ocultamos también los bloques de texto para que cambie la pantalla ---
    document.getElementById('conceptos').style.display = 'none';
    document.getElementById('calculos').style.display = 'none';
    document.getElementById('sri').style.display = 'none';
    document.getElementById('evaluacion').style.display = 'none';
    document.getElementById('factura').style.display ='none';
}


function mostrarSeccion(id){
    // Primero apaga todos los botones y oculta todas las secciones
    ocultarSecciones();
    
    // --- Lógica del botón activo que te enseñaron ---
    // Encendemos el botón que se presionó (ej: si id es 'conceptos', el botón es 'btn-conceptos')
    let boton = document.getElementById("btn-" + id);
    let listaClassBoton = boton.classList;
    listaClassBoton.add("active");
    
    // --- NUEVO: Mostramos la sección de contenido correspondiente ---
    let seccion = document.getElementById(id);
    seccion.style.display = "block";
    
    
    
}


function calificarEvaluacion(){
    //Guardamos las respuestas correctas de las 5 preguntas en un objeto
    let respuestasCorrectas = {
        p1: "b",
        p2: "c",
        p3: "a",
        p4: "b",
        p5: "c"
    };
    //Empezamos una cajita en 0 para ir sumando los puntos del alumno
    let aciertos = 0;
    //En cada vuelta, la variable 'pregunta' valdrá "p1", luego "p2", etc.
    for(let pregunta in respuestasCorrectas){
        //Buscamos el input (circulito radio) de la pregunta actual que esté marcado (:checked)
        let seleccion = document.querySelector(
            `input[name="${pregunta}"]:checked`
        );
        //Si el alumno NO marcó ninguna opción, detenemos todo y pedimos que complete el examen
        if(!seleccion){
            alert("Debe responder todas las preguntas.");
            return;
        }
        //Capturamos los 3 circulitos (A, B y C) de esta pregunta para trabajar con ellos
        let opciones = document.querySelectorAll(
            `input[name="${pregunta}"]`
        );
        //Revisamos las 3 opciones una por una
        opciones.forEach(opcion => {
            // Borramos los colores verde/rojo que hayan quedado de un intento anterior
            opcion.parentElement.classList.remove(
                "correcta",
                "incorrecta"
            );
             // Si la opción que estamos revisando coincide con la respuesta correcta de las variables respuestas correctas
            if(opcion.value === respuestasCorrectas[pregunta]){
                //le añadimos la clase "correcta" para que SIEMPRE se pinte de VERDE en la pantalla
                opcion.parentElement.classList.add("correcta");
            }
        });
        //Comparamos lo que el alumno marcó contra la variable respuestasCorrectas
        // Si la respuesta del alumno coincide con la correcta, le sumamos 1 punto
        if(seleccion.value === respuestasCorrectas[pregunta]){
            aciertos++;
        // Si el alumno se equivocó, buscamos lo que él marcó y lo pintamos de ROJO (incorrecta)
        }else{
            seleccion.parentElement.classList.add("incorrecta");
        }
    }
    //Una vez que el bucle revisó las 5 preguntas, lanzamos la alerta con el puntaje final
  

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "Obtuviste " + aciertos + " de 5 puntos.";
}


let clientes = JSON.parse(localStorage.getItem("clientes"));

if(!clientes){

    clientes = [
        {
            cedula: "99999",
            nombre: "CONSUMIDOR FINAL",
            direccion: "-",
            telefono: "-",
            correo: "-"
        }
    ];

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );
}

function mostrarClientes(){

    let seccion =
        document.getElementById("seccion-clientes");

    if(seccion.style.display === "none"){
        seccion.style.display = "block";
    }else{
        seccion.style.display = "none";
    }

    actualizarTablaClientes();
}

function guardarCliente(){

    let cedula =
        document.getElementById("clienteCedula").value;

    let nombre =
        document.getElementById("clienteNombre").value;

    let direccion =
        document.getElementById("clienteDireccion").value;

    let telefono =
        document.getElementById("clienteTelefono").value;

    let correo =
        document.getElementById("clienteCorreo").value;

    if(
        cedula === "" ||
        nombre === ""
    ){
        alert("Complete los datos obligatorios");
        return;
    }

    clientes.push({
        cedula,
        nombre,
        direccion,
        telefono,
        correo
    });

    localStorage.setItem(
    "clientes",
    JSON.stringify(clientes)
    );

    actualizarTablaClientes();


    document.getElementById("clienteCedula").value = "";
    document.getElementById("clienteNombre").value = "";
    document.getElementById("clienteDireccion").value = "";
    document.getElementById("clienteTelefono").value = "";
    document.getElementById("clienteCorreo").value = "";

    alert("Cliente guardado correctamente");
}

function actualizarTablaClientes(){

    let tabla =
        document.getElementById("tablaClientes");

    tabla.innerHTML = "";

    clientes.forEach((cliente, indice) => {

        tabla.innerHTML += `
            <tr>
                <td>${cliente.cedula}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.correo}</td>

                <td>
                    <button
                    onclick="eliminarCliente(${indice})">
                    Eliminar
                    </button>
                </td>

            </tr>
        `;
    });

}



function eliminarCliente(indice){

    if(clientes[indice].cedula === "99999"){

        alert(
            "Consumidor Final no puede eliminarse"
        );

        return;
    }

    clientes.splice(indice, 1);

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    actualizarTablaClientes();

}

function buscarCliente(){

    let cedulaBuscada =
        document.getElementById("cedula").value;

    let clienteEncontrado = null;

    for(let i = 0; i < clientes.length; i++){

        if(clientes[i].cedula === cedulaBuscada){

            clienteEncontrado = clientes[i];
            break;
        }
    }

    if(clienteEncontrado){

        document.getElementById("nombre").value =
            clienteEncontrado.nombre;

        document.getElementById("direccion").value =
            clienteEncontrado.direccion;

        document.getElementById("telefono").value =
            clienteEncontrado.telefono;

        document.getElementById("correo").value =
            clienteEncontrado.correo;

    }else{

    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";

}

}



window.onload = function(){

    actualizarTablaClientes();

}

// =========================================================
// LOGICA DE LA FACTURA (Agregar productos y cálculos)
// =========================================================

// =========================================================
// LOGICA DE PRODUCTOS Y PRECIOS AUTOMÁTICOS
// =========================================================

// Creamos un arreglo con los precios fijos de cada producto del menú
// Catálogo de productos con nombres y precios fijos
const CATALOGO_PRODUCTOS = [
    { nombre: "Cola Coca-Cola 350ml", precio: 0.85 },
    { nombre: "Agua Mineral Güitig", precio: 0.60 },
    { nombre: "Agua Con Gas Dasani", precio: 0.50 },
    { nombre: "Snack Papas Doritos", precio: 0.75 },
    { nombre: "Snack Platanitos Chifles", precio: 0.40 }
];

// Esta función se ejecuta sola cada vez que el usuario cambia de opción en el menú <select>
function cargarPrecioProducto() {
    // 1. Capturamos qué producto seleccionó el usuario
    let productoSeleccionado = document.getElementById("producto").value;

    // Si vuelve a seleccionar la opción vacía, limpiamos el input del precio
    if (productoSeleccionado === "") {
        document.getElementById("precio").value = "";
        return;
    }

    // 2. Recorremos el catálogo de productos con un ciclo FOR tradicional (igual que con el cliente)
    for (let i = 0; i < CATALOGO_PRODUCTOS.length; i++) {
        // Si el nombre del producto en el catálogo coincide con el que seleccionó el usuario...
        if (CATALOGO_PRODUCTOS[i].nombre === productoSeleccionado) {
            
            // ...pasamos el precio almacenado directamente a la cajita (input) de la pantalla
            document.getElementById("precio").value = CATALOGO_PRODUCTOS[i].precio;
            break; // Rompemos el ciclo porque ya encontramos el precio
        }
    }
}


// --- NUEVO: Tu acumulador global para el dinero de la factura ---
let subtotalGeneral = 0;

function agregarProducto() {
    // 1. Capturamos los datos finales (ahora el precio ya viene lleno automáticamente)
    let nombreProd = document.getElementById("producto").value;
    let cantidadProd = document.getElementById("cantidad").value;
    let precioProd = document.getElementById("precio").value; // Lee el precio del input
    
    // VALIDACIÓN: Detiene el programa si falta algún dato
    if (nombreProd === "" || cantidadProd === "" || precioProd === "") {
        alert("Por favor, seleccione un producto y asigne una cantidad.");
        return;
    }
    
    // 2. MATEMÁTICAS ELEMENTALES
    let cantidad = parseFloat(cantidadProd);
    let precio = parseFloat(precioProd);
    let subtotalDelProducto = cantidad * precio;
    
    subtotalGeneral = subtotalGeneral + subtotalDelProducto;
    let impuestoIva = subtotalGeneral * 0.15;
    let totalTodo = subtotalGeneral + impuestoIva;
    
    // 3. DIBUJAR EN LA TABLA
    let tabla = document.getElementById("tablaProductos");
    tabla.innerHTML += `
        <tr>
            <td>${nombreProd}</td>
            <td>${cantidad}</td>
            <td>$${precio.toFixed(2)}</td>
            <td>$${subtotalDelProducto.toFixed(2)}</td>
        </tr>
    `;
    
    // 4. ACTUALIZAR TOTALES VISUALES
    document.getElementById("subtotal").textContent = subtotalGeneral.toFixed(2);
    document.getElementById("iva").textContent = impuestoIva.toFixed(2);
    document.getElementById("total").textContent = totalTodo.toFixed(2);
    
    // 5. REINICIAR LOS INPUTS PARA LA SIGUIENTE COMPRA
    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
}

function limpiarFactura() {
    // 1. REINICIAR EL ACUMULADOR: Devolvemos nuestra alcancía global a cero
    subtotalGeneral = 0; 
    
    // 2. VACIAR LA TABLA: Borramos todas las filas de productos que se habían dibujado
    document.getElementById("tablaProductos").innerHTML = "";
    
    // 3. RESETEAR LOS MARCADORES VISUALES: Ponemos los textos de dinero otra vez en 0.00
    // Usamos .textContent porque son etiquetas <span> o celdas de lectura
    document.getElementById("subtotal").textContent = "0.00";
    document.getElementById("iva").textContent = "0.00";
    document.getElementById("total").textContent = "0.00";
    
    // 4. LIMPIAR EL FORMULARIO DEL CLIENTE: Vaciamos las cajas de texto con un texto vacío ""
    // Usamos .value porque son elementos <input> de escritura
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    
    // 5. LIMPIAR EL MENÚ Y CAJAS DE PRODUCTOS: Para que no se quede ningún rastro seleccionado
    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
}

function guardarFactura() {
    // 1. Capturamos los datos que están escritos arriba
    let nombreCliente = document.getElementById("nombre").value;
    let cedulaCliente = document.getElementById("cedula").value;
    let totalDinero = document.getElementById("total").textContent;
    
    // VALIDACIÓN SIMPLE: Si no hay cliente, frenamos
    if (nombreCliente === "") {
        alert("Primero busque un cliente.");
        return;
    }
    
    // 2. PASAMOS LOS DATOS AL REPORTE (Hacemos el espejo)
    document.getElementById("rep-nombre").textContent = nombreCliente;
    document.getElementById("rep-cedula").textContent = cedulaCliente;
    document.getElementById("rep-total").textContent = totalDinero;
    
    // 3. MOSTRAMOS EL REPORTE EN PANTALLA
    // Cambiamos 'none' por 'block' para que el cuadro aparezca mágicamente
    document.getElementById("reporte-factura").style.display = "block";
    
    // 4. Limpiamos la mesa de trabajo de arriba para una nueva venta
    // (Nota: vaciamos los campos de arriba pero el reporte de abajo se queda visible)
    subtotalGeneral = 0;
    document.getElementById("tablaProductos").innerHTML = "";
    document.getElementById("subtotal").textContent = "0.00";
    document.getElementById("iva").textContent = "0.00";
    document.getElementById("total").textContent = "0.00";
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
}