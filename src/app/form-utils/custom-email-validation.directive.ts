import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';

import { environment } from '../../environments/environment';

// REF: https://docs.isitarealemail.com/how-to-validate-email-addresses-with-angular
@Injectable({ providedIn: 'root' }) // TODO provide only where required
export class AsyncEmailValidator implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> {
    // TODO MOVE SUCH FUNCATIONALITY TO MIDDLEWARE/API LAYER
    if (ctrl.value) {
      return this.http
        .get<{ status: string }>(environment.ISITREALMAIL_API_URL, {
          params: { email: ctrl.value },
          headers: {
            Authorization: 'Bearer ' + environment.EMAIL_VALIDATION_API_KEY,
          },
        })
        .toPromise()
        .then((result) => {
          if (result.status === 'invalid') {
            return { asyncEmailInvalid: true };
          } else if (result.status === 'unknown') {
            return { asyncEmailUnk: true };
          } else {
            // status is valid
            return null;
          }
        });
    } else {
      return Promise.resolve({ asyncEmailInvalid: true });
    }
  }
}
