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
import { FormsModule } from '@angular/forms';
import { ContactCardComponent } from './contact-list/home/contact-card/contact-card.component';
import { ContactStorageService } from './services/contact-storage.service';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

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
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [ContactStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
