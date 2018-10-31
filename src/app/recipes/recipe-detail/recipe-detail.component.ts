import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as ShoppingListActions from "./../../shopping-list/store/shopping-list.actions";
import * as RecipeActions from "./../store/recipe.actions";

import { RecipeState, RecipeFeature } from "../store/recipe-state.model";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<RecipeState>;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RecipeFeature>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipeState = this.store.select("recipes");
    });
  }

  onAddToShoppingList() {
    this.store
      .select("recipes")
      .take(1)
      .subscribe((recipeState: RecipeState) => {
        this.store.dispatch(
          new ShoppingListActions.AddIngredients(
            recipeState.recipes[this.id].ingredients
          )
        );
      });
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(["/recipes"]);
  }
}
