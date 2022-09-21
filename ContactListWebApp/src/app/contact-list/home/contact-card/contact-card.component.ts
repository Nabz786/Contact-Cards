import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Contact } from "src/app/shared/contact.model";
import { AddContactComponent } from "../../add-contact/add-contact.component";

@Component({
	selector: "app-contact-card",
	templateUrl: "./contact-card.component.html",
	styleUrls: ["./contact-card.component.css"]
})
export class ContactCardComponent implements OnInit {
	@Input() contact: Contact;

	constructor(private dialog: MatDialog) { }

	ngOnInit() { }

	public editContact(): void {
		this.dialog.open(AddContactComponent, { width: "500px", data: { isEdit: true, contact: this.contact } });
	}
}