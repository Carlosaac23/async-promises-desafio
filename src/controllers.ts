import { ContactsCollection, Contact } from './models';

export class ContactsControllerOptions {
  action: 'get' | 'save' | null;
  params: Contact;
}

class ContactsController {
  contacts: ContactsCollection;
  promesa: Promise<any>;

  constructor() {
    this.contacts = new ContactsCollection();
    const jsonPromise = this.contacts.load();
    this.promesa = jsonPromise;
  }

  processOptions(options: ContactsControllerOptions) {
    if (options.action == 'get' && options.params.id) {
      return this.contacts.getOneById(options.params.id);
    } else if (options.action == 'get') {
      return this.contacts.getAll();
    } else if (options.action == 'save' && options.params) {
      this.contacts.addOne(options.params);
      this.contacts.save();
      return `${options.params.name} ha sido guardado correctamente`;
    }

    return null;
  }
}
export { ContactsController };
