console.log('hello');

async function fetchContacts() {
  const response = await fetch('http://localhost:3000/api/contacts');
  return await response.json();
}

let mainTempScript = document.querySelector('#main-temp').innerHTML;
let mainTemplate = Handlebars.compile(mainTempScript);

let contacts;

function tagsToArray(contacts) {
  return contacts.map(contact => {
    if (contact.tags) {
      contact.tags = contact.tags.split(',');
    }
    return contact;
  })
}

async function asignContacts() {
  let dataObj = await fetchContacts()
  console.log(dataObj);
  dataObj = tagsToArray(dataObj);
  console.log(dataObj);
  let html = mainTemplate({contacts: dataObj});
  console.log(html);
}
asignContacts();