// main.js
const readline = require("readline");
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
  let card = deck.drawCard(deck);
  console.log(`${player1.name} líznul:`, card);
  player1.setDrawnCard(card);
  console.log("Aktuálně líznutá karta hráče:", player1.getDrawnCard());

   // === zeptáme se uživatele, jaký index vyměnit ===
   const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Zadej index karty, kterou chceš vyměnit (0-3): ", (answer) => {
    let index = parseInt(answer);

    player1.swapDrawnCardWithHand(index);

    console.log(`${player1.name} má teď karty:`, player1.getHand());
    console.log("Aktuálně líznutá karta hráče:", player1.getDrawnCard());

    rl.close(); // ukončí čtení z terminálu
  });

  console.log("Zbývající karty v balíčku:", deck.remaining());
}

main();
