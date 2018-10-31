import { AppState } from "src/app/store/app-state.model";

import { Recipe } from "../recipe.model";

export interface RecipeFeature extends AppState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
}
