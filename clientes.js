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
        },
        {
            cedula: "1725556662",
            nombre: "Anthony",
            direccion: "Av. Amazonas y Patria, Quito",
            telefono: "0998765432",
            correo: "anthony.herrera@mail.com",
            afiliado:"Si"
        },
        {
            cedula: "1711112223",
            nombre: "María Elena López",
            direccion: "C.C. El Recreo, Quito Sur",
            telefono: "0984321098",
            correo: "maria.lopez@outlook.com",
            afiliado:"Si"
        },
        {
            cedula: "0923456781",
            nombre: "Juan Carlos Pérez",
            direccion: "Urdesa Central, Guayaquil",
            telefono: "0959876541",
            correo: "juan.perez@gmail.com",
            afiliado:"No"
        },
        {
            cedula: "0104567892",
            nombre: "Ana Lucía Torres",
            direccion: "Calle Larga y Benigno Malo, Cuenca",
            telefono: "0976543210",
            correo: "ana.torres@yahoo.com",
            afiliado:"No"
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
    
    let afiliado =
    document.getElementById("clienteAfiliado").value;

    if(
        cedula === "" || cedula.length != 10 ||
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
    document.getElementById("clienteAfiliado").value = "";

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
                <td>${cliente.afiliado || "-"}</td>

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
        document.getElementById("afiliado").value =
        clienteEncontrado.afiliado || "No";

    }else{

    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("afiliado").value =
    clienteEncontrado.afiliado;
}

}



window.onload = function(){

    actualizarTablaClientes();

}

