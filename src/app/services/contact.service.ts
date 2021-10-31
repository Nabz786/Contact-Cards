import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contact } from "../shared/contact.model";
import { ServiceResponse } from "../shared/ServiceResponse.model";

@Injectable({
    providedIn: "root"
})
export class ContactsService {
    private baseUrl = "http://localhost:57238/contacts"

    constructor(private httpClient: HttpClient) { }

    public addContact(contact: Contact) {
        let finalUrl = this.baseUrl + "/addContact";

        return this.httpClient.post<ServiceResponse>(finalUrl, contact);
    }

    public getContacts() {
        let finalUrl = this.baseUrl + "/getContacts";

        return this.httpClient.get<Contact[]>(finalUrl);
    }

    public updateContact(updatedContact: Contact) {
        let finalUrl = this.baseUrl + "/updateContact";

        return this.httpClient.put<ServiceResponse>(finalUrl, updatedContact);
    }

    public deleteContact(contactId: number) {
        let finalUrl = this.baseUrl + "/deleteContact";

        return this.httpClient.delete<ServiceResponse>(finalUrl + `/${contactId}`);
    }
}