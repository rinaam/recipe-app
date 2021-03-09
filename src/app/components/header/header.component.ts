import { Component, Input } from '@angular/core';
import { headerLinksT } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() headerLinks: headerLinksT[];

  constructor(private router: Router) {}

  getSearchValue(e): void {
    this.router.navigate(['search', e.target.value]);
  }
}
