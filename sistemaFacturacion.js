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

    // 1. EL ACORDEÓN: Guardamos las respuestas correctas de las 5 preguntas en un objeto
    let respuestasCorrectas = {
        p1: "b", // Pregunta 1: la respuesta correcta es la 'b'
        p2: "c", // Pregunta 2: la respuesta correcta es la 'c'
        p3: "a", // Pregunta 3: la respuesta correcta es la 'a'
        p4: "b", // Pregunta 4: la respuesta correcta es la 'b'
        p5: "c"  // Pregunta 5: la respuesta correcta es la 'c'
    };

    // 2. EL CONTADOR: Empezamos una cajita en 0 para ir sumando los puntos del alumno
    let aciertos = 0;

    // 3. EL BUCLE: Recorremos el "acordeón". En cada vuelta, la variable 'pregunta' valdrá "p1", luego "p2", etc.
    for(let pregunta in respuestasCorrectas){

        // 4. DETECTAR SELECCIÓN: Buscamos el input (circulito radio) de la pregunta actual que esté marcado (:checked)
        let seleccion = document.querySelector(
            `input[name="${pregunta}"]:checked`
        );

        // 5. VALIDACIÓN DE VACÍOS: Si el alumno NO marcó ninguna opción, detenemos todo y pedimos que complete el examen
        if(!seleccion){
            alert("Debe responder todas las preguntas.");
            return; // El 'return' frena la función por completo aquí
        }

        // 6. ATRAPAR TODAS LAS OPCIONES: Capturamos los 3 circulitos (A, B y C) de esta pregunta para trabajar con ellos
        let opciones = document.querySelectorAll(
            `input[name="${pregunta}"]`
        );

        // 7. LIMPIAR Y PINTAR LA CORRECTA: Revisamos las 3 opciones una por una
        opciones.forEach(opcion => {

            // Borramos los colores verde/rojo que hayan quedado de un intento anterior
            opcion.parentElement.classList.remove(
                "correcta",
                "incorrecta"
            );

            // Si la opción que estamos revisando coincide con la respuesta correcta del acordeón...
            if(opcion.value === respuestasCorrectas[pregunta]){
                // ...le añadimos la clase "correcta" para que SIEMPRE se pinte de VERDE en la pantalla
                opcion.parentElement.classList.add("correcta");
            }
        });

        // 8. EVALUAR AL ESTUDIANTE: Comparamos lo que el alumno marcó contra el acordeón secreto
        if(seleccion.value === respuestasCorrectas[pregunta]){
            // Si la respuesta del alumno coincide con la correcta, le sumamos 1 punto
            aciertos++;
        }else{
            // Si el alumno se equivocó, buscamos lo que él marcó y lo pintamos de ROJO (incorrecta)
            seleccion.parentElement.classList.add("incorrecta");
        }
    }

    // 9. NOTA FINAL: Una vez que el bucle revisó las 5 preguntas, lanzamos la alerta con el puntaje final
    //
    let calificacion = document.getElementById("calificacion");
    calificacion.innerHTML =`
    <h3>Evaluacion finalizada</h3>
    <p>obutviste ${aciertos} de 5 puntos</p>
    `;
    calificacion.style.display = "block";
    
}