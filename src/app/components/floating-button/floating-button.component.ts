import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButtonComponent {
  @Input() label: string = '';
  @Output() onClick = new EventEmitter<any>();
  constructor() {}

  onClickButton(event) {
    this.onClick.emit(event);
  }
}
