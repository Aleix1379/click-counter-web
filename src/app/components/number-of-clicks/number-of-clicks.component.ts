import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-number-of-clicks',
  templateUrl: './number-of-clicks.component.html',
  styleUrls: ['./number-of-clicks.component.scss']
})
export class NumberOfClicksComponent implements OnInit {
  numberOfClicks = 0;
  showButton = false; // only show the button if the userhas signed in
  showAuthComponent = false;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    console.warn('Get the number of clicks from the backend');
  }

  onPressed() {
    console.warn('verify used didn\'t click before 24H');

    const token = this.localStorageService.getAuthToken();
    console.warn('verify if token has expired...');
    if (token) {
      this.showButton = true;
    }

    this.numberOfClicks++;
    console.warn('update the value with the backend...');
    console.log('onPressed...');
  }

  showSignIn() {
    console.log('showSignIn...');
    this.showAuthComponent = true;
  }

  closeAuth() {
    this.showAuthComponent = false;
  }

  login(data) {
    if (data.loginOk) {
      this.showAuthComponent = false;
      this.showButton = true;
    } else {
      console.log('error login...');
    }
  }

  register(data) {
    if (data.registerOk) {
      this.showAuthComponent = false;
      this.showButton = true;
    } else {
      console.log('error register');
    }
  }

}
