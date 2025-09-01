const Deck = require("./deck");
const DiscardDeck = require("./discarddeck");
const Player = require("./player");

class GameLogic {
  constructor(playerNames) {
    this.deck = new Deck();
    this.discardDeck = new DiscardDeck();
    this.players = playerNames.map(name => new Player(name));
    this.currentPlayerIndex = 0;
    this.gameOver = false;

    this.initializeGame();
  }

  // === Inicializace hry ===
  initializeGame() {
    this.deck.shuffle();

    // Rozdej karty hráčům
    const hands = this.deck.dealCards(this.players.length, 4);
    this.players.forEach((player, index) => {
      player.setHand(hands[index]);
    });

    console.log("Hra byla inicializována!");
  }

  // === Získání aktuálního hráče ===
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
  // === Tah hráče ===
  playerAction(action, targetIndex = null, indexUseCard) {
    const currentPlayer = this.getCurrentPlayer();

    switch (action) {
      case "draw":
        const drawnCard = this.deck.drawCard();
        if (drawnCard) {
          currentPlayer.setDrawnCard(drawnCard);
          console.log(`${currentPlayer.name} líznul kartu:`, drawnCard);
        } else {
          console.log("Balíček je prázdný!");
        }
        break;

      case "swap":
        if (targetIndex !== null) {
          currentPlayer.swapDrawnCardWithHand(targetIndex);
          console.log(`${currentPlayer.name} vyměnil kartu na indexu ${targetIndex}.`);
        } else {
          console.log("Nebyl zadán platný index pro výměnu!");
        }
        break;

      case "discard":
        const cardsToUse = currentPlayer.useCards(indexUseCard); // Použij funkci useCards pro získání karet k odložení
        
        if (cardsToUse && cardsToUse.length > 0) {
          cardsToUse.forEach(card => this.discardDeck.addCard(card)); // Přidej každou kartu do discardDeck
          console.log(`${currentPlayer.name} odložil karty:`, cardsToUse);
        } else {
          console.log("Hráč nemá žádné karty k odložení!");
        }
        break;

      default:
        console.log("Neplatná akce!");
    }

    this.checkGameOver();
    this.nextPlayer();
  }

  // === Přepnutí na dalšího hráče ===
  nextPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    console.log(`Na tahu je hráč: ${this.getCurrentPlayer().name}`);
  }
  // === Volání CAMBIO ===
  callingCambio(call = false, numPlayed){
    if(call && numPlayed === this.players.length){
      console.log(`Hráč ${this.getCurrentPlayer().name} volá CAMBIO!`);
      this.players.forEach(player => {
        if(player !== this.getCurrentPlayer()){
          console.log(`Hráč ${player.name} má karty:`, player.getHand());
        }
      });
      this.checkGameOver();
      this.gameOver = true;
    }
  }

  // === Kontrola konce hry ===
  checkGameOver() {
    if (this.gameOver) {
      const scores = this.players.map(player => ({
        name: player.name,
        score: player.getSumOfHand()
      }));

      scores.sort((a, b) => a.score - b.score);

      const winner = scores[0];
      console.log(`Hráč ${winner.name} vyhrává hru s nejnižší hodnotou ruky: ${winner.score}!`);
      console.log("Konečné skóre hráčů:");
      scores.forEach(({ name, score }) => {
        console.log(`${name}: ${score}`);
      });

      this.showGameState();
    }
  }

  // === Zobrazení stavu hry ===
  showGameState() {
    console.log("=== Stav hry ===");
    this.players.forEach(player => {
      console.log(`${player.name}:`, player.getHand());
    });
    console.log("Vrchní karta odkládacího balíčku:", this.discardDeck.peekTopCard());
    console.log("Počet zbývajících karet v balíčku:", this.deck.remaining());
  }
}

module.exports = GameLogic;

