var valCard1 = null;
var valCard2 = null;

function createField(xSize, ySize) {
  let main = document.getElementsByTagName('main').item(0);
  main.style.display = 'grid';
  main.style.gridTemplateColumns = columnRowDefinition(xSize);
  main.style.gridTemplateRows = columnRowDefinition(ySize);
}

function createCard(number, x, y, source) {
  let card = document.createElement('div');
  card.classList.add('card');

  card.style.gridColumnStart = x;
  card.style.gridRowStart = y;

  card.setAttribute('memory', number);

  if(source != null) {
    let picture = document.createElement('img');
    picture.src = source;
    card.appendChild(picture);
  }
  else {
    card.innerText = number;
  }

  document.getElementsByTagName('main').item(0).appendChild(card);
}


//Create();


function Create() {
  createField(5, 4);
  createCard(1, 1, 1, 'images/deer.jpg');
  createCard(2, 1, 2, 'images/fox.jpg');
  createCard(1, 1, 3, 'images/leopard.jpg');
  createCard(2, 1, 4, 'images/lion.jpg');
  createCard(1, 2, 1, 'images/platapus.jpg');
  createCard(2, 2, 2, 'images/racoon.jpg');
  createCard(1, 2, 3, 'images/red.jpg');
  createCard(2, 2, 4, 'images/tiger.jpg');
  createCard(1, 3, 1, 'images/yack.jpg');
  createCard(2, 3, 2, 'images/zebra.jpg');
  createCard(1, 3, 3, 'images/deer.jpg');
  createCard(2, 3, 4, 'images/fox.jpg');
  createCard(1, 4, 1, 'images/leopard.jpg');
  createCard(2, 4, 2, 'images/lion.jpg');
  createCard(1, 4, 3, 'images/platapus.jpg');
  createCard(2, 4, 4, 'images/racoon.jpg');
  createCard(1, 5, 1, 'images/red.jpg');
  createCard(2, 5, 2, 'images/tiger.jpg');
  createCard(1, 5, 3, 'images/yack.jpg');
  createCard(2, 5, 4, 'images/zebra.jpg');
}
const size = 12;
createField(size,size);
let cwar = 1;
for(let i = 1; i <= size; i++){
  for(let j = 1; j <= size; j++){
    createCard(cwar, j,i,null);
    if(cwar >= (size*size)/2)
    {
      cwar = 1;
    }
    else {
      cwar++;
    }
  }
}