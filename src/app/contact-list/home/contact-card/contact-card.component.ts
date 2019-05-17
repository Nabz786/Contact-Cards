import { Component, OnInit, Input } from '@angular/core';
import { ContactModel } from 'src/app/shared/contact.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {

  @Input() contactInfo: ContactModel;

  constructor() { }

  ngOnInit() {
  }



}
