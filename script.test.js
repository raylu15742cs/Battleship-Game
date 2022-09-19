/** @jest-environment jsdom */

const sum = require('./scripts').default;
const jsdom = require("jsdom");

const dom = new JSDOM(`<!DOCTYPE html><body><div id="gameboard"></div></body>`);
test(ships, () => {
  expect(shipstorage[0].title).toBe('Carrier');
});
