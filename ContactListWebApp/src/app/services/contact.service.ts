import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Contact } from "../shared/contact.model";
import { ServiceResponse } from "../shared/ServiceResponse.model";

@Injectable({
	providedIn: "root"
})
export class ContactsService {
	private baseUrl = environment.contactsApiUrl;

	constructor(private httpClient: HttpClient) { }

	public addContact(contact: Contact) {
		const finalUrl = this.baseUrl + "/addContact";

		return this.httpClient.post<ServiceResponse>(finalUrl, contact);
	}

	public getContacts(userId: number) {
		const finalUrl = this.baseUrl + "/getContacts";

		return this.httpClient.get<Contact[]>(finalUrl + `/${userId}`);
	}

	public updateContact(updatedContact: Contact) {
		const finalUrl = this.baseUrl + "/updateContact";

		return this.httpClient.put<ServiceResponse>(finalUrl, updatedContact);
	}

	public deleteContact(contactId: number) {
		const finalUrl = this.baseUrl + "/deleteContact";

		return this.httpClient.delete<ServiceResponse>(finalUrl + `/${contactId}`);
	}
}