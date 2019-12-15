import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {CounterService} from '../../services/counter/counter.service';
import {MatSnackBar} from '@angular/material';
import {EventsService} from '../../services/events/events.service';

@Component({
  selector: 'app-number-of-clicks',
  templateUrl: './number-of-clicks.component.html',
  styleUrls: ['./number-of-clicks.component.scss']
})
export class NumberOfClicksComponent implements OnInit {
  numberOfClicks = 0;
  showButton = false; // only show the button if the userhas signed in
  showAuthComponent = false;
  username = '';

  constructor(private localStorageService: LocalStorageService,
              private counterService: CounterService,
              private snackBar: MatSnackBar,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    const token = this.localStorageService.getAuthToken();
    if (token) {
      this.showButton = true;
    }

    this.counterService.getCounter().subscribe(
      data => this.numberOfClicks = data.value,
      error => {
        const errorMessage = 'Error downloading number of clicks';
        console.log(errorMessage);
        console.log(error);
        this.showSnackBar(errorMessage);
      }
    );
  }

  private showSnackBar(errorMessage: string) {
    const snackBarRef = this.snackBar.open(errorMessage, null, {verticalPosition: 'top'});
    setTimeout(() => snackBarRef.dismiss(), 3000);
  }

  onPressed() {
    this.counterService.increaseCounter().subscribe(
      data => this.numberOfClicks = data.value,
      error => this.showSnackBar(error.error.message)
    );
  }

  showSignIn() {
    this.showAuthComponent = true;
  }

  closeAuth() {
    this.showAuthComponent = false;
  }

  login(data) {
    if (data.loginOk) {
      this.showAuthComponent = false;
      this.showButton = true;
      this.localStorageService.setAuthToken(data.token);
    } else {
      this.showSnackBar('Username or password incorrect');
    }
  }

  register(data) {
    if (data.registerOk) {
      this.eventsService.publish('user:registered', data.username);
    } else {
      if (data.error.error.errorCode === 11000) {
        this.showSnackBar('Username already exists');
      } else {
        this.showSnackBar('Error registering new user');
      }
    }
  }

}
