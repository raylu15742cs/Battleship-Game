// create 7 ships [5,4,3,2,2]
const gamecontainer = document.getElementById('gameboard');

let shipstorage = [
  { title: 'Carrier', length: '5', count: 0 },
  { title: 'Battleship', length: '4', count: 0 },
  { title: 'Cruiser', length: '3', count: 0 },
  { title: 'Destroyer', length: '2', count: 0 },
  { title: 'Destroyertwo', length: '2', count: 0 },
  { title: 'Submarine', length: '1', count: 0 },
  { title: 'Submarinetwo', length: '1', count: 0 },
];
function ship(shipstorage) {
  for (let i = 0; i < shipstorage.length; i++) {
    smallship = document.createElement("div")
    smallship.setAttribute("id", shipstorage[i].title)
    gamecontainer.appendChild(smallship)
    for (let j = 0; j < shipstorage[i].length; j++) {
      smallshipbox = document.createElement('div')
      smallshipbox.style.height = '50px';
      smallshipbox.style.width = '50px';
      smallshipbox.classList.add('ships')
      let identity  = `${shipstorage[i].title}${j}${i}`
      smallshipbox.setAttribute("id", identity)
      smallshipbox.addEventListener("click", hit)
      smallship.appendChild(smallshipbox)

    }
  }
}

function hit(e) {
  let shipcounter = e.path[0].id[e.path[0].id.length - 1];
  let targets = document.getElementById(e.path[0].id);
  targets.innerText = 'X';
  targets.classList.add('hit');
  shipstorage[shipcounter].count += 1;
  isSunk();
}

function isSunk() {
  for(let i = 0 ; i < shipstorage.length ; i++) {
    if(shipstorage[i].length == shipstorage[i].count) {
      for(let j = 0; j < shipstorage[i].length ; j++) {
        let sunken = document.getElementById(`${shipstorage[i].title}${j}${i}`);
        sunken.classList.add('sunk');
      }
    }
  }
}
let ships = 0;

function gameboard(height) {
  for (let i = 0; i < height; i++) {
    bigbox = document.createElement('div');
    gamecontainer.appendChild(bigbox);
    for (let j = 0; j < height; j++) {
      let box = document.createElement('div');
      box.setAttribute("id", `${j}${i}`);
      box.classList.add("box")
      box.style.height = '50px';
      box.style.width = '50px';
      box.addEventListener("click", function() {
        if(ships == 7) {
          box.classList.add("hits")
        } else {
          livedisplay(`${j}${i}`);
          ships++
        }
      })
      box.addEventListener("mouseenter", function(){
        box.classList.add("bluetimes")
      })
      box.addEventListener('mouseleave', function () {
        box.classList.remove('bluetimes');
      });
      
      bigbox.appendChild(box);
    }
  }
}
gameboard(10)


function livedisplay(e){
  let d = parseInt(e)
  for(let i = 0 ; i < shipstorage[ships].length; i++) {
    let hovership = document.getElementById(d)
    hovership.classList.add("bluetime")
    d += 10
  }
}