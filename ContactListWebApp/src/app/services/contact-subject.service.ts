import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { BehaviorSubject, Observable } from "rxjs";
import { AddContactComponent } from "../contact-list/add-contact/add-contact.component";
import { Contact } from "../shared/contact.model";
import { ServiceResponse } from "../shared/ServiceResponse.model";
import { ContactsService } from "./contact.service";
import { NotificationService } from "./notification.service";

@Injectable({
    providedIn: "root"
})
export class ContactSubjectService {
    private contactsSubject: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);

    public contacts$: Observable<Contact[]> = this.contactsSubject.asObservable();

    constructor(
        private contactsService: ContactsService,
        private notificationService: NotificationService
        ) { }

    public addContact(contact: Contact, dialogRef: MatDialogRef<AddContactComponent>): void {
        this.contactsService.addContact(contact)
            .subscribe((serviceResponse: ServiceResponse) => {

                if (serviceResponse.success) {
                    let currentContacts = this.contactsSubject.getValue();

                    currentContacts.push(serviceResponse.returnResource as Contact);

                    dialogRef.close();

                    this.contactsSubject.next(currentContacts);

                } else {
                     this.notificationService.error(serviceResponse.message);
                }
            });
    }

    public updateContact(updatedContact: Contact, dialogRef: MatDialogRef<AddContactComponent>) {
        this.contactsService.updateContact(updatedContact)
            .subscribe((serviceResponse: ServiceResponse) => {
                if (serviceResponse.success) {
                    let contactToUpdateIndex = this.contactsSubject.getValue().findIndex(contact => contact.id === updatedContact.id);
                    let contacts = this.contactsSubject.getValue();

                    contacts[contactToUpdateIndex].firstName = updatedContact.firstName;
                    contacts[contactToUpdateIndex].lastName = updatedContact.lastName;

                    dialogRef.close();

                    this.contactsSubject.next(contacts);
                } else {
                    this.notificationService.error(serviceResponse.message);
                }
            })
    }

    public deleteContact(contactId: number, dialogRef: MatDialogRef<AddContactComponent>) {
        this.contactsService.deleteContact(contactId)
            .subscribe((serviceResponse: ServiceResponse) => {
                if (serviceResponse.success) {
                    let filteredContactArray = this.contactsSubject.getValue().filter(contact => contact.id !== contactId);

                    dialogRef.close();

                    this.contactsSubject.next(filteredContactArray);
                } else {
                    this.notificationService.error(serviceResponse.message);
                }
            })
    }

    public getContacts(userId: number) {
        this.contactsService.getContacts(userId)
            .subscribe((contacts: Contact[]) => {
                   this.contactsSubject.next(contacts);
            });
    }
}
