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
  let answer = [];
  for (let i = 0; i < shipstorage.length; i++) {
    let current = {};
    for (let j = 0; j < shipstorage[i].length; j++) {
      //create each individual ship
      current[j] = `${shipstorage[i].title}${j}`;
    }
    answer[i] = current;
  }
  return Object.keys(answer[0]).length;
}

function hit() {}

function sink() {}

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

gameboard(10);