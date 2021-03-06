import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Output() pressed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.pressed.emit();
  }

}
