import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ContactSubjectService } from "src/app/services/contact-subject.service";
import { Contact } from "src/app/shared/contact.model";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.css"],
})
export class AddContactComponent implements OnInit {
  contactDetailsForm: FormGroup;

  constructor(
    private contactSubjectService: ContactSubjectService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact
  ) {}

  ngOnInit() {
    this.contactDetailsForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      // phoneNum: [
      //   "",
      //   [
      //     Validators.required
      //     // Validators.pattern('((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}')
      //   ]
      // ],
      // emailAddr: ["", [Validators.required, Validators.email]],
      // streetAddr: [""],
      // occupation: [""],
      //birthDate: ["", [Validators.required]]
    });
  }

  onSubmit() {
    let newContact = this.contactDetailsForm.getRawValue() as Contact;

    this.contactSubjectService.addContact(newContact, this.dialogRef);
  }

  private onNoClick(): void {
    this.dialogRef.close();
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
