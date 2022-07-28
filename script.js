// create 7 ships [5,4,3,2,2]
const gamecontainer = document.getElementById('gameboard');

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

function hit(e) {
  console.log(e)
  let targets = document.getElementById(e);
  targets.classList.remove('hits')
  targets.classList.remove('bluetime');
  targets.innerText = 'X';
  targets.classList.add('hit');
  targets.removeEventListener("click", hit)
  if (e.path[0].id[0] !== 'c') {
    shipstorage[e.path[0].id[e.path[0].id.length - 2]].count++;
  } else {
    computershipstorage[e.path[0].id[e.path[0].id.length - 2]].count++;
  }
  isSunk(e.path[0].id);
}

let shipsunkcount = 0;
let computershipsunkcount = 0;


function isSunk(test) {
  if(test[0] !== 'c') {
    console.log(test)
    for(let i = 0 ; i < shipstorage.length ; i++) {
      if(shipstorage[i].length == shipstorage[i].count) {
        shipstorage[i].sunk = true;
        for(let j = 0; j < shipstorage[i].length ; j++) {
          let sunken = document.getElementById(`${shipstorage[i].title}${i}${j}`);
          sunken.classList.add('sunk');
        }
      }
    }
    gameover();
  } else {
    for (let i = 0; i < computershipstorage.length; i++) {
      if (computershipstorage[i].length == computershipstorage[i].count) {
        computershipstorage[i].sunk = true;
        for (let j = 0; j < computershipstorage[i].length; j++) {
          let sunken = document.getElementById(`${computershipstorage[i].title}${i}${j}`);
          sunken.classList.add('sunk');
        }
      }
    }
    gameover();
  }
}
let ships = 0;
let computerships = 0;
let taken = [];

function gameboard(height, player) {
  let game = document.createElement('div')
  game.classList.add(player)
  for (let i = 0; i < height; i++) {
    bigbox = document.createElement('div');
    game.appendChild(bigbox);
    for (let j = 0; j < height; j++) {
      let box = document.createElement('div');
      box.setAttribute("id", `${player}${j}${i}`);
      box.classList.add("box")
      box.classList.add(`${player}${j}${i}`);
      //box.style.height = '30px';
      //box.style.width = '30px';
      box.addEventListener("click", function() {
        if(ships == 5) {
          if (
            box.classList.contains('hit') != true &&
            box.classList.contains('sunk') != true
          ) {
            box.classList.add('hits');
          }
        } else if(player == 'first') { 
          ship(`${player}`,`${j}${i}`);
        }
      if (player == 'second') {
        // hitback();
      }
      })

      box.addEventListener("mouseenter", function(){
        box.classList.add("blackhover")
      })
      box.addEventListener('mouseleave', function () {
        box.classList.remove('blackhover');
      });
      
      bigbox.appendChild(box);
    }
  }
  gamecontainer.appendChild(game)
}
gameboard(10, 'first')
gameboard(10, 'second')

// playerships
function ship(board, e){
  let d = parseInt(e)
  if(shipstorage[ships].max > e ) {
    for(let i = 0 ; i < shipstorage[ships].length; i++) {
      let hovership = document.getElementById(`${board}${d}`)
      hovership.classList.add("bluetime")
      hovership.classList.add(shipstorage[ships].title)
      hovership.addEventListener('click', hit(`${board}${d}`));
      d += 10
    }
    ships++
  }
}
function random() {
  let current = Math.floor(Math.random() * 100);
  //console.log(current)
  return current
}

// computer ships
function computerboard(c) {
  // need to figure out how to make it work when c < 10
  if(c <= computershipstorage[computerships].max) {
    if (taken.includes(c) == false && taken.includes(c+10) == false && taken.includes(c+20) == false && taken.includes(c+40) == false) {
      let d = c;
      for (let i = 0; i < computershipstorage[computerships].length; i++) {
        if(d<10) {
          let hovership = document.getElementById(`second0${d}`);
          hovership.classList.add('bluetime');
          hovership.setAttribute(
            'id',
            `${computershipstorage[computerships].title}${computerships}${i}`
          );
          hovership.addEventListener('click', hit);
          taken.push(d);
          d += 10;
        } else {
          let hovership = document.getElementById(`second${d}`);
          hovership.classList.add('bluetime');
          hovership.setAttribute(
            'id',
            `${computershipstorage[computerships].title}${computerships}${i}`
          );
          hovership.addEventListener('click', hit);
          taken.push(d);
          d += 10;
        }
      }
      computerships++;
    } else {
      computerboard(random());
    }
  } else {
    computerboard(random())
  }
}

function computerboards() {
  while(computerships < 5) {
    computerboard(random())
  }
}
computerboards()

function gameover() {
  let shipcount = 0;
  for(let i=0; i < shipstorage.length ; i++) {

    if(shipstorage[i].sunk == true) {
      shipcount++
    }
    if(shipcount == 5) {
      alert('you lose')
    }
  }
  let computershipcount = 0;
  for (let i = 0; i < computershipstorage.length; i++) {
    if (computershipstorage[i].sunk == true) {
      computershipcount++;
    }
    if (computershipcount == 5) {
      alert('you win');
    }
  }
  
}