import { shoppingListT } from './../../state/reducers/food.reducer';
import { recipeT } from './../../services/food.service';
import { selectShoppingListKey } from './../../state/selectors/food.selector';
import { deleteMarkedItem } from '../../state/actions/food.action';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  shoppingList$: Observable<shoppingListT> = this.store.pipe(
    select(selectShoppingListKey)
  );

  uniqueRecipes: recipeT[] = [];

  constructor(private store: Store, private router: Router) {
    this.shoppingList$.subscribe((list) => {
      list.forEach((item) => {
        if (
          !this.uniqueRecipes.some(
            (recipe) => recipe.label === item.recipe.label
          )
        ) {
          this.uniqueRecipes.push(item.recipe);
        }
      });
    });
  }

  isEmpty(obj): boolean {
    return Object.keys(obj).length === 0;
  }
  deleteItem(ingridient: string, recipe: recipeT): void {
    this.uniqueRecipes = [];
    this.store.dispatch(deleteMarkedItem({ ingridient, recipe }));
  }
  navigateToRecipe(url): void {
    window.open(url, '_blank');
  }

  getArrRecipeTitle(title: string, shoppingList: shoppingListT): shoppingListT {
    return shoppingList.filter((hit) => hit.recipe.label === title);
  }
}
