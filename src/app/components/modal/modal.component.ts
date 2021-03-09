import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Output() onClose = new EventEmitter<boolean>();

  constructor() {}

  handleButton(): void {
    this.onClose.emit();
  }
}
