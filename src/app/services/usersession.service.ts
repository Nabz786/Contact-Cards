import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class UserSessionService {
	constructor() {}

	//may want to consider local storage, and some kind of session settings?
	public logOut(): void {
		window.sessionStorage.clear();
	}

	public saveToken(token: string): void {
		window.sessionStorage.removeItem("token");
		window.sessionStorage.setItem("token", token);
	}

	public getToken(): string {
		return window.sessionStorage.getItem("token");
	}

	public saveUserId(userId: number): void {
		window.sessionStorage.removeItem("userId");
		window.sessionStorage.setItem("userId", userId.toString());
	}

	public getUserId(): number {
		const userId = window.sessionStorage.getItem("userId");

		return JSON.parse(userId);
	}
}