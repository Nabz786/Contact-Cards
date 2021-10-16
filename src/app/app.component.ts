import { Component, OnInit } from '@angular/core';
import { ContactSubjectService } from './services/contact-subject.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ContactList';
  
  constructor(private contactSubjectService: ContactSubjectService) { }

  ngOnInit(): void {
    this.contactSubjectService.getContacts();
  }
}
