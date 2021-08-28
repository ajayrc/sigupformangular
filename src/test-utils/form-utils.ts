import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { dipatchFakeInputAndBlurEvent } from '.';

function getNativeElement(
  elementSelector: string,
  containerDebugElement: DebugElement
) {
  return containerDebugElement.query(By.css(elementSelector)).nativeElement;
}

function fillValidForm(componentDebugElement: DebugElement): void {
  const firstNameInputNative: HTMLInputElement = getNativeElement(
    '#signupForm_firstName',
    componentDebugElement
  );

  firstNameInputNative.value = 'firstname';
  dipatchFakeInputAndBlurEvent(firstNameInputNative);

  const lastNameInputNative: HTMLInputElement = getNativeElement(
    '#signupForm_lastName',
    componentDebugElement
  );
  lastNameInputNative.value = 'lastname';
  dipatchFakeInputAndBlurEvent(lastNameInputNative);

  const passwordInputNative: HTMLInputElement = getNativeElement(
    '#signupForm_password',
    componentDebugElement
  );
  passwordInputNative.value = 'passWord';
  dipatchFakeInputAndBlurEvent(passwordInputNative);

  const emailInputNative: HTMLInputElement = getNativeElement(
    '#signupForm_email',
    componentDebugElement
  );
  emailInputNative.value = 'valid@value.com';
  dipatchFakeInputAndBlurEvent(emailInputNative);
}
export { getNativeElement, fillValidForm };
