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


    // --- NUEVO: Ocultamos también los bloques de texto para que cambie la pantalla ---
    document.getElementById('conceptos').style.display = 'none';
    document.getElementById('calculos').style.display = 'none';
    document.getElementById('sri').style.display = 'none';

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
    
    // Scroll suave hacia arriba
    
}


function calificarEvaluacion(){

    let respuestasCorrectas = {
        p1: "b",
        p2: "c",
        p3: "a",
        p4: "b",
        p5: "c"
    };

    let aciertos = 0;

    for(let pregunta in respuestasCorrectas){

        let seleccion = document.querySelector(
            `input[name="${pregunta}"]:checked`
        );

        if(!seleccion){
            alert("Debe responder todas las preguntas.");
            return;
        }

        let opciones = document.querySelectorAll(
            `input[name="${pregunta}"]`
        );

        opciones.forEach(opcion => {

            opcion.parentElement.classList.remove(
                "correcta",
                "incorrecta"
            );

            if(opcion.value === respuestasCorrectas[pregunta]){
                opcion.parentElement.classList.add("correcta");
            }
        });

        if(seleccion.value === respuestasCorrectas[pregunta]){
            aciertos++;
        }else{
            seleccion.parentElement.classList.add("incorrecta");
        }
    }

    alert(
        `Evaluación finalizada.\n\nAciertos: ${aciertos}/5`
    );
}