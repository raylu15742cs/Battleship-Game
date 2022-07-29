const gamecontainer = document.getElementById('gameboard')
let shipstorage = [
  { title: 'Carrier', length: '5', count: 0, max: 59, sunk: false },
  { title: 'Battleship', length: '4', count: 0, max: 69, sunk: false },
  { title: 'Zruiser', length: '3', count: 0, max: 79, sunk: false },
  { title: 'Destroyer', length: '2', count: 0, max: 89, sunk: false },
  { title: 'Submarine', length: '1', count: 0, max: 99, sunk: false },
];

let computershipstorage = [
  { title: 'compCarrier', length: '5', count: 0, max: 59, sunk: false },
  { title: 'compBattleship', length: '4', count: 0, max: 69, sunk: false },
  { title: 'compZruiser', length: '3', count: 0, max: 79, sunk: false },
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
    box.setAttribute('id', `${player}${i}${j}`);
    box.classList.add('box');
    box.addEventListener('mouseenter', function () {
      box.classList.add('blackhover');
    });
    box.addEventListener('mouseenter', function () {
      box.classList.remove('blackhover');
    });
    box.addEventListener('click', hit , {once: true});
    if(player == "Human") {
      box.addEventListener('click', ships);
    }
    if(player == "Computer") {
      box.addEventListener("click", hitback, {once: true})
    }
    return box
}

buildgameboard(10,"Human")
buildgameboard(10, 'Computer');

// create player ships
let shipcount = 0
let shiptaken = []
function ships(e) {
  let currentspot = e.path[0].id;
  if (shipcount < 5 && shipstorage[shipcount].max > currentspot.slice(-2)) {
    let location = parseInt(currentspot.slice(-2));
    let failcount = true;
    // loop though count for each spot and make sure its not taken
    for (let i = 0; i < shipstorage[shipcount].length; i++) {
      if (shiptaken.includes(location)) {
        failcount = false;
      } else {
        shiptaken.push(location);
        location += 10;
      }
    }
    // check the loop and then run it
    if (failcount) {
      let exactlocation = currentspot.slice(-2);
      for (let i = 0; i < shipstorage[shipcount].length; i++) {
        let ship = document.getElementById(`Human${exactlocation}`);
        ship.removeEventListener("click", hit, {once:true})
        let shipinner = document.createElement('div');
        shipinner.setAttribute('id', `${shipstorage[shipcount].title[0]}${i}`);
        shipinner.classList.add('playership');
        shipinner.classList.add("playershipcolor")
        shipinner.addEventListener('click',hit , {once: true});
        ship.appendChild(shipinner);
        exactlocation = parseInt(exactlocation) + 10;
      }
      shipcount++;
    }
  }
}

//ships();
// create computer ships

// tracks hits
function hit(e) {
  if(shipcount == 5) {
    let box = document.getElementById(e.path[0].id);
    if (e.path.length == 10) {
      box.classList.remove('playershipcolor');
      box.classList.add('playerhit');
      box.innerHTML = 'X';
      isSunk(e);
    } else {
      box.classList.add('hits');
    }
  }
}

// tracks sunks

function isSunk(e) { 
  let shipname = e.path[0].id.slice(0,-1)
  for(let i = 0; i < shipstorage.length ; i++) {
    if(shipname == shipstorage[i].title[0]) {
      shipstorage[i].count++;
    }
  }
  for(let i = 0; i < shipstorage.length ; i++) {
    if (shipstorage[i].count == shipstorage[i].length) {
      shipstorage[i].sunk = true;
      for (let j = 0; j < shipstorage[i].length; j++) {
        let shipsname = shipstorage[i].title
        let target = document.getElementById(`${shipsname[0]}${j}`);
        target.classList.add('sunk');
        target.classList.remove('playhit');
      }
    }
  }
  gameover();
}

// gameover
function gameover() {
  shipsunkcount = 0;
  for(let i = 0; i < shipstorage.length ; i++) {
    if(shipstorage[i].sunk) {
      shipsunkcount++
    }
    if(shipsunkcount == 5) {
      console.log("You Lose")
    }
  }
}

//random 
function random() {
  let randomnumber =  Math.floor(Math.random()*100)
  return randomnumber
}


// hitback

let taken = []
function hitback(e) {
  if(shipcount == 5) {
    let currentrandom = random()
    if(taken.includes(currentrandom)) {
      hitback()
      console.log('hi')
    } else {
      taken.push(currentrandom)
      if (currentrandom < 10) {
        let target = document.getElementById(`Human0${currentrandom}`);
        if (target.innerHTML != false) {
          let shiptarget = document.getElementById(
            `${target.innerHTML.substring(9, 11)}`
          );
          shiptarget.click();
          //console.log(target.innerHTML.substring(9,11));
        } else {
          target.click();
        }
      } else {
        let target = document.getElementById(`Human${currentrandom}`);
        if (target.innerHTML != false) {
          let shiptarget = document.getElementById(
            `${target.innerHTML.substring(9, 11)}`
          );
          shiptarget.click();
        }
        target.click();
      }
    }
  }
}