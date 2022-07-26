const sum = require('./script').default;

test('adds 1 + 2 to equal 3', () => {
  expect(
    sum([
      { title: 'Carrier', length: '5' },
      { title: 'Battleship', length: '4' },
      { title: 'Cruiser', length: '3' },
      { title: 'Destroyer', length: '2' },
      { title: 'Destroyertwo', length: '2' },
      { title: 'Submarine', length: '1' },
      { title: 'Submarinetwo', length: '1' },
    ])
  ).toBe('Carrier');
});
