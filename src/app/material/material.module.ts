import { NgModule } from '@angular/core';
import {MatButtonModule,  MatToolbarModule, MatIconModule, MatOptionModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatCardModule, MatDialogModule} from '@angular/material';

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
  MatDialogModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
