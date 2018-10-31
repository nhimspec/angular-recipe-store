import { Effect, Actions } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { fromPromise } from "rxjs/observable/fromPromise";
import "rxjs/Rx";

import * as firebase from "firebase";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => action.payload)
    .switchMap((authData: { username: string; password: string }) =>
      fromPromise(
        firebase
          .auth()
          .createUserWithEmailAndPassword(authData.username, authData.password)
      )
    )
    .switchMap(() => fromPromise(firebase.auth().currentUser.getIdToken()))
    .mergeMap(token => {
      this.router.navigate(["/"]);
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect()
  authSignIn = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignup) => action.payload)
    .switchMap((authData: { username: string; password: string }) =>
      fromPromise(
        firebase
          .auth()
          .signInWithEmailAndPassword(authData.username, authData.password)
      )
    )
    .switchMap(() => fromPromise(firebase.auth().currentUser.getIdToken()))
    .mergeMap(token => {
      this.router.navigate(["/"]);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect({ dispatch: false })
  authLogout = this.actions$.ofType(AuthActions.LOGOUT).do(() => {
    this.router.navigate(["/"]);
  });
  constructor(private actions$: Actions, private router: Router) {}
}
