import { Component, OnInit } from '@angular/core';
import { ContactStorageService } from 'src/app/services/contact-storage.service';
import { ContactModel } from 'src/app/shared/contact.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contactArr: ContactModel[] = []

  constructor(private contactService: ContactStorageService) { }

  ngOnInit() {
    this.contactArr = this.contactService.contacts;
  }
}
