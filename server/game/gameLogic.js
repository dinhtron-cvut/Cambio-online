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
  playerTurn(action, targetIndex = null) {
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
        const cardToDiscard = currentPlayer.getDrawnCard();
        if (cardToDiscard) {
          this.discardDeck.addCard(cardToDiscard);
          currentPlayer.setDrawnCard(null);
          console.log(`${currentPlayer.name} odložil kartu:`, cardToDiscard);
        } else {
          console.log("Hráč nemá žádnou líznutou kartu k odložení!");
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

  // === Kontrola konce hry ===
  checkGameOver() {
    this.players.forEach(player => {
      if (player.getHand().every(card => card.value === "0")) {
        this.gameOver = true;
        console.log(`Hráč ${player.name} vyhrál hru!`);
      }
    });
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

