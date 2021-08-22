import { of } from 'rxjs';
import { mockUserObject } from '.';

export class MockSignupFormService {
  signupUser() {
    return of(mockUserObject);
  }
}
