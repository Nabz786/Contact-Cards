import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ServiceResponse } from "../shared/ServiceResponse.model";

@Injectable({
	providedIn: "root"
})
export class UserActionsService {
	private baseUrl = environment.apiBaseUrl + "userActions"
	
	constructor(private httpClient: HttpClient) { }

	public deleteUser(userId: number): Observable<ServiceResponse> {
		let finalUrl = this.baseUrl + "/deleteUser";

		return this.httpClient.delete<ServiceResponse>(finalUrl + `/${userId}`);
	}
}