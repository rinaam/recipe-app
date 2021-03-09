import { foodReducer, FoodState } from './reducers/food.reducer';
import { RecipeSearchEffects } from './effects/food.effect';
import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './reducers/hydration.reducer';

export interface AppState {
  food: FoodState;
}

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

export const reducers = {
  food: foodReducer,
};
export const effects = [RecipeSearchEffects];
