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