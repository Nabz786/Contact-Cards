import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "src/app/services/notification.service";
import { UserActionsService } from "src/app/services/user-actions-service";
import { ServiceResponse } from "src/app/shared/ServiceResponse.model";

@Component({
	selector: "forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
	@Output() toggleForm = new EventEmitter<boolean>();	

	public forgotPasswordForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private userActionsService: UserActionsService,
		private notificationService: NotificationService) 
	{ }

	ngOnInit(): void {
		this.initializeForgotPasswordForm();
	}

	public showLoginForm(): void {
		this.toggleForm.emit(true);
	}

	public submitForgotPasswordForm(event: any): void {
		event.preventDefault();

		const email = this.forgotPasswordForm.controls["email"].value;

		console.log(email);

		this.userActionsService.forgotPassword(email)
		.subscribe((forgotPasswordResponse: ServiceResponse) => {
			console.log(forgotPasswordResponse);

			if (forgotPasswordResponse.success) {
				this.notificationService.notify(forgotPasswordResponse.message);
			}

			this.notificationService.generalError();
		});
	}

	private initializeForgotPasswordForm(): void {
		this.forgotPasswordForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]]
		})
	}
}