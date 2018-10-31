import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";

import * as RecipeActions from "./../store/recipe.actions";
import { RecipeFeature, RecipeState } from "../store/recipe-state.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RecipeFeature>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({
          index: this.id,
          updateRecipe: this.recipeForm.value
        })
      );
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = "",
      recipeImagePath = "",
      recipeDescription = "",
      recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store
        .select("recipes")
        .take(1)
        .subscribe((recipeState: RecipeState) => {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe["ingredients"]) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^\d*$/)
                  ])
                })
              );
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }
}
