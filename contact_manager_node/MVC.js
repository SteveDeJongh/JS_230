class Model {
  constructor() {
    this.contacts = [];

    this.getContacts();
  }

  bindContactListChanged(callback) {
    this.onContactListChanged = callback;
  }

  comit(contacts) {
    this.onContactListChanged(contacts);
  }

  async getContacts() {
    let response = await fetch('/api/contacts')
    let data = await response.json();
    this.contacts = data;
    this.comit(this.contacts);
  }
}

class View {
  constructor() {
    this.contactContainer = document.querySelector('.contacts-container')
    this.contactList = document.querySelector('.contact-list');
    this.noContacts = document.querySelector('.no-contacts');
  }

  displayContacts(contacts) {
    if (contacts.length >= 1) {
      this.contactList.innerHTML = '';
      this.contactList.classList.remove('hide');
      this.noContacts.classList.add('hide');
      let template = document.querySelector('#contact_temp');
      let hTemp = Handlebars.compile(template.innerHTML);
      contacts.forEach(contact => {
        this.contactList.insertAdjacentHTML('beforeend', hTemp(contact));
      });
    } else {
      this.contactList.classList.add('hide');
      this.noContacts.classList.remove('hide');
    }
  }

}

class Controller{
  constructor(model, view) {
    this.model = model;
    this.view = view;
    debugger;
    this.model.bindContactListChanged(this.onContactListChanged);
    this.onContactListChanged(this.model.contacts);
  }

  onContactListChanged(contacts) {
    this.view.displayContacts(contacts);
  }

}

let app = new Controller(new Model(), new View());
</script>