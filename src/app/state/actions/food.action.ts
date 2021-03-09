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
  props<{ value: string; checked: boolean }>()
);

export const deleteMarkedItem = createAction(
  '[Deletion] Delete Marked Item',
  props<{ item: string }>()
);
