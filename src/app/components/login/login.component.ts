import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() login = new EventEmitter();

  dataForm = {
    username: {value: '', minLength: 2, touched: false},
    password: {value: '', minLength: 8, touched: false}
  };

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  pressed() {
    this.setTouchAll();
    if (
      this.showErrorMinLength('username') ||
      this.showErrorMinLength('password')
    ) {
      const snackBarRef = this.snackBar.open('There are errors en the form', null, {verticalPosition: 'top'});
      setTimeout(() => snackBarRef.dismiss(), 3000);
    } else {
      console.warn('do login...');
      this.login.emit({loginOk: true});
    }
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
  }

}
