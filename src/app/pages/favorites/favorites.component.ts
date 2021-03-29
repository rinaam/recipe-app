import { recipeT } from './../../services/food.service';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateFavoritesList } from './../../state/actions/food.action';
import {
  selectFavoritesListUpdate,
  selectFavoriteForModal,
} from './../../state/selectors/food.selector';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  favorites$: Observable<recipeT[]> = this.store.pipe(
    select(selectFavoritesListUpdate)
  );
  isOpen: boolean = false;

  selectedRecipe$: Observable<recipeT>;
  constructor(private store: Store) {}

  openModal(recipe: recipeT): void {
    this.isOpen = true;
    this.selectedRecipe$ = this.store.pipe(
      select(selectFavoriteForModal(recipe))
    );
  }

  closeModal(): void {
    this.isOpen = false;
  }

  roundUpNumber(num): number {
    return Math.round(num * 100) / 100;
  }

  getRecipeUrl(url): string {
    return `https://www.facebook.com/plugins/share_button.php?href=${url}&layout=button_count&size=small&width=83&height=20&appId`;
  }

  handleFavorites(recipe): void {
    this.store.dispatch(updateFavoritesList({ recipe }));
  }
  isEmpty(obj): boolean {
    return Object.keys(obj).length === 0;
  }
}
