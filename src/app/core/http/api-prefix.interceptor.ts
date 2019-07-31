import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '@env/environment';
import { catchError } from 'rxjs/operators';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  constructor(
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Use for test interceptor
    // if (request.url.indexOf('/v1/employees') !== -1) {
    //   return next.handle(request)
    //     .pipe(catchError(err => {
    //       if (err instanceof HttpErrorResponse && err.status === 0) {
    //         console.log(err.url + " Check Your Internet Connection And Try again Later");
    //       } else if (err instanceof HttpErrorResponse && err.status === 401) {
    //         console.log(err.url + " UNAUTHORIZED");
    //       } else if (err instanceof HttpErrorResponse && err.status === 404) {
    //         console.log(err.url + " Not Found");
    //       }
    //       return throwError(err);
    //     }))
    // }
    request = request.clone({ url: environment.serverUrl + request.url });
    return next.handle(request)
      .pipe(catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 0) {
          console.log('Check Your Internet Connection And Try again Later');
        } else if (err instanceof HttpErrorResponse && err.status === 401) {
          console.log('UNAUTHORIZED');
        } else if (err instanceof HttpErrorResponse && err.status === 404) {
          console.log('Not Found');
        }
        return throwError(err);
      }))
  }
}
