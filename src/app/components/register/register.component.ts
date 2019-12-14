import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() register = new EventEmitter();

  dataForm = {
    username: {value: '', minLength: 2, touched: false},
    password: {value: '', minLength: 8, touched: false},
    repeatPassword: {value: '', minLength: 8, touched: false}
  };

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  pressed() {
    this.setTouchAll();
    if (
      this.showErrorPasswordDoNotMatch() ||
      this.showErrorMinLength('username') ||
      this.showErrorMinLength('password') ||
      this.showErrorMinLength('repeatPassword')
    ) {
      const snackBarRef = this.snackBar.open('There are errors en the form', null, {verticalPosition: 'top'});
      setTimeout(() => snackBarRef.dismiss(), 3000);
    } else {
      console.warn('do register...');
      this.register.emit({registerOk: true});
    }
  }

  showErrorPasswordDoNotMatch() {
    return this.dataForm.repeatPassword.value.length > 0 &&
      this.dataForm.repeatPassword.value !== this.dataForm.password.value;
  }

  showErrorMinLength(property: 'username' | 'password' | 'repeatPassword') {
    return this.dataForm[property].touched && this.dataForm[property].value.length < this.dataForm[property].minLength;
  }

  input(property: 'username' | 'password' | 'repeatPassword') {
    this.dataForm[property].touched = true;
  }

  setTouchAll() {
    this.dataForm.username.touched = true;
    this.dataForm.password.touched = true;
    this.dataForm.repeatPassword.touched = true;
  }
}
