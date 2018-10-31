import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "../store/app-state.model";
import { AuthState } from "./store/auth.model";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store
      .select("auth")
      .take(1)
      .map((authState: AuthState) => authState.authenticated);
  }
}
