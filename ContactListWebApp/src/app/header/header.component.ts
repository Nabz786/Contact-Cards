import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddContactComponent } from '../contact-list/add-contact/add-contact.component';
import { LoginStatusSubjectService } from '../services/login-status.subject.service';
import { UserSessionService } from '../services/usersession.service';
import { UserDeleteAccountComponent } from '../user/delete-account/user-delete-account.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(
        public dialog: MatDialog,
        private loginStatusSubjectService: LoginStatusSubjectService,
        private userSessionService: UserSessionService) { }

    public openDialog(): void {
        this.dialog.open(AddContactComponent, { width: '500px', data: { isEdit: false } });
    }

    public logout(): void {
        this.loginStatusSubjectService.setLoginStatus(false);
        this.userSessionService.logOut();
    }

    public deleteAccount(): void {
        this.dialog.open(UserDeleteAccountComponent, { width: '500px'});
    }
}


