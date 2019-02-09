// Representación de la grilla. Cada nro representa a una pieza.
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas esta en la posición ganadora
function chequearSiGano(){
  var grillaGanadora = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  var notEqual = false;
  for (i = 0; i < grilla.length; i++) {
    for (j = 0; j < grilla[i].length; j++) {
      if (grillaGanadora[i][j] != grilla[i][j]) {
        notEqual = true;
        break;
      }
    }
    if (notEqual == true) {
      break;
    }
  }
  if (notEqual == false) {

    mostrarCartelGanador();
  }
}



// Muestra el cartel ganador
function mostrarCartelGanador(){
  alert("Ganaste!");
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var img1 = grilla[fila1][columna1];
  var img2 = grilla[fila2][columna2];
  var elmnt1 = document.getElementById("imagen" + img1);
  var elmnt2 = document.getElementById("imagen" + img2);
  var cln1 = elmnt1.cloneNode(true);
  var cln2 = elmnt2.cloneNode(true);
  document.getElementById("juego").replaceChild(cln1, elmnt2);
  document.getElementById("juego").replaceChild(cln2, elmnt1);
  grilla[fila1][columna1] = img2;
  grilla[fila2][columna2] = img1;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia = {
    fila:nuevaFila,
    columna:nuevaColumna
  };
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  if (columna<3 && columna>-1 && fila<3 && fila>-1) {
    return true;
  }
}

// Movimiento de la pieza vacia intercambiando su posición con otra
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza vacia con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza vacia con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza vacia con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
  }
  // Intercambia pieza vacia con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



// Extras
function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){

    document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();
      },500);
    }
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}

$(window).on('load',function(){
    iniciar();
});
