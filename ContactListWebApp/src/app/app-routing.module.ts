import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./contact-list/home/home.component";
import { NotFoundComponent } from "./contact-list/not-found/not-found.component";
import { AddContactComponent } from "./contact-list/add-contact/add-contact.component";

const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: "home", component: HomeComponent},
  {path: "addContact", component: AddContactComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
