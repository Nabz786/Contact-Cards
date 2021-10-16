import { HttpClient, HttpParams } from "@angular/common/http";
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
        let finalUrl = this.baseUrl + "/add";

        return this.httpClient.post<ServiceResponse>(finalUrl, contact);
    }

    public getContacts() {
      let finalUrl = this.baseUrl + "/getContacts";

      return this.httpClient.get<ServiceResponse>(finalUrl);
    }
}