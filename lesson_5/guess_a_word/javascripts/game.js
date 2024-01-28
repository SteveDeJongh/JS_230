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
      this.allowedGuesses = 6;
      this.word = randomWord();
      if (!this.word) {
        this.displayMessage("Sorry, I've run out of words.");
        this.hideReplayLink();
        return this;
      }
      this.word = this.word.split('');
      this.init();
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

    clearGuesses() {
      [...document.querySelectorAll('#guesses span')].forEach(el => el.remove());
    }

    fillBlanksFor(letter) {
      let self = this;

      this.word.forEach((l, idx) => {
        if (l === letter) {
          self.spaces[idx].textContent = l;
          self.correctSpaces += 1;
        }
      });
    }

    renderGuess(letter) {
      let span = document.createElement('span');
      span.textContent = letter;
      guesses.append(span);
    }

    renderIncorrectGuess(letter) {
      this.incorrect += 1;
      this.renderGuess(letter);
      this.setClass();
    }

    setClass() {
      apples.classList.remove(...apples.classList);
      apples.classList.add(`guess_${this.incorrect}`);
    }

    showReplayLink() {
      replay.classList.add("visible");
    }

    hideReplayLink() {
      replay.classList.remove("visible");
    }

    processGuess(e) {
      let letter = e.key;
      if (notALetter(letter)) { return; }
      if (this.duplicateGuess(letter)) { return; }

      if (this.word.includes(letter)) {
        this.fillBlanksFor(letter);
        this.renderGuess(letter);
        if (this.correctSpaces === this.spaces.length) {
          this.win();
        }
      } else {
        this.renderIncorrectGuess(letter);
      }

      if (this.incorrect === this.allowedGuesses) {
        this.lose()
      }
    }

    duplicateGuess(letter) {
      let duplicate = this.lettersGuessed.indexOf(letter) !== -1;

      if (!duplicate) { this.lettersGuessed.push(letter); }

      return duplicate;
    }

    win() {
      this.displayMessage('You win!');
      this.unbind();
      this.showReplayLink();
      this.setGameStatus('win');
    }

    lose() {
      this.displayMessage("Game over, you've run out of guesses");
      this.unbind();
      this.showReplayLink();
      this.setGameStatus('lose');
    }

    bind() {
      this.processGuessHandler = (e) => { this.processGuess(e)};
      document.addEventListener('keydown', this.processGuessHandler);
    }

    unbind() {
      document.removeEventListener('keydown', this.processGuessHandler);
    }

    setGameStatus(status) {
      document.body.classList.remove('win', 'lose');
      if (status) {
        document.body.classList.add(status);
      }
    }

    init() {
      this.bind();
      this.setClass();
      this.hideReplayLink();
      this.createBlanks();
      this.clearGuesses();
      this.setGameStatus();
      this.displayMessage('');
    }

  };

  new Game();

  function notALetter(letter) {
    return letter < 'a' || letter > 'z';
  }

  replay.addEventListener('click', (e) => {
    e.preventDefault();
    new Game();
  })
})