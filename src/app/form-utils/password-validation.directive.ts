import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const firstName = (control.get('firstName')?.value as string)?.toLowerCase(); // toLowerCase - gives fool-proof check against casing
  const lastName = (control.get('lastName')?.value as string)?.toLowerCase();
  const passwordControl = control.get('password');
  const password = (passwordControl?.value as string)?.toLowerCase();
  const passwordValidationResult =
    password?.includes(firstName) || password?.includes(lastName)
      ? { passwordContainsUserInfo: true }
      : null;

  if (passwordValidationResult) {
    // FYI this is not needed if the error message is shown at form level and not password field level
    // The treadoff is, now we see either this error, or others at field level but not all at same time
    passwordControl?.setErrors(passwordValidationResult);
  }

  return passwordValidationResult;
};
