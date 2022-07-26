// create 7 ships [5,4,3,2,2]
let shipstorage = [
  { title: 'Carrier', length: '5' },
  { title: 'Battleship', length: '4' },
  { title: 'Cruiser', length: '3' },
  { title: 'Destroyer', length: '2' },
  { title: 'Destroyertwo', length: '2' },
  { title: 'Submarine', length: '1' },
  { title: 'Submarinetwo', length: '1' }
];
function ship(shipstorage) {
  let answer = []
  for(let i = 0 ; i < shipstorage.length ; i++) {
    let current = {}
    for(let j = 0; j < shipstorage[i].length; j++) {
      //create each individual ship
      current[j] = `${shipstorage[i].title}${j}`
    }
    answer[i] = current
  }
  return Object.keys(answer[0]).length
}

function hit(ship) {

}
module.exports = ship;
