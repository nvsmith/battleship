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
}; // end VIEW OBJECT

// THE MODEL OBJECT:
// Keeps the state of the game (logic for hits/misses) and
// communicates changes to the VIEW
const model = {
  boardSize: 7, // grid square size
  numShips: 3,
  shipLength: 3, // the number of hits each ship can take
  shipsSunk: 0,

  ships: [
    { locations: ["06", "16", "26"], hits: ["", "", ""] },
    { locations: ["24", "34", "44"], hits: ["", "", ""] },
    { locations: ["10", "11", "12"], hits: ["", "", ""] },
  ],

  // Create ships until the board is filled
  generateShipLocations: function () {
    var locations;
    for (let i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip(); // generate new locations
      } while (this.collision(locations)); // if locations overlap, try again until they don't
      this.ships[i].locations = locations; // assign working locations to ships array
    }
  }, // end generateShipLocations

  // Create random locations for a ship
  generateShip: function () {
    var direction = Math.floor(Math.random() * 2); // random number: 0 or 1
    var row;
    var col;
    if (direction === 1) {
      // horizontal ship
    } else {
      // vertical ship
    }

    var newShipLocations = [];
    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        // add location to horizontal array
      } else {
        // add location to vertical array
      }
    }
    return newShipLocations; // array filled once all locations have generated
  }, // end generateShip

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
}; // end MODEL OBJECT

// THE CONTROLLER OBJECT:
// Gets and processes player input and
// communicates this to the MODEL
const controller = {
  guesses: 0,

  processGuess: function (guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage(
          `You sank all my battleships in ${this.guesses} guesses.`
        );
      }
    }
  }, // end processGuess
}; // end CONTROLLER OBJECT

// Validate guess for the CONTROLLER
function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  // check user input
  if (guess === null || guess.length !== 2) {
    alert("Invalid guess. Please enter a letter and number on the board.");
  } else {
    var firstChar = guess.charAt(0);
    // convert the first character (row input) to a number
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    // determine if guess is on the board
    if (isNaN(row) || isNaN(column)) {
      alert("Invalid guess. Please enter a letter and number on the board.");
    } else if (
      row < 0 ||
      row >= model.boardSize ||
      column < 0 ||
      column >= model.boardSize
    ) {
      alert("Invalid guess. That's off the board!");
    } else {
      return row + column; // if guess is parsed, return guess location as a String value
    }
  }
  return null; // failure to parse guess
} // end parseGuess

// Page load initialization with event listener(s)
function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeydown = handleKeyPress;
} // end init

// Event Handler For Fire Button
function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  // guess is stored in the value property of the input element
  var guess = guessInput.value;
  // pass the guess to the controller.
  controller.processGuess(guess);
  // clear input field after submission
  guessInput.value = "";
} // end handleFireButton

// Event Handler for Enter/Return Key Input
function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if (e.key === "Enter" || e.keyCode === 13) {
    fireButton.click();
    // prevent form from doing anything else after input
    return false;
  }
}

// Initialize page loading
window.onload = init;

// DEBUGGING & TEST CODE
controller.processGuess("A0");
controller.processGuess("A6");
