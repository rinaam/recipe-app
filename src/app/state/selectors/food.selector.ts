import { recipeT } from './../../services/food.service';
import { FoodState } from './../reducers/food.reducer';
import { AppState } from './../app.state';
import { createSelector } from '@ngrx/store';

export const selectFoodState = (state: AppState) => state.food;

export const selectFoodSearch = createSelector(
  selectFoodState,
  (state: FoodState) => state.data.recipe
);

export const selectShoppingListUpdate = createSelector(
  selectFoodState,
  (state: FoodState) => {
    return Object.values(state.data.shoppingList).some(Boolean);
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
