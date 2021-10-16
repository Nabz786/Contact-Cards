import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AddContactComponent } from '../contact-list/add-contact/add-contact.component';
import { Contact } from '../shared/contact.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '500px',
    });
  }

}


