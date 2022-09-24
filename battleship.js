// THE VIEW OBJECT:
// Keeps display updated with history, misses,
// and user messages
const view = {
  displayMessage: function (msg) {
    var messageArea = document.getElementById("mesageArea");
    messageArea.innerHTML = msg;
  },

  // Update cell with hit image
  displayHit: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  // Update cell with miss image
  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
}; // end view

// THE MODEL OBJECT:
// Keeps the state of the game (logic for hits/misses) and
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
      var index = ship.locations.indexOf(guess);
      // if the guess matches a ship's location = Hit
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        // check to see if the ship is completely destroyed
        if (this.isSunk(ship)) {
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    // if guess doesn't match a location = Miss
    view.displayMiss(guess);
    view.displayMessage("You missed");
    return false;
  }, // end fire

  // Determine if a ship is sunk
  isSunk: function (ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  }, // end isSunk
};

// Testing - Delete Later
model.fire("24");
model.fire("34");
model.fire("44");
