import { ContactModel } from "../shared/contact.model";

export class ContactStorageService {
  contacts: ContactModel[] = [
    {
      firstName: "Test",
      lastName: "Tester",
      occupation: "Software Engineer",
      phoneNumber: "616-442-3233",
      emailAddress: "test@test.com",
      streetAddress: "123 Awesome St"
      // birthDate: "01/01/1998"
    }
  ];

  addNewContact(newContact: ContactModel) {
    this.contacts.push(newContact);
    console.log(this.contacts);
  }
}
