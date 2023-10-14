const botonGenerar = document.querySelector('#botonGenerar');
const dificultad = document.querySelector('#dificultad');
const respuesta = document.querySelector('#respuesta');
const categoria = document.querySelector('#categoria');
const trivia= document.querySelector('#trivia');

botonGenerar.addEventListener('click', e => {
    let api='https://opentdb.com/api.php?amount=10';
    
    
    if(dificultad.value!=''){
        api+='&difficulty='+dificultad.value;
    }

    if(respuesta.value!=''){
        api+='&type='+respuesta.value;
        
    }

    if(categoria.value!=''){
        api+='&category='+categoria.value;

    }

    llamarApi(api);
});

async function llamarApi(cadena){
    let api=cadena;
    const resultado = await fetch(api);
    const resultado2 = await resultado.json();
    imprimirPreguntas(resultado2.results);
 
}

function imprimirPreguntas(arreglo){
    let preguntas = arreglo;
    let contador=0;
    const cadena=preguntas.map(pregunta => {
        //Almacenamos las respuestas
        let respuestas=pregunta.incorrect_answers;
        //Agregamos la respuesta correcta a las incorrectas
        respuestas.push(pregunta.correct_answer);
        //Revolvemos un array
        respuestas.sort(function() { return Math.random() - 0.5 });
        //Volvemos cadena de respuestas
        respuestas=respuestas.join('     ');
        
        let cadena2=
        `<div class='preguntaContenedor' data='${contador}'>
            <div class='pregunta'>
                ${pregunta.question}
            </div>
            <div class='respuestas'>
                ${respuestas}
            </div>    
        </div>`; 
        contador++;
        return cadena2;
    });
    console.log(cadena);
    trivia.innerHTML=cadena;
}

