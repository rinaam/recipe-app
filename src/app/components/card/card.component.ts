import {
  updateShoppingList,
  deleteMarkedItem,
} from './../../state/actions/food.action';
import { ingredientT, recipeT } from './../../services/food.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export type ingridientNotificationT = {
  message: string;
  state: 'removed from shopping list' | 'added to shopping list';
};

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
  selectedIngridients: ingridientNotificationT[] = [];
  showToast: boolean = false;
  removeFirstElementInterval: any;

  constructor(private store: Store) {}

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
    const isSelected = event.target.checked;

    this.selectedIngridients.push({
      message: value,
      state: isSelected
        ? 'added to shopping list'
        : 'removed from shopping list',
    });

    if (event.target.checked === false) {
      this.store.dispatch(deleteMarkedItem({ ingridient: value }));
    }
    this.showToast = true;
    this.handleNotifications();
  }

  openModal(): void {
    this.onModalClick.emit();
  }

  saveFavorite(): void {
    this.onFavoriteClick.emit();
  }

  handleNotifications(): void {
    if (this.removeFirstElementInterval) {
      clearInterval(this.removeFirstElementInterval);
    }
    this.removeFirstElementInterval = setInterval(() => {
      this.selectedIngridients.shift();
      if (this.selectedIngridients.length === 0) {
        clearInterval(this.removeFirstElementInterval);
      }
    }, 1000);
  }
}
