import { ActionReducerMap } from "@ngrx/store";

import { AppState } from "./app-state.model";

import { shoppingListReducer } from "../shopping-list/store/shopping-list.reducers";
import { authReducer } from "../auth/store/auth.reducers";

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
