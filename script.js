// create 7 ships [5,4,3,2,2]
const gamecontainer = document.getElementById('gameboard');

let shipstorage = [
  { title: 'Carrier', length: '5' },
  { title: 'Battleship', length: '4' },
  { title: 'Cruiser', length: '3' },
  { title: 'Destroyer', length: '2' },
  { title: 'Destroyertwo', length: '2' },
  { title: 'Submarine', length: '1' },
  { title: 'Submarinetwo', length: '1' },
];
function ship(shipstorage) {
  for (let i = 0; i < shipstorage.length; i++) {
    smallship = document.createElement("div")
    smallship.classList.add(shipstorage[i].title)
    smallship.classList.add(shipstorage[i].length);
    gamecontainer.appendChild(smallship)
    for (let j = 0; j < shipstorage[i].length; j++) {
      smallshipbox = document.createElement('div')
      smallshipbox.style.height = '50px';
      smallshipbox.style.width = '50px';
      smallshipbox.classList.add('ships')
      let identity  = `${shipstorage[i].title}${j}`
      smallshipbox.setAttribute("id", identity)
      smallshipbox.addEventListener("click", function(){
        console.log(identity)
        let targets = document.getElementById(identity);
        targets.classList.add('hit');
        sink();
      })
      smallship.appendChild(smallshipbox)

    }
  }
}

function hit(identifier) {
  console.log(identifier)
  let target = document.getElementById(identifier)
  target.classList.add("hit")
}

function sink() {
  
}

function gameboard(height) {
  for (let i = 0; i < height; i++) {
    bigbox = document.createElement('div');
    gamecontainer.appendChild(bigbox);
    for (let j = 0; j < height; j++) {
      let box = document.createElement('div');
      box.classList.add(`${i}${j}`);
      box.classList.add("box")
      box.style.height = '50px';
      box.style.width = '50px';
      box.addEventListener("click", function() {
        box.classList.add("hit")
      })
      bigbox.appendChild(box);
    }
  }
}

ship(shipstorage)