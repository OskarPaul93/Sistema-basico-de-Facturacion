// =========================================================================
// DATABASE LOCAL: Catálogo estático de productos indexado con objetos
// =========================================================================
const CATALOGO_PRODUCTOS = [
    { nombre: "Cola Coca-Cola 350ml", precio: 0.85 },
    { nombre: "Agua Mineral Güitig", precio: 0.60 },
    { nombre: "Agua Con Gas Dasani", precio: 0.50 },
    { nombre: "Snack Papas Doritos", precio: 0.75 },
    { nombre: "Snack Platanitos Chifles", precio: 0.40 }
];

/**
 * CONTROLADOR DE EVENTO (onchange): Vincula la selección del producto con su precio base.
 * Se ejecuta automáticamente cada vez que el usuario altera la opción del menú <select>.
 */
function cargarPrecioProducto() {
    // 1. CAPTURA DEL DOM: Extraemos el valor seleccionado del menú desplegable mediante su ID
    let productoSeleccionado = document.getElementById("producto").value;

    // 2. CONTROL DE FLUJO: Si el usuario selecciona la opción por defecto (vacía), 
    // limpia el campo de precio y detiene la ejecución de la función con un return.
    if (productoSeleccionado === "") {
        document.getElementById("precio").value = "";
        return;
    }

    // 3. ITERACIÓN (Ciclo FOR tradicional): Recorremos el catálogo secuencialmente desde el índice 0.
    for (let i = 0; i < CATALOGO_PRODUCTOS.length; i++) {
        // EVALUACIÓN: Comparamos si el nombre en la base de datos coincide con la selección de la pantalla
        if (CATALOGO_PRODUCTOS[i].nombre === productoSeleccionado) {
            
            // ASIGNACIÓN: Inyectamos el precio numérico directamente en el atributo .value del input del HTML
            document.getElementById("precio").value = CATALOGO_PRODUCTOS[i].precio;
            
            break; // OPTIMIZACIÓN: Rompemos el ciclo inmediatamente al encontrar la coincidencia
        }
    }
}

// =========================================================================
// ESTADO GLOBAL: Acumulador (alcancía) numérico para el subtotal de la venta
// =========================================================================
let subtotalGeneral = 0;
let descuentoGeneral = 0;

/**
 * LÓGICA DE TRANSACCIÓN: Calcula los subtotales, impuestos y renderiza la fila en la tabla.
 */
function agregarProducto() {
    // 1. CAPTURA DE DATOS: Extraemos los valores actuales de los elementos de entrada de la interfaz
    let nombreProd = document.getElementById("producto").value;
    let cantidadProd = document.getElementById("cantidad").value;
    let precioProd = document.getElementById("precio").value; 
    
    // 2. VALIDACIÓN DE SEGURIDAD: Frena el algoritmo si se detectan campos requeridos vacíos
    if (nombreProd === "" || cantidadProd === "" || precioProd === "") {
        alert("Por favor, seleccione un producto y asigne una cantidad.");
        return;
    }
    
    // 3. PARSEO Y ARITMÉTICA: Convertimos las cadenas de texto (strings) a tipos numéricos de punto flotante
    let cantidad = parseFloat(cantidadProd);
    let precio = parseFloat(precioProd);
    let subtotalDelProducto = cantidad * precio; // Costo por línea de producto
    
    // 4. ACUMULACIÓN: Sumamos el costo de esta línea al estado global de la factura
    subtotalGeneral = subtotalGeneral + subtotalDelProducto;
    let afiliado =
document.getElementById("afiliado").value;

if(afiliado === "Si"){

    descuentoGeneral =
        subtotalGeneral * 0.03;

}else{

    descuentoGeneral = 0;
}

document.getElementById("descuento").textContent =
    descuentoGeneral.toFixed(2);

let subtotalConDescuento =
    subtotalGeneral - descuentoGeneral;

let impuestoIva =
    subtotalConDescuento * 0.15;

let totalTodo =
    subtotalConDescuento + impuestoIva;


    // 5. RENDERIZADO DINÁMICO: Obtenemos el cuerpo de la tabla y concatenamos (+=) una nueva fila HTML
    let tabla = document.getElementById("tablaProductos");
    tabla.innerHTML += `
        <tr>
            <td>${nombreProd}</td>
            <td>${cantidad}</td>
            <td>$${precio.toFixed(2)}</td>
            <td>$${subtotalDelProducto.toFixed(2)}</td>
        </tr>
    `;
    
    // 6. ACTUALIZACIÓN VISUAL: Modificamos el contenido de texto plano (.textContent) de los marcadores span.
    // Usamos .toFixed(2) para forzar el formato estándar de moneda con dos decimales.
    document.getElementById("subtotal").textContent = subtotalGeneral.toFixed(2);
    document.getElementById("iva").textContent = impuestoIva.toFixed(2);
    document.getElementById("total").textContent = totalTodo.toFixed(2);
    document.getElementById("total").textContent =totalTodo.toFixed(2);
    
    // 7. LIMPIEZA DE INTERFAZ: Reseteamos los campos de entrada para permitir una nueva inserción
    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
}

/**
 * RESET DE SISTEMA: Restablece la memoria interna y limpia todos los componentes visuales del DOM.
 */
function limpiarFactura() {

    
    subtotalGeneral = 0;
    descuentoGeneral = 0;

    document.getElementById("subtotal").textContent = "0.00";
    document.getElementById("descuento").textContent = "0.00";
    document.getElementById("iva").textContent = "0.00";
    document.getElementById("total").textContent = "0.00";

    

    //Al presionar el boton nueva factura se me borra la factura actual
    document.getElementById("tablaProductos").innerHTML = "";
    document.getElementById("reporte-factura").style.display = "none";
}

/**
 * CIERRE DE VENTA: Genera un reporte final espejo y limpia los formularios interactivos de arriba.
 */
/**
 
 */
function guardarFactura() {
    // 1. CAPTURA PREVIA: Almacenamos los datos calculados e ingresados en variables locales
    let nombreCliente = document.getElementById("nombre").value;
    let cedulaCliente = document.getElementById("cedula").value;

    
    // Capturamos todos los valores calculados de la pantalla ANTES de limpiar la interfaz
    let subtotalPantalla = document.getElementById("subtotal").textContent; // 👈 CORREGIDO: El ID real es "subtotal"
    let descuentoPantalla = document.getElementById("descuento").textContent;
    let ivaPantalla = document.getElementById("iva").textContent;
    let totalPantalla = document.getElementById("total").textContent;
    
    // 2. VALIDACIÓN DE IDENTIDAD: Si el campo del nombre está vacío, interrumpe el proceso de guardado
    if (nombreCliente === "") {
        alert("Primero busque un cliente.");
        return;
    }
    
    // 3. EFECTO ESPEJO (CLIENTE Y TOTALES): Transferimos los valores desde la zona interactiva
    // hacia las etiquetas de visualización estática de la Nota de Venta usando .textContent
    document.getElementById("rep-nombre").textContent = nombreCliente;
    document.getElementById("rep-cedula").textContent = cedulaCliente;

    
    // Inyectamos los datos respaldados de forma exacta en el reporte de abajo
    document.getElementById("rep-subtotal").textContent = subtotalPantalla;
    document.getElementById("rep-descuento").textContent = descuentoPantalla;
    document.getElementById("rep-iva").textContent = ivaPantalla;
    document.getElementById("rep-total").textContent = totalPantalla;
    
    // 4. CLONACIÓN ESTRUCTURAL DEL DOM (.innerHTML): Capturamos toda la cadena de marcado
    let productosDeArriba = document.getElementById("tablaProductos").innerHTML;
    
    // ...y la incrustamos de forma idéntica dentro del contenedor de la tabla del reporte de abajo.
    document.getElementById("rep-lista-productos").innerHTML = productosDeArriba;
    
    // 5. CAMBIO DE VISIBILIDAD: Alteramos la propiedad display de CSS de "none" a "block" 
    document.getElementById("reporte-factura").style.display = "block";
    
    // 6. LIMPIEZA DE ESPACIO DE TRABAJO: Dejamos la plataforma superior lista para la siguiente transacción
    subtotalGeneral = 0;
    descuentoGeneral = 0;
    document.getElementById("tablaProductos").innerHTML = "";
    document.getElementById("subtotal").textContent = "0.00";
    document.getElementById("descuento").textContent = "0.00";
    document.getElementById("iva").textContent = "0.00";
    document.getElementById("total").textContent = "0.00";
    
    // Limpieza de inputs del cliente
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("afiliado").value = ""; 
}
