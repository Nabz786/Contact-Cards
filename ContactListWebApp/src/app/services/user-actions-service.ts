import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ServiceResponse } from "../shared/ServiceResponse.model";

@Injectable({
	providedIn: "root"
})
export class UserActionsService {
	private baseUrl = environment.apiBaseUrl + "userActions";
	private httpClient: HttpClient;

	constructor(httpBackend: HttpBackend) { 
		this.httpClient = new HttpClient(httpBackend);
	}

	public deleteUser(userId: number): Observable<ServiceResponse> {
		const finalUrl = this.baseUrl + "/deleteUser";

		return this.httpClient.delete<ServiceResponse>(finalUrl + `/${userId}`);
	}

	public forgotPassword(email: string): Observable<ServiceResponse> {
		const finalUrl = this.baseUrl + "/resetPassword";
		let requestBody = new FormData();
		requestBody.append("email", email);

		return this.httpClient.post<ServiceResponse>(finalUrl, requestBody);
	}
}
