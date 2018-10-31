import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "../store/app-state.model";
import { AuthState } from "../auth/store/auth.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Intercepted!", req);
    return this.store.select("auth").take(1).switchMap((authState: AuthState) => {
      const copiedReq = req.clone({
        params: req.params.set("auth", authState.token)
      });

      return next.handle(copiedReq);
    });
  }
}
