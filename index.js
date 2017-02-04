//COORDONEE CURSEUR//
function positionSouris(event) {
   var posX;
   var posY;
   posX = event.clientX;
   posY = event.clientY;
   document.getElementById('coordinate').innerHTML =
            'X = ' + posX + 'Y = ' + posY;
}
