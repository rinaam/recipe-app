import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Output() onClick = new EventEmitter<any>();

  onClickButton(event) {
    this.onClick.emit(event);
  }
}
