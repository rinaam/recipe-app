import { updateShoppingList } from './../../state/actions/food.action';
import { selectShoppingList } from './../../state/selectors/food.selector';
import { Observable } from 'rxjs';
import { ingredientT, recipeT } from './../../services/food.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() ingridients: ingredientT[] = [];
  @Input() recipe: recipeT;
  @Input() yield: number = 0;
  @Input() url: string = '';
  @Input() shareUrl: string = '';
  @Input() isFavorite: boolean = false;
  @Output() onModalClick = new EventEmitter<boolean>();
  @Output() onFavoriteClick = new EventEmitter<boolean>();
  showIngridients: boolean = false;
  solidHeart = solidHeart;
  regularHeart = regularHeart;

  showButton$: Observable<Boolean> = this.store.pipe(
    select(selectShoppingList)
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
      updateShoppingList({
        ingredient: value,
        checked: event.target.checked,
        recipe: this.recipe,
      })
    );
  }

  navigateToShoppingList(): void {
    this.router.navigate(['shopping-list']);
  }
  openModal(): void {
    this.onModalClick.emit();
  }

  saveFavorite(): void {
    this.onFavoriteClick.emit();
  }
}
