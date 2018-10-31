import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { RecipeFeature, RecipeState } from "../store/recipe-state.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<RecipeState>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<RecipeFeature>
  ) {}

  ngOnInit() {
    this.recipeState = this.store.select("recipes");
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
