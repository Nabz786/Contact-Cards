import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	private baseUrl = environment.authenticationApiUrl;

	constructor(private httpClient: HttpClient) { }

	public register(email: string, password: string): Observable<any> {
		const finalUrl = this.baseUrl + "/register";
		return this.httpClient.post(finalUrl, { email, password });
	}

	public login(email: string, password: string): Observable<any> {
		const finalUrl = this.baseUrl + "/login";
		return this.httpClient.post(finalUrl, {email, password});
	}
}