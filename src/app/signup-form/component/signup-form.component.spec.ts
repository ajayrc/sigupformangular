import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { SignupFormComponent } from './signup-form.component';
import { SignupFormService } from '../service/signup-form.service';
import {
  dipatchFakeInputAndBlurEvent,
  MockAsyncEmailValidator,
  MockSignupFormService,
} from 'src/test-utils';
import appRoutes from 'src/app/app-routes';
import { AsyncEmailValidator } from 'src/app/form-utils/custom-email-validation.directive';
import MockRouter from 'src/test-utils/MockRouter';
import { fillValidForm, getNativeElement } from 'src/test-utils/form-utils';

// fyi - i dont recommend testing angular api like its done here - https://github.com/codecraft-tv/angular-course/blob/current/13.unit-testing/11.model-driven-forms/code/app/login.component.spec.ts
// rather test component's interface. Refer this https://github.com/molily/angular-form-testing/blob/main/client/src/app/components/signup-form/signup-form.component.spec.ts
describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let userService: SignupFormService;
  let routerService: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SignupFormComponent],
        imports: [
          NoopAnimationsModule,
          ReactiveFormsModule,
          MatButtonModule,
          MatIconModule,
          MatCardModule,
          MatProgressSpinnerModule,
          MatInputModule,
          HttpClientModule,
          RouterTestingModule.withRoutes(appRoutes),
        ],
        providers: [
          FormBuilder,
          { provide: AsyncEmailValidator, useClass: MockAsyncEmailValidator },
          { provide: SignupFormService, useClass: MockSignupFormService },
          { provide: Router, useClass: MockRouter },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(SignupFormService);
    routerService = TestBed.inject(Router);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Sign Up"', () => {
    component.ngOnInit();
    const componentNativeElement: HTMLElement = fixture.nativeElement;
    expect(componentNativeElement.textContent).toContain('Sign Up');
  });

  it('should contain Sign up form fields', () => {
    const componentNativeElement: HTMLElement = fixture.nativeElement;
    const signupForm = componentNativeElement.querySelector('form');
    expect(signupForm).not.toBeNull();

    const firstNameInput = componentNativeElement.querySelector(
      '#signupForm_firstName'
    );
    expect(firstNameInput).not.toBeNull();

    const lastNameInput = componentNativeElement.querySelector(
      '#signupForm_lastName'
    );
    expect(lastNameInput).not.toBeNull();

    const emailInput =
      componentNativeElement.querySelector('#signupForm_email');
    expect(emailInput).not.toBeNull();

    const passwordInput = componentNativeElement.querySelector(
      '#signupForm_password'
    );
    expect(passwordInput).not.toBeNull();

    const submitButton = componentNativeElement.querySelector(
      '#signupForm_submitButton'
    );

    expect(submitButton).not.toBeNull();
  });

  it('form should be invalid when empty', () => {
    expect(component.signupForm.valid).toBeFalsy();

    const componentDebugElement: DebugElement = fixture.debugElement;

    const submitButtonDebugElement: DebugElement = componentDebugElement.query(
      By.css('#signupForm_submitButton')
    ); // fyi alternate to using NativeElement to query children

    const submitButtonInputNative: HTMLInputElement = getNativeElement(
      '#signupForm_submitButton',
      componentDebugElement
    );
    expect(submitButtonInputNative.disabled).toBeTrue();
  });

  it('should validate First Name field', () => {
    fixture.detectChanges();

    const componentDebugElement: DebugElement = fixture.debugElement;
    const componentNativeElement = componentDebugElement.nativeElement;

    const firstNameInputNative: HTMLInputElement = getNativeElement(
      '#signupForm_firstName',
      componentDebugElement
    ); // fyi - a common util to get native elements

    firstNameInputNative.value = '';
    dipatchFakeInputAndBlurEvent(firstNameInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).toContain(
      'First name is required'
    );

    firstNameInputNative.value = 'a';
    dipatchFakeInputAndBlurEvent(firstNameInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).toContain(
      'First name should have at least 2 characters'
    );
    expect(componentNativeElement.textContent).not.toContain(
      'First name is required'
    );

    firstNameInputNative.value = 'ab';
    dipatchFakeInputAndBlurEvent(firstNameInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).not.toContain(
      'First name should have at least 2 characters'
    );
  });

  it('should validate Last Name field', () => {
    fixture.detectChanges();

    const componentDebugElement: DebugElement = fixture.debugElement;
    const componentNativeElement = componentDebugElement.nativeElement;

    const lastNameInputNative: HTMLInputElement = getNativeElement(
      '#signupForm_lastName',
      componentDebugElement
    );

    lastNameInputNative.value = '';
    dipatchFakeInputAndBlurEvent(lastNameInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).toContain(
      'Last name is required and should contain at least 2 characters'
    );

    lastNameInputNative.value = 'abc';
    dipatchFakeInputAndBlurEvent(lastNameInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).not.toContain(
      'Last name is required and should contain at least 2 characters'
    );
  });

  it('should validate Email address field', () => {
    fixture.detectChanges();

    const componentDebugElement: DebugElement = fixture.debugElement;
    const componentNativeElement = componentDebugElement.nativeElement;

    const emailInputNative: HTMLInputElement = getNativeElement(
      '#signupForm_email',
      componentDebugElement
    );

    emailInputNative.value = '';
    dipatchFakeInputAndBlurEvent(emailInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).toContain(
      'Email Address is required'
    );

    emailInputNative.value = 'ab@';
    dipatchFakeInputAndBlurEvent(emailInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).toContain(
      'Please enter a valid Email Address format or value'
    );

    emailInputNative.value = 'abc@xyz.com';
    dipatchFakeInputAndBlurEvent(emailInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).not.toContain(
      'Email Address is required'
    );
  });

  it('should validate Password field', () => {
    fixture.detectChanges();

    const componentDebugElement: DebugElement = fixture.debugElement;
    const componentNativeElement = componentDebugElement.nativeElement;

    const passwordInputNative: HTMLInputElement = getNativeElement(
      '#signupForm_password',
      componentDebugElement
    );

    passwordInputNative.value = '';
    dipatchFakeInputAndBlurEvent(passwordInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).toContain(
      'Password is required'
    );

    passwordInputNative.value = 'abc';
    dipatchFakeInputAndBlurEvent(passwordInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).toContain(
      'Password must be at least 8 characters long'
    );

    passwordInputNative.value = 'abc123456';
    dipatchFakeInputAndBlurEvent(passwordInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).toContain(
      'Password must contain lower and uppercase letters'
    );

    passwordInputNative.value = 'abcABC123';
    dipatchFakeInputAndBlurEvent(passwordInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).not.toContain(
      'Password must contain lower and uppercase letters'
    );

    const firstNameInputNative: HTMLInputElement = getNativeElement(
      '#signupForm_firstName',
      componentDebugElement
    );

    firstNameInputNative.value = 'first';
    dipatchFakeInputAndBlurEvent(firstNameInputNative);

    passwordInputNative.value = 'firstWAS123';
    dipatchFakeInputAndBlurEvent(passwordInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).toContain(
      'Password can not have first or last name'
    );

    const lastNameInputNative: HTMLInputElement = getNativeElement(
      '#signupForm_lastName',
      componentDebugElement
    );

    lastNameInputNative.value = 'LAST';
    dipatchFakeInputAndBlurEvent(lastNameInputNative);

    passwordInputNative.value = 'lastBUTNOTUPPER';
    dipatchFakeInputAndBlurEvent(passwordInputNative);
    fixture.detectChanges();

    expect(componentNativeElement.textContent).toContain(
      'Password can not have first or last name'
    );

    const submitButtonInputNative: HTMLButtonElement = getNativeElement(
      '#signupForm_submitButton',
      componentDebugElement
    );
    expect(submitButtonInputNative.disabled).toBeTrue();
  });

  it('submit button should be active when form is valid', () => {
    expect(component.signupForm.valid).toBeFalsy();

    const componentDebugElement: DebugElement = fixture.debugElement;

    fillValidForm(componentDebugElement);

    fixture.detectChanges();

    const submitButtonInputNative: HTMLButtonElement = getNativeElement(
      '#signupForm_submitButton',
      componentDebugElement
    );

    expect(submitButtonInputNative.disabled).toBeFalse();
  });

  it('should send request to api and navigate to next page when submitted succesfully', fakeAsync(async () => {
    const signupUserSpy = spyOn(userService, 'signupUser').and.callThrough();
    const routeSpy = spyOn(routerService, 'navigate').and.callThrough();

    const componentDebugElement: DebugElement = fixture.debugElement;

    fillValidForm(componentDebugElement);
    tick(1000); // wait for async validators

    fixture.detectChanges();

    const formDebugElement: DebugElement = componentDebugElement.query(
      By.css(`form`)
    );

    formDebugElement.triggerEventHandler('submit', {});

    fixture.detectChanges();
    expect(signupUserSpy).toHaveBeenCalled();

    expect(routeSpy).toHaveBeenCalledWith([
      '/user/profile',
      { id: 'f0afa549-e88b-481e-8250-a6ddf5a3b90d' },
    ]);
  }));
});
