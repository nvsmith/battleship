// THE VIEW OBJECT
// Keeps display updated with history, misses,
// and user messages
let view = {
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

view.displayHit("34");
view.displayMiss("66");
view.displayMessage("howdy y'all is this thing on?");
