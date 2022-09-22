// THE VIEW OBJECT
// Keeps display updated with history, misses,
// and user messages
const view = {
  displayMessage: function (msg) {
    var messageArea = document.getElementById("mesageArea");
    messageArea.innerHTML = msg;
  },

  displayHit: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
}; // end view

// Testing - Delete Later
view.displayHit("34");
view.displayMiss("66");
view.displayMessage("howdy y'all is this thing on?");

// THE MODEL OBJECT
// Keeps the state of the game and
// communicates changes to the VIEW
const model = {
  // the size of the grid for the board
  boardSize: 7,
  numShips: 3,
  // the number of hits each ship can take
  shipLength: 3,
  shipsSunk: 0,

  ships: [
    { locations: ["06", "16", "26"], hits: ["", "", ""] },
    { locations: ["24", "34", "44"], hits: ["", "", ""] },
    { locations: ["10", "11", "12"], hits: ["", "", ""] },
  ],

  // Player fires a guess: Hit or Miss?
  fire: function (guess) {
    // examine each ship
    for (let i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var locations = ship.locations;
      // If guess matches a ship's location = Hit
      var index = locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        return true;
      }
    }
    // If guess doesn't match a location = Miss
    return false;
  }, // end fire
};
