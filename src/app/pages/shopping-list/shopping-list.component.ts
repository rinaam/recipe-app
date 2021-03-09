import { selectShoppingListKey } from './../../state/selectors/food.selector';
import { deleteMarkedItem } from '../../state/actions/food.action';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  shoppingList$: Observable<any> = this.store.pipe(
    select(selectShoppingListKey)
  );
  constructor(private store: Store) {}

  isEmpty(obj): boolean {
    return Object.keys(obj).length === 0;
  }
  deleteItem(item: string): void {
    this.store.dispatch(deleteMarkedItem({ item }));
  }
}
