import { ContactModel } from '../shared/contact.model';

export class ContactStorageService {
    contacts: ContactModel[] = [
        new ContactModel('Test', 'Tester'),
    ];
    
    addNewContact(newContact: ContactModel) {
        this.contacts.push(newContact);
        console.log(this.contacts);
    }
}