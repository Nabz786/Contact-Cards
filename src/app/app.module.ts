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

import { environment } from '../environments/environment';
import { ContactsService } from './services/contact.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddContactComponent,
    HomeComponent,
    NotFoundComponent,
    ContactCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
