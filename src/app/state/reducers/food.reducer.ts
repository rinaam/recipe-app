import { recipeSearchT } from './../../services/food.service';
import { Action, createReducer, on } from '@ngrx/store';
import * as FoodActions from '../actions/food.action';

export interface FoodState {
  loading: boolean;
  error: boolean;
  data: {
    recipe: recipeSearchT | null;
    shoppingList: {
      [key: string]: boolean;
    };
  };
}

export const initialState: FoodState = {
  loading: false,
  error: false,
  data: {
    recipe: null,
    shoppingList: {},
  },
};

const reducer = createReducer(
  initialState,
  on(FoodActions.getRecipeSearchAction, (state) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(FoodActions.getRecipeSearchActionSuccess, (state, { recipe }) => ({
    ...state,
    loading: false,
    error: false,
    data: {
      ...state.data,
      recipe,
    },
  })),
  on(FoodActions.getRecipeSearchActionError, (state) => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(FoodActions.updateShoppingList, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        shoppingList: {
          ...state.data.shoppingList,
          [payload.value]: payload.checked,
        },
      },
      loading: false,
      error: false,
    };
  }),
  on(FoodActions.deleteMarkedItem, (state, { item }) => {
    const filteredItems = { ...state.data.shoppingList };
    delete filteredItems[item];
    return {
      ...state,
      data: {
        ...state.data,
        shoppingList: {
          ...filteredItems,
        },
      },
      loading: false,
      error: false,
    };
  })
);

export function foodReducer(state: FoodState | undefined, action: Action) {
  return reducer(state, action);
}
