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

    // Edit-Contact Form
    this.editContactTemplate = Handlebars.compile(document.querySelector('#edit-contact-form-temp').innerHTML);

    // Tags
    this.tagTemplate = Handlebars.compile(document.querySelector('#selected-tag-template').innerHTML);

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
    let html = this.homeTemplate({contacts: this.contacts});
    this.main.innerHTML = html;
  }

  bindHomePageEvents() {
    let addContactButtons = document.querySelectorAll('.add-contact');
    let searchBar = document.querySelector('.search-bar');
    let deleteButtons = document.querySelectorAll('.delete-contact');
    let editButtons = document.querySelectorAll('.edit-contact');

    deleteButtons.forEach(button => button.addEventListener('click', this.handleDeleteClick.bind(this)));
    editButtons.forEach(button => button.addEventListener('click', this.handleEditClick.bind(this)));

    addContactButtons.forEach(button => {
      button.addEventListener('click', this.renderAddContactForm.bind(this));
    });

    searchBar.addEventListener('keyup', this.searchBarInput.bind(this));
  }

  // Edit Actions
  async handleEditClick(e) {
    let id = Number(e.target.dataset.contactId);
    let contact = await this.fetchContactDataByID(id);
    Handlebars.registerHelper('selected', function(tagName) {
      if (contact.tags) {
        return !!contact.tags.includes(tagName);
      } else {
        return false;
      }
    })
    contact.tagOptions = this.tags;
    this.main.innerHTML = this.editContactTemplate({contact: contact});
    this.bindEditContactEvents()
  }

  async fetchContactDataByID(id) {
    const response = await fetch(`http://localhost:3000/api/contacts/${id}`);
    return await response.json();
  }

  bindEditContactEvents() {
    let submit = document.querySelector('button[type=submit]');
    let cancel = document.querySelector('button[type=cancel]');
    let inputs = document.querySelectorAll('.input-field');
    let newTagBtn = document.querySelector('button[type=button]');

    submit.addEventListener('click', this.editContactFormSubmit.bind(this));
    cancel.addEventListener('click', this.editContactFormCancel.bind(this));
    inputs.forEach(input => {
      input.addEventListener('focus', this.handleInputFocus.bind(this));
      input.addEventListener('blur', this.handleInputBlur.bind(this));
    });
    newTagBtn.addEventListener('click', this.addTagHandler.bind(this));
  }

  editContactFormCancel(e) {
    e.preventDefault();
    this.init();
  }

  async editContactFormSubmit(e) {
    e.preventDefault();
    let editForm = document.querySelector('form');
    let id = Number(editForm.dataset.contactId);
    if (editForm.checkValidity()) {
      let formData = new FormData(editForm);
      let dataObj = {tags: []};
      for (const [k,v] of formData) {
        if (k === 'tags') {
          dataObj[k].push(v);
        } else {
          dataObj[k] = v;
        }
      }
      dataObj.tags = dataObj.tags.join(',');
      dataObj.id = id;
  
      let response = await this.submitEditContactData(dataObj);
      if (response.status === 201) {
        this.init();
      } else {
        alert('Failed to edit contact data.');
      }
    } else {
      let inputs = editForm.querySelectorAll('input');
      inputs.forEach(input => this.validateInput(input));
      alert('Please correct form errors before submitting.')
    }
  }

  async submitEditContactData(contactData) {
    try {
      const response = await fetch(`http://localhost:3000/api/contacts/${contactData.id}`, {
        method: "PUT",
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

  // Delete Actions

  async handleDeleteClick(e) {
    let id = Number(e.target.dataset.contactId);
    let name = this.contacts.filter(contact => contact.id === id)[0].full_name;
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      let response = await this.deleteContact(id);
      if (response.status === 204) {
        this.init();
      } else {
        alert('Contact not found.');
      }
    } else {
      console.log('Delete contact operations aborted.');
    }
  }

  async deleteContact(id) {
    try {
      let response = await fetch(`http://localhost:3000/api/contacts/${id}`, {method: 'DELETE'});
      return response;
    } catch(e) {
      console.log('Error: ', e);
    }
  }

  // Search
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
    let newTagBtn = document.querySelector('button[type=button]');

    submit.addEventListener('click', this.addContactFormSubmit.bind(this));
    cancel.addEventListener('click', this.addContactFormCancel.bind(this));
    inputs.forEach(input => {
      input.addEventListener('focus', this.handleInputFocus.bind(this));
      input.addEventListener('blur', this.handleInputBlur.bind(this));
    });
    newTagBtn.addEventListener('click', this.addTagHandler.bind(this));
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

  // Form validations

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
    this.tags = this.populateTags.call(this, this.contacts);
    this.bindHomePageEvents();

    return this;
  }

  // tags

  populateTags(contacts) {
    let allTags = contacts.flatMap(contact => contact.tags ? contact.tags : []);
    let tags = allTags.filter((tag, idx) => allTags.indexOf(tag) === idx);
    return tags.length > 0 ? tags : ['work', 'friend', 'school']; // default tag options present if no contacts exist.
  }

  addTagHandler(e) {
    let newTagVal = e.target.previousElementSibling.value.toLowerCase();
    if (this.tags.includes(newTagVal)) {
      alert('That tag already exists.');
    } else {
      this.tags.push(newTagVal);
      this.addTagAndSelect(newTagVal);
    }
  }

  addTagAndSelect(newTag) {
    let tagField = document.querySelector('.tag-options');
    let html = this.tagTemplate({tag: newTag});
    tagField.insertAdjacentHTML('beforeend', html);
  }
}

let app = new App();