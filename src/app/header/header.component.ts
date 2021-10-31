import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddContactComponent } from '../contact-list/add-contact/add-contact.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(public dialog: MatDialog) { }

    openDialog(): void {
        this.dialog.open(AddContactComponent, { width: '500px', data: { isEdit: false } });
    }

}


