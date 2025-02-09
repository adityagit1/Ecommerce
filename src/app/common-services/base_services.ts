import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class BasesServices {
    constructor(private _http: HttpClient) {

    }



    public getProductList(limit): Observable<any> {
        return this._http.get<any>(`${environment.ApiUrl}products?limit==${limit}`)
      }

      public getCategoryList(value): Observable<any> {
          if(!value){
            return this._http.get<any>(`${environment.ApiUrl}products/categories`);
          }
          else{
            return this._http.get<any>(`${environment.ApiUrl}products/category/${value}`);
          }
        
      }

      private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
}