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
    let impuestoIva = subtotalGeneral * 0.15; // Cálculo del 15% del IVA en Ecuador
    let totalTodo = subtotalGeneral + impuestoIva; // Monto neto final
    
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
    
    // 7. LIMPIEZA DE INTERFAZ: Reseteamos los campos de entrada para permitir una nueva inserción
    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
}

/**
 * RESET DE SISTEMA: Restablece la memoria interna y limpia todos los componentes visuales del DOM.
 */
function limpiarFactura() {
    // 1. REINICIO DE ESTADO: Devolvemos el acumulador global a su valor inicial de cero
    subtotalGeneral = 0; 
    
    // 2. VACIADO DE CONTENEDOR: Eliminamos todas las filas renderizadas dentro del <tbody>
    document.getElementById("tablaProductos").innerHTML = "";
    
    // 3. RESET DE MARCADORES DE SOLO LECTURA: Seteamos los spans de texto de los totales a "0.00"
    document.getElementById("subtotal").textContent = "0.00";
    document.getElementById("iva").textContent = "0.00";
    document.getElementById("total").textContent = "0.00";
    
    // 4. RESET DE INPUTS DE CLIENTE: Vaciamos las propiedades .value de las cajas de texto del usuario
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    
    // 5. RESET DE INPUTS DE PRODUCTOS: Limpiamos los elementos de control del formulario de compras
    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
    
    // 6. MANIPULACIÓN DE ESTILOS CSS: Ocultamos el contenedor de la nota de venta final (reporte)
    document.getElementById("reporte-factura").style.display = "none";
}

/**
 * CIERRE DE VENTA: Genera un reporte final espejo y limpia los formularios interactivos de arriba.
 */
function guardarFactura() {
    // 1. CAPTURA PREVIA: Almacenamos los datos calculados e ingresados en variables locales
    let nombreCliente = document.getElementById("nombre").value;
    let cedulaCliente = document.getElementById("cedula").value;
    let totalDinero = document.getElementById("total").textContent;
    
    // 2. VALIDACIÓN DE IDENTIDAD: Si el campo del nombre está vacío, interrumpe el proceso de guardado
    if (nombreCliente === "") {
        alert("Primero busque un cliente.");
        return;
    }
    
    // 3. EFECTO ESPEJO (CLIENTE Y TOTALES): Transferimos los valores desde la zona interactiva
    // hacia las etiquetas de visualización estática de la Nota de Venta usando .textContent
    document.getElementById("rep-nombre").textContent = nombreCliente;
    document.getElementById("rep-cedula").textContent = cedulaCliente;
    document.getElementById("rep-total").textContent = totalDinero;
    
    // SOLUCIÓN DE ÁMBITO (SCOPE): Extraemos el IVA directamente de lo que ya está pintado en pantalla
    // solucionando el problema de que la variable interna de la otra función no es accesible aquí.
    document.getElementById("rep-iva").textContent = document.getElementById("iva").textContent;
    
    // 4. CLONACIÓN ESTRUCTURAL DEL DOM (.innerHTML): Capturamos toda la cadena de marcado (filas y celdas) 
    // que se acumuló en la tabla de transacciones de arriba...
    let productosDeArriba = document.getElementById("tablaProductos").innerHTML;
    
    // ...y la incrustamos de forma idéntica dentro del contenedor de la tabla del reporte de abajo.
    document.getElementById("rep-lista-productos").innerHTML = productosDeArriba;
    
    // 5. CAMBIO DE VISIBILIDAD: Alteramos la propiedad display de CSS de "none" a "block" 
    // para renderizar visualmente el bloque de la Nota de Venta.
    document.getElementById("reporte-factura").style.display = "block";
    
    // 6. LIMPIEZA DE ESPACIO DE TRABAJO: Dejamos la plataforma superior lista para la siguiente transacción,
    // garantizando que los datos clonados abajo permanezcan intactos y legibles para el usuario.
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