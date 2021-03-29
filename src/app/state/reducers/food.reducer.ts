import { recipeSearchT, recipeT } from './../../services/food.service';
import { Action, createReducer, on } from '@ngrx/store';
import * as FoodActions from '../actions/food.action';

export type shoppingListT = {
  recipe: recipeT;
  ingredient: string;
  checked: boolean;
}[];

export interface FoodState {
  loading: boolean;
  error: boolean;
  data: {
    recipe: recipeSearchT | null;
    favorite: recipeT[];
    shoppingList: shoppingListT;
  };
}

export const initialState: FoodState = {
  loading: false,
  error: false,
  data: {
    recipe: null,
    favorite: [],
    shoppingList: [],
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
  on(
    FoodActions.updateShoppingList,
    (state, { recipe, ingredient, checked }) => {
      // map existing shopping list with new checked state
      const updatedShoppingList = state.data.shoppingList.map((item) => {
        if (
          item.recipe.label === recipe.label &&
          item.ingredient === ingredient
        ) {
          return {
            ...item,
            checked,
          };
        }
        return item;
      });

      // check if the ingridient is new and add it
      if (
        !updatedShoppingList.some(
          (item) =>
            item.recipe.label === recipe.label && item.ingredient === ingredient
        )
      ) {
        updatedShoppingList.push({ recipe, checked, ingredient });
      }
      return {
        ...state,
        data: {
          ...state.data,
          shoppingList: updatedShoppingList,
        },
        loading: false,
        error: false,
      };
    }
  ),
  on(FoodActions.deleteMarkedItem, (state, { ingridient }) => {
    const filteredItems = state.data.shoppingList.filter(
      (item) => item.ingredient !== ingridient
    );

    return {
      ...state,
      data: {
        ...state.data,
        shoppingList: filteredItems,
      },
      loading: false,
      error: false,
    };
  }),
  on(FoodActions.updateFavoritesList, (state, payload) => {
    const foundOne = state.data.favorite.some(
      (item) => item.url === payload.recipe.url
    );
    let updated = [];
    if (foundOne) {
      updated = state.data.favorite.filter(
        (item) => item.url !== payload.recipe.url
      );
    } else {
      updated = [...state.data.favorite, payload.recipe];
    }

    return {
      ...state,
      data: {
        ...state.data,
        favorite: updated,
      },
      loading: false,
      error: false,
    };
  })
);

export function foodReducer(state: FoodState | undefined, action: Action) {
  return reducer(state, action);
}
