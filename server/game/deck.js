// === Vytvoření balíčku karet ===
function createDeck() {
    const suits = ["♠", "♥", "♦", "♣"];  // barvy
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let deck = [];
  
    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, value });
      }
    }
  
    return deck;
  }
  
  // === Zamíchání balíčku ===
  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]]; // swap
    }
    return deck;
  }
  
  // === Rozdání karet hráčům ===
  function dealCards(deck, numPlayers, cardsPerPlayer = 4) {
    let players = [];
    for (let i = 0; i < numPlayers; i++) {
      players.push(deck.splice(0, cardsPerPlayer)); // vezmi horní 4 karty
    }
    return players;
  }
  