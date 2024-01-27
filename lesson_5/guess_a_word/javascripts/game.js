document.addEventListener('DOMContentLoaded', () => {
  const message = document.querySelector("#message");
  const letters = document.querySelector("#spaces");
  const guesses = document.querySelector("#guesses");
  const apples = document.querySelector("#apples");
  const replay = document.querySelector("#replay");

  let randomWord = function() {
    let words = ['apple', 'banana', 'orange', 'pear'];
  
    return function() {
      let idx = Math.floor(Math.random() * (words.length));
      let word = words.splice(idx, 1)[0];
      return word;
    };
  }();

  class Game {
    constructor() {
      incorrect: 0;
      lettersGussed: [];
      correctSpaces: 0;
      word: this.startWord();
      this.init()     
    }

    startWord() {
      this.word = randomWord();
      if (!this.word) {
        this.displayMessage("Sorry, i've run out of words!");
        return this;
      }
      this.word = this.word.split('');
    }

    createBlanks() {
      let spaces = (new Array(this.word.length + 1)).join("<span></span>");
    
      let spans = letters.querySelectorAll("span");
      spans.forEach(span => {
        span.parentNode.removeChild(span);        
      });
      letters.insertAdjacentHTML('beforeend', spaces);
      this.spaces = document.querySelectorAll('#spaces span');
    }

    displayMessage(text) {
      message.text(text);
    }

    init() {
      this.createBlanks();
    }    
  };

  new Game();
})