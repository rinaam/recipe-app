import { updateShoppingList } from './../../state/actions/food.action';
import { selectShoppingListUpdate } from './../../state/selectors/food.selector';
import { Observable } from 'rxjs';
import { ingredientT } from './../../services/food.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() ingridients: ingredientT[] = [];
  @Input() recipe: string = '';
  @Input() yield: number = 0;
  @Input() url: string = '';
  @Input() shareUrl: string = '';
  @Output() onModalClick = new EventEmitter<boolean>();
  showIngridients: boolean = false;

  showButton$: Observable<Boolean> = this.store.pipe(
    select(selectShoppingListUpdate)
  );

  constructor(private store: Store, private router: Router) {}

  navigateToRecipe(): void {
    window.open(this.url, '_blank');
  }

  getIngridients(): void {
    this.showIngridients = !this.showIngridients;
  }

  onChange(value: string, event: any): void {
    this.store.dispatch(
      updateShoppingList({ value, checked: event.target.checked })
    );
  }

  navigateToShoppingList(): void {
    this.router.navigate(['shopping-list']);
  }
  openModal(): void {
    this.onModalClick.emit();
  }
}
