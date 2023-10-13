const botonGenerar = document.querySelector('#botonGenerar');
const dificultad = document.querySelector('#dificultad');
const respuesta = document.querySelector('#respuesta');
const categoria = document.querySelector('#categoria');

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
    console.log(resultado2.results);
}

function imprimirPreguntas(arreglo){
    let preguntas = arreglo;
    let contador=0;
    const cadena=preguntas.map(pregunta => {
        let respuestas=pregunta.correct_answer.concat(pregunta.incorrect_answers);
        /* respuestas=respuestas.flat(); */
        console.log(respuestas);
        return 
        `<div class='preguntaContenedor' data='${contador}'>
            <div class='pregunta'>
                ${pregunta.question}
            </div>
            <div class='respuestas'>
                
            </div>    
        </div>`; 
        
    });
}

