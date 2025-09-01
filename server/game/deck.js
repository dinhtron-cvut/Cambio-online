// deck.js

class Deck {
  constructor() {
    this.suits = ["black", "black", "red", "red"];
    this.values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    this.cards = this.createDeck();
  }
  isEmpty() {
    return this.cards.length === 0;
  }
  // === Vytvoření balíčku ===
  createDeck() {
    let deck = [];
    for (let suit of this.suits) {
      for (let value of this.values) {
        deck.push({ suit, value });
      }
    }
    return deck;
  }

  // === Zamíchání balíčku ===
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // === Rozdání karet hráčům ===
  dealCards(numPlayers, cardsPerPlayer = 4) {
    let players = [];
    for (let i = 0; i < numPlayers; i++) {
      players.push(this.cards.splice(0, cardsPerPlayer));
    }
    return players;
  }

  // === Líznutí jedné karty ===
  drawCard() {
    return this.cards.length > 0 ? this.cards.shift() : null;
  }

  // === Počet zbývajících karet ===
  remaining() {
    return this.cards.length;
  }
}

module.exports = Deck;
