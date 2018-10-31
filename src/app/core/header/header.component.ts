import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "src/app/store/app-state.model";
import { AuthState } from "src/app/auth/store/auth.model";

import * as AuthActions from "./../../auth/store/auth.actions";
import * as RecipeActions from './../../recipes/store/recipe.actions';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor(
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.authState = this.store.select("auth");
  }
  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }
  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
}
