import {
    HttpErrorResponse,
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor( ) { }
    /* created Simple interceptor
     becusae not having any headers 
     and token need to send  
     */

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone();
        /*  We can write the code to handela error on the basis 
        of our requirement  with error code  */


        /*  I have Not used the Common Error Becuse i have handel with the request 
        becuse i have created common alert module  */
        return next.handle(request)
        .pipe(
            catchError(this.handleError));

    }

    private handleError(error: HttpErrorResponse) {
        // if (error.status === 0) {
        //   // A client-side or network error occurred. Handle it accordingly.
        //   console.error('An error occurred:', error.error);
        // } else {
        //   // The backend returned an unsuccessful response code.
        //   // The response body may contain clues as to what went wrong.
        //   console.error(
        //     `Backend returned code ${error.status}, body was: `, error.error);
        // }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
 
}
