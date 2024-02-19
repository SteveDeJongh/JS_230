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
    let addContact = document.querySelector('.add-contact');

    addContact.addEventListener('click', this.renderAddContactForm.bind(this));
  }

  // Add contact form
  renderAddContactForm() {
    let html = this.addContactTemplate({tags: this.tags});
    this.main.innerHTML = html;
  }



  async init() {
    await this.renderHomePage();
    this.bindHomePageEvents();
  }
}

let app = new App().init();