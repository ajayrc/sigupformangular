import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOWER_CASE_PATTERN, UPPER_CASE_PATTERN } from 'src/app/constants';
import { AsyncEmailValidator } from 'src/app/form-utils/custom-email-validation.directive';
import { passwordValidator } from 'src/app/form-utils/password-validation.directive';
import { SignupFormService } from '../service/signup-form.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    readonly asyncEmailValidator: AsyncEmailValidator,
    private signupService: SignupFormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.signupForm = this.fb.group(
      {
        firstName: this.fb.control(null, [
          Validators.required,
          Validators.minLength(2),
        ]), // fyi - see https://github.com/angular/angular/issues/7407 for related markup
        lastName: this.fb.control(null, [
          Validators.required,
          Validators.minLength(2),
        ]),
        emailAddress: this.fb.control('', {
          updateOn: 'blur',
          validators: [Validators.required, Validators.email],
          asyncValidators: [
            this.asyncEmailValidator.validate.bind(this.asyncEmailValidator),
          ],
        }), // fyi - we can use email regex here as per need, instead of using default check which is less restrictive
        // fyi - async validator for email is just an example. in real life, this should be done by api/bff layer to take corrective action like sending activation link in case of unable to determine validity of mail id. However, it would be good idea to check if email id already exists in user db
        password: this.fb.control(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(UPPER_CASE_PATTERN),
          Validators.pattern(LOWER_CASE_PATTERN),
        ]),
      },
      { validators: passwordValidator }
    );
  }

  onSubmit(): void {
    // load profile page after successful signup submit
    const userFormValue = this.signupForm.value;

    if (!this.signupForm.valid) {
      return;
    }

    const { firstName, lastName, emailAddress: email } = userFormValue;

    try {
      this.isLoading = true;
      this.signupService
        .signupUser({
          firstName,
          lastName,
          email,
        })
        .subscribe((data) => {
          if (data && data._id) {
            // user is created, move to next module
            this.router.navigate(['/user/profile', { id: data._id }]);
          }
        });
    } catch (e) {
      // TODO show friendly error to user and log to external monitoring system
    }
  }

  ngOnDestroy() {
    // todo unsubscribe etc cleaup
  }
}
