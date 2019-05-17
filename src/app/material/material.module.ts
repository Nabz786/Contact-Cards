import { NgModule } from '@angular/core';
import {MatButtonModule, MatToolbar, MatToolbarModule, MatIconModule, MatFormField, MatInput, MatSelect, MatOptionModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatCardModule, MatCardAvatar} from '@angular/material';

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
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
