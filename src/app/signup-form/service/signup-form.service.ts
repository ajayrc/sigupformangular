import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/model/user';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', // TODO PROVIDE AT REQUIRED SUB MODULE RATHER THAN ROOT
})
export class SignupFormService {
  // fyi - this file can be also moved under generic services or model-related files as it caters to USER model

  constructor(private http: HttpClient) {}

  signupUser(signupFormData: User): Observable<User> {
    return this.http
      .post<User>(environment.DEMO_API_SIGNUP_USER, signupFormData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // ref: https://angular.io/guide/http#error-details
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error); // TODO move logging to monitoring system as suggested in my article https://ajayrc.medium.com/application-insights-using-azure-and-vuejs-error-handling-and-event-logging-in-front-end-to-40874d76f152
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
