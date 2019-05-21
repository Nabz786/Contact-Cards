import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ContactStorageService } from "src/app/services/contact-storage.service";
import { ContactModel } from "src/app/shared/contact.model";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.css"]
})
export class AddContactComponent implements OnInit {
  contactDetailsForm: FormGroup;

  constructor(
    private contactStorServ: ContactStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.contactDetailsForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phoneNum: [
        "",
        [
          Validators.required
          // Validators.pattern('((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}')
        ]
      ],
      emailAddr: ["", [Validators.required, Validators.email]],
      streetAddr: [""],
      occupation: [""],
      birthDate: ["", [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.contactDetailsForm);
    this.contactStorServ.addNewContact(
      new ContactModel(
        this.contactDetailsForm.value.firstName,
        this.contactDetailsForm.value.lastName
      )
    );
  }

  get firstName() {
    return this.contactDetailsForm.get("firstName");
  }

  get lastName() {
    return this.contactDetailsForm.get("lastName");
  }

  get phoneNum() {
    return this.contactDetailsForm.get("phoneNum");
  }

  get emailAddr() {
    return this.contactDetailsForm.get("emailAddr");
  }

  get streetAddr() {
    return this.contactDetailsForm.get("streetAddr");
  }

  get occupation() {
    return this.contactDetailsForm.get("occupation");
  }

  get birthDate() {
    return this.contactDetailsForm.get("birthDate");
  }
}
