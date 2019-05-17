import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactStorageService } from 'src/app/services/contact-storage.service';
import { ContactModel } from 'src/app/shared/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  @ViewChild('contactDetailsForm') contactForm: NgForm;

  constructor(private contactStorServ: ContactStorageService) { }

  ngOnInit() {
  }

  onSubmit(info: NgForm) {
     this.contactStorServ.addNewContact(
       new ContactModel(info.value.firstName, info.value.lastName));
  }

  

}
