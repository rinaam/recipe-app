import { updateFavoritesList } from './../../state/actions/food.action';
import {
  selectRecipeForModal,
  selectFavoritesListUpdate,
} from './../../state/selectors/food.selector';
import { recipeT } from './../../services/food.service';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectFoodSearch,
  selectFoodSearchIsLoading,
} from '../../state/selectors/food.selector';
import { getRecipeSearchAction } from '../../state/actions/food.action';
import { recipeSearchT, recipeSearchHitT } from '../../services/food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  recipes$: Observable<recipeSearchT> = this.store.pipe(
    select(selectFoodSearch)
  );
  recipesIsLoading$: Observable<boolean> = this.store.pipe(
    select(selectFoodSearchIsLoading)
  );
  favorites$: Observable<recipeT[]> = this.store.pipe(
    select(selectFavoritesListUpdate)
  );
  isOpen: boolean = false;

  selectedRecipe$: Observable<recipeSearchHitT>;

  query: string = '';

  constructor(private store: Store, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.store.dispatch(getRecipeSearchAction({ query: params.query }));
      this.query = params.query;
    });
  }

  openModal(recipe: recipeT): void {
    this.isOpen = true;
    this.selectedRecipe$ = this.store.pipe(
      select(selectRecipeForModal(recipe))
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

  isFavorite(recipe: recipeT, favorites: recipeT[]): boolean {
    return favorites.some((favorite) => favorite.url === recipe.url);
  }
}
