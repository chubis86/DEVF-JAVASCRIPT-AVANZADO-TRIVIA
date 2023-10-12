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
    let arreglo = arreglo;
    arreglo.map(pregunta => {
        retue 
        if(pregunta.type=='multiple'){

         }
    });
}

