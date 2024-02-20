class App {
  constructor() {
    this.main = document.querySelector('main');

    // Temp tags handler
    this.tags = ['school', 'work', 'friend'];

    // Home Page
    this.homeTemplate = Handlebars.compile(document.querySelector('#home-temp').innerHTML);
    this.contactLITemplate = Handlebars.compile(document.querySelector('#contact-li-template').innerHTML);
    this.contacts;

    // Add-Conctact Form
    this.addContactTemplate = Handlebars.compile(document.querySelector('#add-contact-form-temp').innerHTML);
    this.form;

    this.init();
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
    this.contacts = await this.tagsStringToArray(await this.fetchContactsData());
    console.log(this.contacts);
    console.log(this);
    let html = this.homeTemplate({contacts: this.contacts});
    this.main.innerHTML = html;
  }

  bindHomePageEvents() {
    let addContactButtons = document.querySelectorAll('.add-contact');
    let searchBar = document.querySelector('.search-bar');

    addContactButtons.forEach(button => {
      button.addEventListener('click', this.renderAddContactForm.bind(this));
    });

    searchBar.addEventListener('keyup', this.searchBarInput.bind(this));
  }

  searchBarInput(e) {
    let contactList = document.querySelector('.contacts-list');
    let match = e.target.value;
    let filterResults = this.filterContacts(match);
    contactList.innerHTML = this.contactLITemplate({contact: filterResults});
  }

  filterContacts(query) {
    return this.contacts.filter(contact => {
      contact.tags = contact.tags || [];
      return contact.full_name.includes(query) ||
             contact.email.includes(query) ||
             contact.phone_number.includes(query) ||
             contact.tags.some(tag => tag.includes(query))
    })
  }

  // Add contact form
  renderAddContactForm() {
    let html = this.addContactTemplate({tags: this.tags});
    this.main.innerHTML = html;
    this.form = document.querySelector('form');
    this.bindAddContactEvents();
  }

  bindAddContactEvents() {
    let submit = document.querySelector('button[type=submit]');
    let cancel = document.querySelector('button[type=cancel]');
    let inputs = document.querySelectorAll('.input-field');
    submit.addEventListener('click', this.addContactFormSubmit.bind(this));
    cancel.addEventListener('click', this.addContactFormCancel.bind(this));
    inputs.forEach(input => {
      input.addEventListener('focus', this.handleInputFocus.bind(this));
      input.addEventListener('blur', this.handleInputBlur.bind(this));
    });
  }

  async addContactFormSubmit(e) {
    e.preventDefault(); 
    if (this.form.checkValidity()) {
      let formData = new FormData(this.form);
      let dataObj = {tags: []};
      for (const [k,v] of formData) {
        if (k === 'tags') {
          dataObj[k].push(v);
        } else {
          dataObj[k] = v;
        }
      }
      dataObj.tags = dataObj.tags.join(',');
  
      let response = await this.submitNewContactData(dataObj);
      if (response.status === 201) {
        this.init();
      } else {
        alert('Failed to submit new contact data.');
      }
    } else {
      alert('Please correct form errors before submitting.')
    }
  }

  async submitNewContactData(contactData) {
    try {
      const response = await fetch('http://localhost:3000/api/contacts/', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(contactData),
      });
      return response
    } catch(e) {
      console.error('Error: ', e);
    }
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
    this.validateInput(field);
  }

  validateInput(field) {
    if (field.validity.valueMissing) {
      this.handleFormValueMissing(field);
      return false;
    } else if (field.validity.patternMismatch) {
      this.handleFormValueMismatch(field);
      return false;
    }
    return true;
  }

  handleFormValueMissing(field) {
    let eSpan = document.querySelector("span[data-name='" + 'error-' + field.name + "']");
    let eMsg = eSpan.dataset.fieldName + ' is a required field.';
    eSpan.textContent = eMsg;
    eSpan.classList.add('invalid');
  }

  handleFormValueMismatch(field) {
    let eSpan = document.querySelector("span[data-name='" + 'error-' + field.name + "']");
    let eMsg = "Please entere a valid " + eSpan.dataset.fieldName + '.';
    eSpan.textContent = eMsg;
    eSpan.classList.add('invalid');
  }

  // End of Add contact

  async init() {
    await this.renderHomePage();
    this.bindHomePageEvents();

    return this;
  }
}

let app = new App();