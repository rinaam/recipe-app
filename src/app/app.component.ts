import { Component } from '@angular/core';

export type headerLinksT = {
  to: string;
  title: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'food-app';
  headerLinks = [
    {
      to: 'home',
      title: 'Home',
    },
    {
      to: 'shopping-list',
      title: 'Shopping List',
    },
  ];
}
