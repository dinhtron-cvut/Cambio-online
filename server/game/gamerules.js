class GameRules {
  constructor() {
    this.rules = {
      actions: [
        "draw", // Hráč může líznout kartu z balíčku
        "swap", // Hráč může vyměnit kartu z ruky za líznutou kartu
        "discard", // Hráč může odložit líznutou kartu na odkládací balíček
        "peek", // Hráč může nahlédnout na jednu ze svých karet (pokud pravidla dovolují)
        "spy", // Hráč může nahlédnout na kartu jiného hráče (pokud pravidla dovolují)
        "swapWithPlayer", // Hráč může vyměnit kartu s jiným hráčem (pokud pravidla dovolují)
      ],
      handSize: 4, // Každý hráč začíná se 4 kartami
      winningCondition: "allZeroes", // Hráč vyhrává, pokud má všechny karty s hodnotou 0
      deckRules: {
        shuffleOnEmpty: true, // Pokud je balíček prázdný, zamíchej odkládací balíček a vytvoř nový
      },
      penalties: {
        invalidMove: "loseTurn", // Pokud hráč provede neplatný tah, ztrácí tah
        peekPenalty: 1, // Pokud hráč nahlédne na kartu bez povolení, dostane trestný bod
      },
    };
  }

  // === Pravidla pro tah ===
  isValidAction(action) {
    return this.rules.actions.includes(action);
  }

  // === Kontrola vítězství ===
  checkWinningCondition(player) {
    if (this.rules.winningCondition === "allZeroes") {
      return player.getHand().every(card => card.value === "0");
    }
    return false;
  }

  // === Pravidla pro balíček ===
  shouldShuffleDeck(deck) {
    return this.rules.deckRules.shuffleOnEmpty && deck.isEmpty();
  }

  // === Získání pravidel ===
  getRules() {
    return this.rules;
  }

  // === Zobrazení pravidel ===
  showRules() {
    console.log("=== Pravidla hry Cambio ===");
    console.log("1. Každý hráč začíná se 4 kartami.");
    console.log("2. Cílem hry je mít součet karet nejbližší 0.");
    console.log("3. Hráči mohou provádět následující akce:");
    console.log("   - Líznout kartu z balíčku.");
    console.log("   - Vyměnit kartu z ruky za líznutou kartu.");
    console.log("   - Odložit líznutou kartu na odkládací balíček.");
    console.log("   - Nahlédnout na jednu ze svých karet (pokud pravidla dovolují).");
    console.log("   - Nahlédnout na kartu jiného hráče (pokud pravidla dovolují).");
    console.log("   - Vyměnit kartu s jiným hráčem (pokud pravidla dovolují).");
    console.log("4. Pokud je balíček prázdný, odkládací balíček se zamíchá a vytvoří nový balíček.");
    console.log("5. Pokud hráč provede neplatný tah, ztrácí tah.");
    console.log("6. Pokud hráč nahlédne na kartu bez povolení, dostane trestný bod.");
  }
}

module.exports = GameRules;