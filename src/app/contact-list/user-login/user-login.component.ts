import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContactSubjectService } from 'src/app/services/contact-subject.service';
import { LoginStatusSubjectService } from 'src/app/services/login-status.subject.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  animations: [
      trigger('showRegisterForm', [
          transition('hideForm => showForm', [
            animate("1s ease", keyframes([
                style({transform: 'translateX(0%)', opacity: '1', offset: 0}),
                style({transform: 'translateX(-150%)', opacity: '0', offset: .5}),
                style({transform: 'translateX(100%)', opacity: '0', offset: .75}),
                style({transform: 'translateX(0%)', opacity: '1', offset: 1}),
              ])),
          ]),
          transition('showForm => hideForm', [
            animate("1s ease", keyframes([
                style({transform: 'translateX(0%)', opacity: '1', offset: 0}),
                style({transform: 'translateX(150%)', opacity: '0', offset: .5}),
                style({transform: 'translateX(-100%)', opacity: '0', offset: .75}),
                style({transform: 'translateX(0%)', opacity: '1', offset: 1}),
              ])),
          ]),
      ]),
      trigger('showLoginPage', [
          transition(':enter', [
            style({transform: 'translateY(-100%)'}),
            animate("500ms ease", style({transform: 'translateY(0%)'}))
          ]),
          transition(':leave', [
            style({transform: 'translateY(0%)'}),
            animate("500ms ease", style({transform: 'translateY(-100%)'}))
          ])
      ])
  ]
})
export class UserLoginComponent implements OnInit {
    public isLoggedIn: boolean = false;
    public isLoading: boolean = false;
    public showRegisterForm: boolean = false;
    public loginForm: FormGroup;

    public $isLoggedIn: Observable<boolean>;

    @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

    @Input() logoutEvent: boolean = false; 

    constructor(
        private authenticationService: AuthenticationService,
        private userSessionService: UserSessionService,
        private contactSubjectService: ContactSubjectService,
        private formBuilder: FormBuilder,
        private loginStatusSubjectService: LoginStatusSubjectService) { }


    public ngOnInit(): void {
        this.initializeLoginForm();
        this.$isLoggedIn = this.loginStatusSubjectService.$loginStatus
            .pipe(
                tap((loginStatus: boolean) => {
                    if (!loginStatus) {
                        this.isLoading = false;
                        this.isLoggedIn = false;
                        this.showRegisterForm = false;
                    }
                })
            )
    }

    public toggleRegisterForm(): void {
        this.showRegisterForm = !this.showRegisterForm;

        this.loginForm.reset();

        //Resets the submitted property of the form to false to remove the warning messages
        this.formDirective.resetForm()
    }

    public handleSubmit(): void {
        const formValues = this.loginForm.getRawValue();

        if (!formValues.password || !formValues.username) {
            return;
        }
 
        this.isLoading = true;

        if (this.showRegisterForm) {
            this.registerUser(formValues);
            return;
        }

        this.loginUser(formValues);
    }

    private initializeLoginForm(): void {
        this.loginForm = this.formBuilder.group({
            username: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    private registerUser(formValues: any): void {
        this.authenticationService.register(formValues.username, formValues.password)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.isLoading = false;
                    return throwError(error);
                })
            )
            .subscribe((registerResponse: any) => {
                this.handleAuthenticationResponse(registerResponse);
            })
    }

    private loginUser(formValues: any): void {
        this.authenticationService.login(formValues.username, formValues.password)
            .pipe(
                catchError((error: HttpErrorResponse) => {

                    //check the error status code, if it's a 401 unauthorized show bad login message
                    this.isLoading = false;
                    return throwError(error);
                })
            )
            .subscribe((loginResponse: any) => {
                this.handleAuthenticationResponse(loginResponse);
            });    
    }

    private handleAuthenticationResponse(loginResponse: any): void {
        this.isLoading = false;

        if (loginResponse.success) {
            this.userSessionService.saveToken(loginResponse.token);
            this.userSessionService.saveUserId(loginResponse.userId);

            this.contactSubjectService.getContacts(loginResponse.userId);

            this.isLoggedIn = true;


            this.loginStatusSubjectService.setLoginStatus(true);
            this.loginForm.reset();
        }

        //show error message 
    }
}
