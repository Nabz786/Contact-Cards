import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ContactSubjectService } from "src/app/services/contact-subject.service";
import { UserSessionService } from "src/app/services/usersession.service";
import { Contact } from "src/app/shared/contact.model";

@Component({
    selector: "app-add-contact",
    templateUrl: "./add-contact.component.html",
    styleUrls: ["./add-contact.component.css"],
})
export class AddContactComponent implements OnInit {
    public contactDetailsForm: FormGroup;
    public modalHeaderText: string = "";
    public modalPrimaryButtonText: string = "";

    constructor(
        private contactSubjectService: ContactSubjectService,
        private userSessionService: UserSessionService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AddContactComponent>,
        @Inject(MAT_DIALOG_DATA) public modalParameters: { isEdit: boolean; contact: Contact }
    ) { }

    ngOnInit() {
        this.setupModalHeaderText();
        this.setupModalForm(this.modalParameters.contact);
    }

    public deleteContact() {
        this.contactSubjectService.deleteContact(
            this.modalParameters.contact.id,
            this.dialogRef
        );
    }

    get firstName() {
        return this.contactDetailsForm.get("firstName");
    }

    get lastName() {
        return this.contactDetailsForm.get("lastName");
    }

    get email() {
        return this.contactDetailsForm.get("emailAddress");
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

    public onSubmit() {
        const newContact = this.contactDetailsForm.getRawValue() as Contact;

        if (newContact.id !== 0) {
            this.contactSubjectService.updateContact(newContact, this.dialogRef);
            return;
        }

        newContact.userId = this.userSessionService.getUserId();
        this.contactSubjectService.addContact(newContact, this.dialogRef);
    }

    private setupModalHeaderText(): void {
        if (this.modalParameters.isEdit) {
            this.modalHeaderText = "Edit Contact";
            this.modalPrimaryButtonText = "Update Contact";
            return;
        }

        this.modalHeaderText = "Add Contact";
        this.modalPrimaryButtonText = "Add Contact";
    }

    private setupModalForm(contact: Contact): void {
        this.contactDetailsForm = this.fb.group({
            id: 0,
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            phoneNumber: [""],
            emailAddress: ["", [Validators.email]],
            streetAddress: [""],
            occupation: [""],
        });

        if (contact) {
            this.contactDetailsForm.patchValue(contact);
        }
    }
}
