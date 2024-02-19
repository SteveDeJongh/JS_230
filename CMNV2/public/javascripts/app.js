class App {
  constructor() {
    this.main = document.querySelector('main');

    // Temp tags handler
    this.tags = ['school', 'work', 'friend'];

    // Home Page
    this.homeTemplate = Handlebars.compile(document.querySelector('#home-temp').innerHTML);

    // Add-Conctact Form
    this.addContactTemplate = Handlebars.compile(document.querySelector('#add-contact-form-temp').innerHTML);
  }
 
  // Home Page
  async fetchContactsData() {
    const response = await fetch('http://localhost:3000/api/contacts');
    return await response.json();
  }
  
  tagsStringToArray(contacts) {
    return contacts.map(contact => {
      if (contact.tags) {
        contact.tags = contact.tags.split(',');
      }
      return contact;
    })
  }
  
  async renderHomePage() {
    let contacts = await this.tagsStringToArray(await this.fetchContactsData());
    let html = this.homeTemplate({contacts: contacts});
    this.main.innerHTML = html;
  }

  bindHomePageEvents() {
    let addContactButtons = document.querySelectorAll('.add-contact');

    addContactButtons.forEach(button => {
      button.addEventListener('click', this.renderAddContactForm.bind(this));
    });
  }

  // Add contact form
  renderAddContactForm() {
    let html = this.addContactTemplate({tags: this.tags});
    this.main.innerHTML = html;
    this.bindAddContactEvents();
  }

  bindAddContactEvents() {
    let submit = document.querySelector('button[type=submit]');
    let cancel = document.querySelector('button[type=cancel]');
    let inputs = document.querySelectorAll('.input-field');
    submit.addEventListener('click', this.addContactFormSubmit.bind(this));
    cancel.addEventListener('click', this.addContactFormCancel.bind(this));
    inputs.forEach(input => {
      input.addEventListener('focus', this.handleInputFocus);
      input.addEventListener('blur', this.handleInputBlur);
    });
  }

  addContactFormSubmit(e) {

  }

  addContactFormCancel(e) {
    e.preventDefault();
    this.init();
  }

  handleInputFocus(e) {
    let field = e.target;
    let eSpan = document.querySelector("span[data-name='" + 'error-' + field.name + "']");
    eSpan.textContent = '';
    eSpan.classList.remove('invalid');
  }

  handleInputBlur(e) {
    let field = e.target;
    let eSpan = document.querySelector("span[data-name='" + 'error-' + field.name + "']");
    let eMsg = eSpan.dataset.fieldName + ' is a required field.';
    eSpan.textContent = eMsg;
    eSpan.classList.add('invalid');
  }

  async init() {
    await this.renderHomePage();
    this.bindHomePageEvents();
  }
}

let app = new App().init();