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



let clientes = JSON.parse(localStorage.getItem("clientes"));

if(!clientes){

    // Arreglo de clientes actualizado con el atributo booleano 'afiliado'
    let clientes = JSON.parse(localStorage.getItem("clientes"));

    if(!clientes){

    clientes = [
        {
            cedula: "99999",
            nombre: "CONSUMIDOR FINAL",
            direccion: "-",
            telefono: "-",
            correo: "-",
            afiliado: "No" // No aplica para descuento
        },
        {
            cedula: "1725556662",
            nombre: "Anthony",
            direccion: "Av. Amazonas y Patria, Quito",
            telefono: "0998765432",
            correo: "anthony.herrera@mail.com",
            afiliado: "Si"  // ¡Afiliado! Goza del 3% de descuento
        },
        {
            cedula: "1711112223",
            nombre: "María Elena López",
            direccion: "C.C. El Recreo, Quito Sur",
            telefono: "0984321098",
            correo: "maria.lopez@outlook.com",
            afiliado: "Si"
        },
        {
            cedula: "0923456781",
            nombre: "Juan Carlos Pérez",
            direccion: "Urdesa Central, Guayaquil",
            telefono: "0959876541",
            correo: "juan.perez@gmail.com",
            afiliado: "No"
        },
        {
            cedula: "0104567892",
            nombre: "Ana Lucía Torres",
            direccion: "Calle Larga y Benigno Malo, Cuenca",
            telefono: "0976543210",
            correo: "ana.torres@yahoo.com",
            afiliado: "No"
        }
    ];

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );
}

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

        let afiliado =
        document.getElementById("clienteAfiliado").value;


    if(
        cedula === ""  ||
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
        correo,
        afiliado
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
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    clientes.forEach((cliente, indice) => {
        // CORRECCIÓN: Comparamos textualmente si es "Si" o el booleano true
        let textoAfiliado = "No";
        if (cliente.afiliado === "Si" || cliente.afiliado === true || cliente.afiliado === "true") { 
            textoAfiliado = "Si";
        }

        tabla.innerHTML += `
            <tr>
                <td>${cliente.cedula}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.correo}</td>
                <td>${textoAfiliado}</td>
                <td>
                    <button onclick="eliminarCliente(${indice})">
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

        document.getElementById("afiliado").value = 
            clienteEncontrado.afiliado || "No";
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