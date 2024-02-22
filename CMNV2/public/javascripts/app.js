const DEFAULT_TAGS = ['school', 'work', 'friend'];
const HOST = 'http://localhost:3000';

class App {
  constructor() {
    // Templates
    this.homeTemplate = Handlebars.compile(document.querySelector('#home-temp').innerHTML);
    this.contactLITemplate = Handlebars.compile(document.querySelector('#contact-li-template').innerHTML);
    this.addContactTemplate = Handlebars.compile(document.querySelector('#add-contact-form-temp').innerHTML);
    this.editContactTemplate = Handlebars.compile(document.querySelector('#edit-contact-form-temp').innerHTML);
    this.tagTemplate = Handlebars.compile(document.querySelector('#selected-tag-template').innerHTML);
        
    this.main = document.querySelector('main');
    this.contacts;
    this.contactsList;
    this.searchBar;
    this.filterTags;
    this.form;
    this.tags;

    this.init();
  }
 
  // Home Page
  async fetchContactsData() {
    const response = await fetch(HOST + '/api/contacts');
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
    let html = this.homeTemplate({tags: this.tags, contacts: this.contacts});
    this.main.innerHTML = html;
  }

  bindHomePageEvents() {
    let addContactButtons = document.querySelectorAll('.add-contact');
    let searchBar = document.querySelector('.search-bar');

    this.bindContactActions();

    addContactButtons.forEach(button => {
      button.addEventListener('click', this.renderAddContactForm.bind(this));
    });

    searchBar.addEventListener('keyup', this.searchBarInput.bind(this));
    let tagFilters = document.querySelectorAll('.main-page-tags input');
    tagFilters.forEach(button => button.addEventListener('click', this.tagSelection.bind(this)));

    this.contactsList.addEventListener('click', this.tagListener.bind(this));
  }

  bindContactActions() {
    let deleteButtons = document.querySelectorAll('.delete-contact');
    let editButtons = document.querySelectorAll('.edit-contact');

    deleteButtons.forEach(button => button.addEventListener('click', this.handleDeleteClick.bind(this)));
    editButtons.forEach(button => button.addEventListener('click', this.handleEditClick.bind(this)));
  }

  async init() {
    this.contacts = await this.tagsStringToArray(await this.fetchContactsData());
    this.tags = this.populateTags.call(this, this.contacts);
    await this.renderHomePage();
    this.contactsList = document.querySelector('.contacts-list');
    this.searchBar = document.querySelector('.search-bar');
    this.filterTags = document.querySelectorAll('.main-page-tags input');
    this.bindHomePageEvents();

    return this;
  }

  // Search Function
  searchBarInput(e) {
    let match = e.target.value;
    let filterResults = this.filterContactsForSearchBar(match);
    this.contactsList.innerHTML = this.contactLITemplate({contact: filterResults});
    this.bindContactActions();
  }

  filterContactsForSearchBar(query) {
    query = query.toLowerCase();
    let contacts = this.contacts;

    if (this.anyTagSelected()) {
      let tags = this.getFilterTags();
      contacts = this.filterContactsByTagSelection(tags);
    }

    return this.filterContactsByQuery(contacts, query);
  }

  hasSearchQuery() {
    return this.searchBar.value.length > 0;
  }

  filterContactsByQuery(contacts, query) {
    return contacts.filter(contact => {
      contact.tags = contact.tags || [];
      return contact.full_name.toLowerCase().includes(query) ||
             contact.email.toLowerCase().includes(query) ||
             contact.phone_number.includes(query) ||
             contact.tags.some(tag => tag.toLowerCase().includes(query))
    })
  }

  // Filter Contacts by Tag Selection
  tagSelection(e) {
    let tags = this.getFilterTags();
    let filterResults = this.filterContactsByTagSelection(tags);
    this.contactsList.innerHTML = this.contactLITemplate({contact: filterResults});
    this.bindContactActions();
  }

  filterContactsByTagSelection(tags) {
    let contacts = this.contacts;

    if (this.hasSearchQuery()) {
      let query = this.searchBar.value;
      contacts = this.filterContactsByQuery(contacts, query); 
    }

    return contacts.filter(contact => {
      contact.tags = contact.tags || [];
      return tags.every(tag => contact.tags.includes(tag));
    });
  }

  getFilterTags() {
    let tagFilters = [...document.querySelectorAll('.main-page-tags input')];
    let tags = tagFilters.filter(tag => tag.checked);
    tags = tags.map(tag => tag.value)
    return tags;
  }

  // Edit Contact Actions
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
    const response = await fetch(HOST + `/api/contacts/${id}`);
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
    
    let tagInput = document.querySelector('.add-tag-input');
    tagInput.addEventListener('keydown', this.addTagEnterListener.bind(this));
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
      let dataObj = this.formatFormData(formData);
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
      const response = await fetch(HOST + `/api/contacts/${contactData.id}`, {
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

  // Delete Contact Actions

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
      console.error('Delete contact operations aborted.');
    }
  }

  async deleteContact(id) {
    try {
      let response = await fetch(HOST + `/api/contacts/${id}`, {method: 'DELETE'});
      return response;
    } catch(e) {
      console.error('Error: ', e);
    }
  }

  // Add Contact Form
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

    let tagInput = document.querySelector('.add-tag-input');
    tagInput.addEventListener('keydown', this.addTagEnterListener.bind(this));
  }

  formatFormData(formData) {
    let dataObj = {tags: []};
    for (const [k,v] of formData) {
      if (k === 'tags') {
        dataObj[k].push(v);
      } else {
        dataObj[k] = v;
      }
    }
    dataObj.tags = dataObj.tags.join(',');
    return dataObj;
  }

  async addContactFormSubmit(e) {
    e.preventDefault(); 
    if (this.form.checkValidity()) {
      let formData = new FormData(this.form);
      let dataObj = this.formatFormData(formData);
      let response = await this.submitNewContactData(dataObj);

      if (response.status === 201) {
        this.init();
      } else {
        alert('Failed to submit new contact data.');
      }
    } else {
      let inputs = this.form.querySelectorAll('input');
      inputs.forEach(input => this.validateInput(input));
      alert('Please correct form errors before submitting.')
    }
  }

  async submitNewContactData(contactData) {
    try {
      const response = await fetch(HOST + '/api/contacts/', {
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
    field.classList.remove('invalid');
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
    field.classList.add('invalid');
  }

  handleFormValueMismatch(field) {
    let eSpan = document.querySelector("span[data-name='" + 'error-' + field.name + "']");
    let eMsg = "Please enter a valid " + eSpan.dataset.fieldName + '.';
    eSpan.textContent = eMsg;
    field.classList.add('invalid');
  }

  // Tags
  populateTags(contacts) {
    let allTags = contacts.flatMap(contact => contact.tags ? contact.tags : []);
    let tags = allTags.filter((tag, idx) => allTags.indexOf(tag) === idx);
    return tags.length > 0 ? tags : DEFAULT_TAGS; // default tag options present if no contacts with tags exist.
  }

  addTagHandler(e) {
    let newTagVal = e.target.previousElementSibling.value.toLowerCase();
    if (newTagVal.length === 0) return;
    if (this.tags.includes(newTagVal)) {
      e.target.previousElementSibling.value = '';
      alert('That tag already exists.');
    } else {
      e.target.previousElementSibling.value = '';
      this.tags.push(newTagVal);
      this.addTagAndSelect(newTagVal);
    }
  }

  addTagAndSelect(newTag) {
    let tagField = document.querySelector('.tag-options');
    let html = this.tagTemplate({tag: newTag});
    tagField.insertAdjacentHTML('beforeend', html);
  }

  tagListener(e) {
    let target = e.target;
    if (!target.classList.contains('contact-tag')) return;

    let tagFilterButton = this.main.querySelector(`.main-page-tags input[value="${target.textContent}"]`);
    if (tagFilterButton.checked) {
      tagFilterButton.checked = false;
    } else {
      tagFilterButton.checked = true;
    }
    this.tagSelection();
  }

  addTagEnterListener(e) {
    let newTagBtn = document.querySelector('button[type=button]');
    if (e.key !== 'Enter') return;
    e.preventDefault();
    newTagBtn.dispatchEvent(new Event('click'));
  }

  anyTagSelected() {
    return [...this.filterTags].some(tag => tag.checked === true);
  }
}

let app = new App();