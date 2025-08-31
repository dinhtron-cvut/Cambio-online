class discarddeck{
    constructor(){
        this.cards = [];
    }

    addCard(card){
        this.cards.push(card);
    }

    drawCard(){
        return this.cards.pop();
    }

    isEmpty(){
        return this.cards.length === 0;
    }

    emptyDeck(){
        this.cards = [];
    }

    getCount(){
        return this.cards.length;
    }
}