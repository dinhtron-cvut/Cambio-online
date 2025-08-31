// gameLogic.js
  function drawing_card(deck, player){

  }
  
  // === Testovací spuštění ===
  function main() {
    let deck = createDeck();
    deck = shuffle(deck);
  
    let players = dealCards(deck, 3); // 3 hráči, každý 4 karty
    console.log("Hráči mají karty:", players);
    console.log("Zbylý balíček má:", deck.length, "karet");
  }
  
  main();
  