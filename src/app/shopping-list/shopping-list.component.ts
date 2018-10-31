import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import * as ShoppingListActions from "./store/shopping-list.actions";

import { AppState } from "../store/app-state.model";
import { ShoppingListState } from "./store/shopping-list.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<ShoppingListState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.shoppingListState = this.store.select("shoppingList");
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
