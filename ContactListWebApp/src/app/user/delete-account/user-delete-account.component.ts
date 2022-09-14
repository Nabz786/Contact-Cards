import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { LoginStatusSubjectService } from "src/app/services/login-status.subject.service";
import { NotificationService } from "src/app/services/notification.service";
import { UserActionsService } from "src/app/services/user-actions-service";
import { UserSessionService } from "src/app/services/usersession.service";
import { ServiceResponse } from "src/app/shared/ServiceResponse.model";

@Component({
	selector: "user-delete-account",
	templateUrl: "./user-delete-account.component.html"
})
export class UserDeleteAccountComponent {

	constructor(
		public dialogRef: MatDialogRef<UserDeleteAccountComponent>,
		private userActionsService: UserActionsService,
		private userSessionService: UserSessionService,
		private notificationService: NotificationService,
		private loginStatusSubjectService: LoginStatusSubjectService
	) {}

	public deleteAccount(): void {
		const userId = this.userSessionService.getUserId();

		this.userActionsService.deleteUser(userId)
			.subscribe((deleteUserResponse: ServiceResponse) => {
				if (deleteUserResponse.success) {
					this.dialogRef.close();
					this.userSessionService.logOut();
					this.loginStatusSubjectService.setLoginStatus(false);
				} else {
					this.notificationService.generalError();
				}
			});
	}
}