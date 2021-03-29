import { recipeT } from './../../services/food.service';
import { createAction, props } from '@ngrx/store';
import { recipeSearchT } from '../../services/food.service';

export const getRecipeSearchAction = createAction(
  '[Recipe Search] Get Recipe Search',
  props<{ query: string }>()
);
export const getRecipeSearchActionSuccess = createAction(
  '[Recipe Search] Get Recipe Search Success',
  props<{ recipe: recipeSearchT }>()
);
export const getRecipeSearchActionError = createAction(
  '[Recipe Search] Get Recipe Search Error'
);

export const updateShoppingList = createAction(
  '[Shoping List] Get Shopping List',
  props<{
    checked: boolean;
    recipe: recipeT;
    ingredient: string;
  }>()
);

export const deleteMarkedItem = createAction(
  '[Deletion] Delete Marked Item',
  props<{ ingridient: string; recipe?: recipeT }>()
);

export const updateFavoritesList = createAction(
  '[Favorites List] Get Favorites List',
  props<{ recipe: recipeT }>()
);
