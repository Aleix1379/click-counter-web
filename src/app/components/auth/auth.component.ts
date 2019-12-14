import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Output() hide = new EventEmitter();
  @Output() login = new EventEmitter();
  @Output() register = new EventEmitter();

  faTimes = faTimes;

  currentTab: 'register' | 'login' = 'login';

  constructor() {
  }

  ngOnInit() {
  }

  hideAuth() {
    this.hide.emit();
  }

  setTab(tabName: 'register' | 'login') {
    this.currentTab = tabName;
  }

  loginPressed(data) {
    this.login.emit(data);
  }

  registerPressed(data) {
    this.register.emit(data);
  }

}
