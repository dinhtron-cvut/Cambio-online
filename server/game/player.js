// Player.js

class Player {
    constructor(name) {
      this.name = name;            // jméno hráče
      this.hand = [];              // karty v ruce
      this.drawnCard = null;       // poslední líznutá karta
    }
  
    // Getter na hand (vrátí kopii, aby se venku nemohlo měnit přímo)
    getHand() {
      return [...this.hand];
    }
  
    // Setter pro hand (např. při rozdání na začátku)
    setHand(cards) {
      this.hand = cards;
    }
  
    // Getter pro drawnCard
    getDrawnCard() {
      return this.drawnCard;
    }
  
    // Setter pro drawnCard
    setDrawnCard(card) {
      this.drawnCard = card;
    }
  
    // Metoda: hráč si lízne kartu z balíčku
    drawCard(deck) {
      if (deck.length > 0) {
        this.drawnCard = deck.shift();  // vezme horní kartu z balíčku
        return this.drawnCard;
      } else {
        console.log("Balíček je prázdný!");
        return null;
      }
    }
  
    // Metoda: přidá kartu do ruky
    addCardToHand(card) {
      this.hand.push(card);
    }
  
    // Metoda: odebere kartu z ruky podle indexu
    removeCardFromHand(index) {
      if (index >= 0 && index < this.hand.length) {
        return this.hand.splice(index, 1)[0];
      } else {
        console.log("Neplatný index!");
        return null;
      }
    }
  }
  
  // Export třídy pro použití jinde
  module.exports = Player;
  