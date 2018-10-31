import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import * as ShoppingListActions from "./../store/shopping-list.actions";
import { Ingredient } from "src/app/shared/ingredient.model";
import { AppState } from "src/app/store/app-state.model";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f")
  slForm: NgForm;
  editMode = false;
  subscription: Subscription;
  editedItem: Ingredient;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select("shoppingList").subscribe(data => {
      if (data.editedIngredientIndex > -1) {
        this.editedItem = data.editedIngredient;
        this.editMode = true;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          ingredient: newIngredient
        })
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
