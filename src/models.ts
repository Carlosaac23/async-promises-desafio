import * as jsonfile from 'jsonfile';

class Contact {
  id?: number = undefined;
  name: string = '';
}

class ContactsCollection {
  data: Contact[] = [];

  load() {
    // usar la version Async (readFile)
    const jsonPromise = jsonfile.readFile(__dirname + '/contacts.json');
    jsonPromise
      .then(json => {
        this.data = json;
      })
      .catch(() => {
        console.log('Algo ha salido mal');
      });

    return jsonPromise;
  }

  getAll() {
    return this.data;
  }

  addOne(contact: Contact) {
    this.data.push(contact);
  }

  save() {
    // usar la version Async (writeFIle)
    jsonfile.writeFile(__dirname + '/contacts.json', this.data, { spaces: 2 });
  }

  getOneById(id: number) {
    return this.data.find(contact => contact.id === id);
  }
}
export { ContactsCollection, Contact };
