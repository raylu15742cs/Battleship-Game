const gamecontainer = document.getElementById('gameboard')
let shipstorage = [
  { title: 'Carrier', length: '5', count: 0, max: 59, sunk: false },
  { title: 'Battleship', length: '4', count: 0, max: 69, sunk: false },
  { title: 'Cruiser', length: '3', count: 0, max: 79, sunk: false },
  { title: 'Destroyer', length: '2', count: 0, max: 89, sunk: false },
  { title: 'Submarine', length: '1', count: 0, max: 99, sunk: false },
];

let computershipstorage = [
  { title: 'compCarrier', length: '5', count: 0, max: 59, sunk: false },
  { title: 'compBattleship', length: '4', count: 0, max: 69, sunk: false },
  { title: 'compCruiser', length: '3', count: 0, max: 79, sunk: false },
  { title: 'compDestroyer', length: '2', count: 0, max: 89, sunk: false },
  { title: 'compSubmarine', length: '1', count: 0, max: 99, sunk: false },
];


// create player and computer gameboard
function buildgameboard(height,player) {
    let gameboard = document.createElement('div');
    let innerboard = document.createElement('div')
    let title = document.createElement("div")
    title.classList.add("title")
    title.innerText = player;
    gameboard.appendChild(title)
    innerboard.setAttribute("id",player)
    
    for(let i = 0 ; i < height ; i++) {
        let boxrow = document.createElement('div')
        innerboard.appendChild(boxrow)
        for(let j = 0 ; j < height ; j++) {
            let box = buildbox(player, j, i);
            boxrow.appendChild(box)
        }
        gameboard.appendChild(innerboard)
    }
    gamecontainer.appendChild(gameboard); 
}

function buildbox(player,i,j) {
    let box = document.createElement('div');
    box.setAttribute('id', `${player}${j}${i}`);
    box.classList.add('box');
    box.addEventListener('mouseenter', function () {
      box.classList.add('blackhover');
    });
    box.addEventListener('mouseenter', function () {
      box.classList.remove('blackhover');
    });
    box.addEventListener('click',function(e) {
        hit(e);
      },{ once: true }
    );
    box.addEventListener("click", function(e) {
        ships(e)
    })
    return box
}

buildgameboard(10,"Human")
buildgameboard(10, 'Computer');

// create player ships
let shipcount = 0
function ships(e) {
  if (shipcount < 5) {
    let currentspot = e.path[0].id;
    console.log(parseInt(currentspot.slice(-2)))
    let ship = document.getElementById(e.path[0].id);
    let shipinner = document.createElement('div');
    shipinner.setAttribute('id', `${shipstorage[shipcount].title}`);
    ship.appendChild(shipinner);
    console.log(e.path[0].id);
    shipcount++
  }
  /*
    let ship = document.getElementById('Human73');
        let shipinner = document.createElement('div');
        shipinner.setAttribute('id', 'frominside');
        ship.appendChild(shipinner);
    */
}

//ships();
// create computer ships

// tracks hits
function hit(e) {
    let box = document.getElementById(e.path[0].id)
    box.classList.add('hits')
}

// tracks sunks

// gameover
