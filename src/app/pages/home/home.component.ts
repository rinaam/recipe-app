import { Component } from '@angular/core';
import { mainCategories } from '../../utils/constants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isRecording: boolean = false;
  mainCategories = mainCategories;

  constructor(private router: Router) {}

  handleClick(category: string): void {
    this.router.navigate(['search', category]);
  }
}
