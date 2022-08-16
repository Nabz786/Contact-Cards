import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class LoginStatusSubjectService {
	private loginStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

	public $loginStatus = this.loginStatusSubject.asObservable();

	constructor() { }

	public setLoginStatus(isLoggedIn: boolean) {
		this.loginStatusSubject.next(isLoggedIn);
	}
}