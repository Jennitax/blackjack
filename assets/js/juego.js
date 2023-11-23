/**
 * 2C = Two of Clubs (treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
// const divCartasJugador2 = document.querySelector('#jugador2-cartas');

const puntosHTML = document.querySelectorAll('small');

// Esta funcion crea un nuevo deck
const crearDeck  = () => {
    for (let i =2; i<= 10; i++){
        for(let tipo of tipos){
            deck.push(i+ tipo);
        }   
    }

    for (let tipo of tipos) {
        for (let esp of especiales){
            deck.push(esp + tipo);
        }

    }

    //console.log(deck);
deck = _.shuffle(deck);
console.log(deck);
return deck;

}

crearDeck();

//Esta funcion me permite tomar una carta
const pedirCarta =() => {

    if(deck.length ===0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;

}

// for(let i =0; i <= 100; i++){
//     pedirCarta();
// }

const valorCarta= (carta) => {

    const valor =carta.substring(0, carta.length -1);
   return (isNaN(valor)) ?
          (valor ==='A') ? 11 : 10
          : valor * 1;
   
   }

//Turno de la computadora 
const turnoComputadora = (puntosMinimos)=>{
    
    do{
    const  carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);

    if(puntosMinimos >21){
        break;
    }

    }while((puntosComputadora < puntosMinimos)&& (puntosMinimos <= 21));

    setTimeout(() =>{
         if(puntosComputadora ===puntosMinimos){
        alert ('Empate');
        } else if (puntosMinimos >21){
        alert ('Computadora gana')
        } else if (puntosComputadora >21){
        alert ('Jugador gana');
        }else {
            alert ('Computadora gana');
        }

    }, 10);
}



//     let puntos = 0;
//     if(isNaN(valor)){
        
//         puntos = (valor === 'A') ? 11: 10;

//     }else {
        
//         puntos = valor *1;
//     }
//     console.log (puntos);
// }


//Jugador1 

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador>21){
        console.warn ('Perdiste');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
        //turnoJugador2(puntosJugador);
    }else if (puntosJugador ===21){
        console.warn('Ganaste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        //turnoJugador2(puntosJugador);
    }

});

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora (puntosJugador);
});

btnNuevo.addEventListener('click',()=>{

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador  = 0;
    puntosComputadora = 0;

    puntosHTML [0].innerText =0;
    puntosHTML [1].innerText =0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    //divCartasJugador2.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});