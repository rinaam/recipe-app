import { Component } from '@angular/core';
import { headerLinks } from './utils/constants';
export type headerLinksT = {
  title: string;
  to: string;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'food-app';
  headerLinks = headerLinks;
}
