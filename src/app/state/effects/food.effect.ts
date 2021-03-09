import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  getRecipeSearchAction,
  getRecipeSearchActionSuccess,
  getRecipeSearchActionError,
} from '../actions/food.action';
import { FoodService } from '../../services/food.service';

@Injectable()
export class RecipeSearchEffects {
  recipeSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRecipeSearchAction),
      mergeMap((query) =>
        this.foodService.getRecipeSearch(query.query).pipe(
          map((recipe) => getRecipeSearchActionSuccess({ recipe })),
          catchError(() => of(getRecipeSearchActionError()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private foodService: FoodService) {}
}
