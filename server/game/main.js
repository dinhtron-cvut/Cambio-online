// main.js
const Deck = require("./deck");
const Player = require("./player");

function main() {
  // vytvoř balíček a zamíchej
  let deck = new Deck();
  deck.shuffle();

  // vytvoř hráče
  let player1 = new Player("Martin");
  let player2 = new Player("Anna");

  // rozdání karet (4 karty pro každého)
  let dealtHands = deck.dealCards(2); // 2 hráči
  player1.setHand(dealtHands[0]);
  player2.setHand(dealtHands[1]);

  console.log(`${player1.name} má karty:`, player1.getHand());
  console.log(`${player2.name} má karty:`, player2.getHand());
  console.log("Zbývající karty v balíčku:", deck.remaining());

  // líznutí karty
  let card = player1.drawCard();
  console.log(`${player1.name} líznul:`, card);
  console.log("Aktuálně líznutá karta hráče:", player1.getDrawnCard());

  console.log("Zbývající karty v balíčku:", deck.remaining());
}

main();
