import {NgModule} from '@angular/core';
import {NumberOfClicksComponent} from './number-of-clicks/number-of-clicks.component';
import {ButtonComponent} from './button/button.component';
import {Ng2OdometerModule} from 'ng2-odometer';
import {CommonModule} from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AuthComponent,
    ButtonComponent,
    LoginComponent,
    NumberOfClicksComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    Ng2OdometerModule,
  ],
  exports: [
    NumberOfClicksComponent,
  ]
})
export class ComponentsModule {
}
