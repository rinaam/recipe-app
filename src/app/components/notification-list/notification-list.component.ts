import { Component, Input } from '@angular/core';
import { ingridientNotificationT } from '../card/card.component';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent {
  @Input() itemArray: ingridientNotificationT[] = [];
}
