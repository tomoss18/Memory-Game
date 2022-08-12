const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let disableClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (disableClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let selectedCard = event.target;
  selectedCard.style.backgroundColor = selectedCard.classList[0];

  if (!card1 || !card2) {
      selectedCard.classList.add("flipped");
      card1 = card1 || selectedCard;
      card2 = selectedCard === card1 ? null : selectedCard;
  }
  if (card1 && card2) {
      disableClicking = true;

    let gif1 = card1.className;
    let gif2 = card2.className;

      if (gif1 === gif2) {
        cardsFlipped += 2;
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        disableClicking = false;
      } else {
        setTimeout(function() {
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
          disableClicking = false;
        }, 1000);
      }
}
}


createDivsForColors(shuffledColors);