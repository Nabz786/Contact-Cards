import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ContactSubjectService } from "src/app/services/contact-subject.service";
import { Contact } from "src/app/shared/contact.model";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

	public $contacts: Observable<Contact[]>;

	constructor(private contactsSubjectService: ContactSubjectService) { }

	ngOnInit() {
		this.$contacts = this.contactsSubjectService.contacts$;
	}
}