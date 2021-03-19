import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  userInput: string = '';
  faMicrophone = faMicrophone;
  @Output() onMicrophoneClick = new EventEmitter<any>();

  onClickButton() {
    this.onMicrophoneClick.emit();
  }
  constructor(private router: Router) {}

  handleClick(): void {
    this.router.navigate(['search', this.userInput]);
  }
}
