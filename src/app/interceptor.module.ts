import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {LocalStorageService} from './services/local-storage/local-storage.service';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.localStorageService.getAuthToken();

    if (!authToken) {
      return next.handle(req);
    }

    const dateExp = moment.unix(authToken.exp);
    const today = moment();

    if (dateExp.isBefore(today)) {
      const snackBarRef = this.snackBar.open('Your session has expired', null, {verticalPosition: 'top'});
      setTimeout(() => snackBarRef.dismiss(), 3000);
      this.localStorageService.removeAuthToken();
      return next.handle(req);
    } else {
      const dupReq = req.clone({headers: req.headers.set('authorization', `Bearer ${authToken.token}`)});
      return next.handle(dupReq);
    }
  }
}

@NgModule({
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true}
  ]
})
export class InterceptorModule {
}
