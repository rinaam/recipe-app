import { recipeT } from './../../services/food.service';
import { FoodState } from './../reducers/food.reducer';
import { AppState } from './../app.state';
import { createSelector } from '@ngrx/store';

export const selectFoodState = (state: AppState) => state.food;

export const selectFoodSearch = createSelector(
  selectFoodState,
  (state: FoodState) => state.data.recipe
);

export const selectFoodSearchIsLoading = createSelector(
  selectFoodState,
  (state: FoodState) => state.loading
);

export const selectShoppingList = createSelector(
  selectFoodState,
  (state: FoodState) => {
    return state.data.shoppingList.some((item) => item.checked);
  }
);

export const selectShoppingListKey = createSelector(
  selectFoodState,
  (state: FoodState) => state.data.shoppingList
);

export const selectRecipeForModal = (recipe: recipeT) =>
  createSelector(selectFoodState, (state: FoodState) =>
    state.data.recipe.hits.find((item) => item.recipe.url === recipe.url)
  );
export const selectFavoriteForModal = (recipe: recipeT) =>
  createSelector(selectFoodState, (state: FoodState) =>
    state.data.favorite.find((item) => item.url === recipe.url)
  );

export const selectFavoritesListUpdate = createSelector(
  selectFoodState,
  (state: FoodState) => state.data.favorite
);
