const botonGenerar = document.querySelector('#botonGenerar');
const dificultad = document.querySelector('#dificultad');
const respuesta = document.querySelector('#respuesta');
const categoria = document.querySelector('#categoria');
const trivia= document.querySelector('#trivia');
let numeroPreguntas=0;
let calificacion=0;

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
    calificacion=0;
    numeroPreguntas=0;

    //Generamos la trivia
    imprimirPreguntas(resultado2.results);
    //console.log(resultado2);

    //Agregamos funcionalidad a las respuestas
    let botones = document.querySelectorAll('.respuesta');
    
    botones.forEach(element => {
        element.addEventListener('click', e =>{
            element.style.fontSize='30px';
            numeroPreguntas++;
            if(element.getAttribute('data')==1){
                calificacion++;
                
                bloquearPregunta(element.parentNode.parentNode, 'correcto');
                colorearPregunta(element.parentNode.parentNode, 'correcto');
                
                               
            }else{
                bloquearPregunta(element.parentNode.parentNode, 'incorrecto');
                colorearPregunta(element.parentNode.parentNode, 'incorrecto');

            }
        
            
            calificar();
        });

    });

    //Checamos si ya terminó el juego y, de ser así, se imprime su calificación
    

}

function imprimirPreguntas(arreglo){
    let preguntas = arreglo;
    let contador=0;
    const cadena=preguntas.map(pregunta => {
        let respuestas=[];
        //Almacenamos las respuestas
        //Vamos a ponerle a las respuestas incorrectas un identificador '0'
         
        for(let x=0; x<pregunta.incorrect_answers.length; x++){
            respuestas.push([0,pregunta.incorrect_answers[x]]);
                 
        }
        
        //Agregamos la respuesta correcta a las incorrectas
        respuestas.push([1, pregunta.correct_answer]);
        //Revolvemos un array
        respuestas.sort(function() { return Math.random() - 0.5 });
        //Volvemos cadena de respuestas
        respuestas=imprimirRespuestas(respuestas);
        respuestas=respuestas.join(' ');
        let cadena2=
        `<div class='preguntaContenedor' data='${contador}'>
            <div class='pregunta'>
                ${contador+1}.- ${pregunta.question}
            </div>
            <div class='respuestas'>
                ${respuestas}
            </div>    
        </div>`; 
        contador++;
        return cadena2; 
    });
    trivia.innerHTML=cadena;
}

function imprimirRespuestas(respuestas){
    const respuestas2 = respuestas.map(respuesta => {
        return `<button class='btn btn-success respuesta' data='${respuesta[0]}'>${respuesta[1]}</span>`;
    });
    return respuestas2;
}

function bloquearPregunta(elemento, cadena){
    let hijos = elemento.childNodes[3].childNodes;   
    hijos.forEach(element => {
        element.disabled=true;
    });
}

function colorearPregunta(elemento, cadena){
    cadena == 'correcto'? elemento.style.backgroundColor="#D8EFC9" : elemento.style.backgroundColor="#F8C4B5"; 
            
}

function calificar(){
    console.log(calificacion + " " + numeroPreguntas);
    console.log("-----");
    if(numeroPreguntas==10){
        alert("Su calificación es de "+calificacion+"/"+numeroPreguntas);
    }
}