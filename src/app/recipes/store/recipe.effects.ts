import { Effect, Actions } from "@ngrx/effects";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import "rxjs/Rx";

import { RecipeFeature, RecipeState } from "./recipe-state.model";
import { Recipe } from "../recipe.model";

import * as RecipeActions from "./recipe.actions";

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) =>
      this.http.get(`https://ng-recipe-book-b8da4.firebaseio.com/recipes.json`)
    )
    .map((recipes: Recipe[]) => {
      for (let recipe of recipes) {
        if (!recipe["ingredients"]) {
          recipe["ingredients"] = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    });

  @Effect({ dispatch: false })
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select("recipes"))
    .switchMap(([action, state]: [RecipeActions.StoreRecipes, RecipeState]) => {
      const req = new HttpRequest(
        "PUT",
        "https://ng-recipe-book-b8da4.firebaseio.com/recipes.json",
        state.recipes,
        { reportProgress: true }
      );

      return this.http.request(req);
    });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<RecipeFeature>
  ) {}
}
