import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { AddContactComponent } from './contact-list/add-contact/add-contact.component';
import { HomeComponent } from './contact-list/home/home.component';
import { NotFoundComponent } from './contact-list/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactCardComponent } from './contact-list/home/contact-card/contact-card.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserLoginComponent } from './contact-list/user-login/user-login.component';
import { AuthenticationInterceptor } from './shared/Interceptors/authentication.interceptor';
import { UserDeleteAccountComponent } from './user/delete-account/user-delete-account.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		AddContactComponent,
		HomeComponent,
		NotFoundComponent,
		ContactCardComponent,
		UserLoginComponent,
		UserDeleteAccountComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule
	],
	providers: [ 
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationInterceptor,
			multi: true,
		}
	],
	bootstrap: [AppComponent],
	entryComponents: [UserDeleteAccountComponent]
})
export class AppModule { }
