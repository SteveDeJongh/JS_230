let game;

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
      this.incorrect = 0;
      this.lettersGuessed = [];
      this.correctSpaces = 0;
      this.word = this.startWord();
      this.init();
    }

    startWord() {
      this.word = randomWord();
      if (!this.word) {
        this.displayMessage("Sorry, i've run out of words!");
        return this;
      }
      return this.word.split('');
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
      message.textContent = text;
    }

    lose() {
      return this.incorrect >= 6;
    }

    win() {
      return this.word.every(letter => this.lettersGuessed.includes(letter));
    }

    clearGuesses() {
      [...document.querySelectorAll('#guesses span')].forEach(el => el.remove());
    }

    init() {
      this.createBlanks();
      this.clearGuesses();
    }    
  };

  game = new Game();

  document.addEventListener("keydown", keyPress);

  function keyPress(e) {
    let letter = e.key;
    if (letter >= 'a' && letter <= 'z') {
      game.lettersGuessed.push(letter);
      if (game.word.includes(letter)) {
        let spans = document.querySelectorAll('#spaces span');
        game.word.forEach((let, idx) => {
          if (let === letter) {
            spans[idx].textContent = let;
          }
        });
      } else {
        game.incorrect += 1;
        let guessString = `guess_${game.incorrect}`;
        document.querySelector('#apples').classList.add(guessString);
      }
      
      let guessSpan = document.createElement('span');
      guessSpan.textContent = letter;
      guesses.append(guessSpan);


    if (game.lose()) {
      game.displayMessage("Game over, you've run out of guesses.");
      document.removeEventListener('keydown', keyPress);
    } else if (game.win()) {
      game.displayMessage('You win!');
      document.removeEventListener('keydown', keyPress);
    }
    }
  }

  replay.addEventListener('click', (e) => {
    e.preventDefault();
    game = new Game();
    message.textContent = '';
    apples.classList = '';
  })

})