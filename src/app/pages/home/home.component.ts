import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../services/events/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username = '';

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.eventsService.subscribe('user:logined', username => {
      this.username = username;
    });
  }

  getCurrentUsername() {
    if (this.username) {
      return this.username;
    }
  }

}
