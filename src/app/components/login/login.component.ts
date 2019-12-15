import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {TokensService} from '../../services/tokens/tokens.service';

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

  constructor(private snackBar: MatSnackBar,
              private tokensService: TokensService) {
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
      this.tokensService.createToken(
        {
          username: this.dataForm.username.value,
          password: this.dataForm.password.value
        }
      )
        .subscribe(
          data => {
            this.login.emit({loginOk: true, token: data});
          },
          error => {
            console.log('error login...');
            console.log(error);
            this.login.emit({loginOk: false, error});
          }
        );
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
