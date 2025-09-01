// Player.js

class Player {
    constructor(name) {
      this.name = name;            // jméno hráče
      this.hand = [];              // karty v ruce
      this.drawnCard = null;       // poslední líznutá karta
      this.score = 0;             // skóre hráče
    }
    resetPlayer() {
      this.hand = [];
      this.drawnCard = null;
      this.score = 0; // Pokud používáš skóre
    }
    getSumOfHand() {
      return this.hand.reduce((sum, card) => {
        let value = 0;
        switch(card.value) {
          case 'A':
            if(card.suit === 'black') {
              value = 14;
            }
            else {
              value = 1;
            }
            break;
          case 'J':
            value = 11;
            break;
          case 'Q':
            value = 12;
            break;
          case 'K':
            value = 13;
            break;
          default:
            value = parseInt(card.value);
        }
        
        return sum + value;
      }, 0);
    }
  
    
    getScore(){
      return this.score;
    }
    setScore(score){
      this.score = score;           
    }
    addPoints(points){
      this.score += points;
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

    swapDrawnCardWithHand(index) {
      // Pokud je index platný a existuje líznutá karta, vymění je
      if (this.drawnCard && index >= 0 && index < this.hand.length) {
        const temp = this.hand[index];
        this.hand[index] = this.drawnCard;
        this.drawnCard = temp;
      } else if (index == -1) {
        // Pokud hráč zadá -1, nechá si líznutou kartu a nic nevyměňuje
        console.log(`${this.name} si nechává líznutou kartu.`);
      }
      else {
        console.log("Neplatný index nebo žádná líznutá karta!");
      }
    }

    useCards(indexes = []) {
      if (Array.isArray(indexes) && indexes.length > 0) {
      let usedCards = [];
      // Seřadit indexy sestupně, aby odebrání karet neovlivnilo ostatní indexy
      indexes.sort((a, b) => b - a);
      for (let i of indexes) {
        if (i >= 0 && i < this.hand.length) {
        usedCards.push(this.hand.splice(i, 1)[0]);
        this.removeCardFromHand(i);
        } else {
        console.log("Neplatný index!");
        }
      }
      return usedCards;
      } else {
      console.log("Žádné indexy k použití nebo neplatný vstup!");
      return null;
      }
    }
  
    // Metoda: hráč si lízne kartu z balíčku
    draw1Card(deck) {
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
// Compare this snippet from server/game/server.js: