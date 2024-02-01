document.addEventListener('DOMContentLoaded', e => {
  const editor = {
    init() {
      this.buttonsContainer = document.querySelector('.buttons');
      this.textBox = document.querySelector('.text_box');

      this.buttons = [
        {
          command: 'bold',
          class: 'fa-bold',
          pushed: false,
        },
        {
          command: 'italic',
          class: 'fa-italic',
          pushed: false,
        },
        {
          command: 'underline',
          class: 'fa-underline',
          pushed: false,
        },
        {
          command: 'strikeThrough',
          class: 'fa-strikethrough',
          pushed: false,
        },
        {
          command: 'createLink',
          class: 'fa-link',
          pushed: false,
        },
        {
          command: 'insertUnorderedList',
          class: 'fa-list-ul',
          pushed: false,
        },
        {
          command: 'insertOrderedList',
          class: 'fa-list-ol',
          pushed: false,
        },
        {
          command: 'justifyLeft',
          class: 'fa-align-left',
          pushed: false,
        },
        {
          command: 'justifyRight',
          class: 'fa-align-right',
          pushed: false,
        },
        {
          command: 'justifyCenter',
          class: 'fa-align-center',
          pushed: false,
        },
        {
          command: 'justifyFull',
          class: 'fa-align-justify',
          pushed: false,
        },
      ];

      this.bindButtonClick();
      this.bindSelectionChange();
      
      this.setupTemplates();

      this.renderButtons();
    },

    bindButtonClick() {
      this.buttonsContainer.addEventListener('click', e => {
        const target = e.target;

        if (target instanceof HTMLButtonElement) {
          const command = target.dataset.command;

          if (command === 'createLink') {
            this.createLink();
          } else {
            document.execCommand(command);
          }

          this.updateButtons();
          this.textBox.focus();
        }
      });
    },

    createLink() {
      const url = prompt('Enter a URL for the link.');
      document.execCommand('createLink', false, url);
    },

    bindSelectionChange() {
      document.addEventListener('selectionchange', () => this.updateButtons());
    },

    updateButtons() {
      this.updateButtonStates();
      this.renderButtons();
    },

    updateButtonStates() {
      this.buttons.forEach((button) => { 
        button.pushed = document.queryCommandState(button.command);
      });
    },

    setupTemplates() {
      const template = document.querySelector('#buttons_template').innerHTML;
      this.buttonsTemplate = Handlebars.compile(template);
    },

    renderButtons() {
      this.clearButtonsContainer();

      this.buttonsContainer.insertAdjacentHTML(
        'afterbegin',
        this.buttonsTemplate({buttons: this.buttons })
      );
    },

    clearButtonsContainer() {
      this.buttonsContainer.querySelectorAll('button').forEach(button => {
        button.remove();
      });
    },
  }

  editor.init();
})