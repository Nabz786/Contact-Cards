import { NgModule } from "@angular/core";
import {
	MatButtonModule,
	MatToolbarModule,
	MatIconModule,
	MatOptionModule,
	MatSelectModule,
	MatInputModule,
	MatFormFieldModule,
	MatCardModule,
	MatDialogModule,
	MatProgressBarModule,
	MatSnackBarModule
} from "@angular/material";

const MaterialComponents = [
	MatButtonModule,
	MatToolbarModule,
	MatIconModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatOptionModule,
	MatCardModule,
	MatInputModule,
	MatFormFieldModule,
	MatDialogModule,
	MatProgressBarModule,
	MatSnackBarModule
];

@NgModule({
	imports: [MaterialComponents],
	exports: [MaterialComponents]
})
export class MaterialModule { }