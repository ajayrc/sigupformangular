import { TestBed } from '@angular/core/testing';

import { SignupFormService } from './signup-form.service';

xdescribe('SignupFormService', () => {
  let service: SignupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
