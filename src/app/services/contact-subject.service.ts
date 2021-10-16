import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { BehaviorSubject, Observable } from "rxjs";
import { AddContactComponent } from "../contact-list/add-contact/add-contact.component";
import { Contact } from "../shared/contact.model";
import { ServiceResponse } from "../shared/ServiceResponse.model";
import { ContactsService } from "./contact-storage.service";

@Injectable({
    providedIn: "root"
})
export class ContactSubjectService {
    private contactsSubject: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);

    public contacts$: Observable<Contact[]> = this.contactsSubject.asObservable();

    constructor(private contactsService: ContactsService) {}

    public addContact(contact: Contact, dialogRef: MatDialogRef<AddContactComponent>): void {
        this.contactsService.addContact(contact)
            .subscribe((serviceResponse: ServiceResponse) => {

                if (serviceResponse.success) {
                    let currentContacts = this.contactsSubject.getValue();
                    currentContacts.push(contact);

                    dialogRef.close();

                    this.contactsSubject.next(currentContacts);
                } else {
                    // call toaster message here?
                }
            });
    }

    public getContacts() {
        this.contactsService.getContacts()
            .subscribe((serviceResponse: ServiceResponse) => {
               if (serviceResponse.success) {
                   this.contactsSubject.next(serviceResponse.returnPayload);
               } 
            });
    }
}