import { AbstractControl, ValidationErrors } from '@angular/forms';

export class MockAsyncEmailValidator {
  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> {
    return Promise.resolve(null);
  }
}
