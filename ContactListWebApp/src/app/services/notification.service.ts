import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({
	providedIn: "root"
})
export class NotificationService {

	constructor(private snackBar: MatSnackBar) { }

	public error(message: string): void {
		this.snackBar.open(message, "", {
			duration: 5000,
			verticalPosition: "top",
			horizontalPosition: "right",
			panelClass: "notification-error"
		});
	}

	public generalError(): void {
		this.snackBar.open("An error occurred, please try again.", "", {
			duration: 5000,
			verticalPosition: "top",
			horizontalPosition: "right",
			panelClass: "notification-error"
		});
	}
}
