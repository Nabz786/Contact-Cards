import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserSessionService } from "src/app/services/usersession.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

	constructor(private userSessionService: UserSessionService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log('token, ', this.userSessionService.getToken());
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.userSessionService.getToken()}`
			}
		});

		return next.handle(request);
	}
	
}