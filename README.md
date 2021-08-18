# SignupClient

## Features: 
* Autofocus on first name field on page load, saving user click/tabs
* Fully keyboard accessible, user friendly and themed using Material
* Mobile friendly using Bootstrap
* Used boilerplate where possible to save time
* Password, when contained first or last name shows error at field level, rather form level
* Submit disabled till entire form is valid
* Code formatted using Prettier, so may not please all eyes

## Todo: (not done deliberately to avoid scope creep)
* maxlength="100" in form - the value for max length should match that of allowed limit by api/db/business rule - hence may be obtained from iniatial api call on page load
* i18n - get language specific labels from CMS/properties
* Security - dont allow special characters in fiels like names
* Middleware - use middleware/backend-for-frontend for features like api calls
* Foolproofing - validate user inputs like email with solutions suggested here https://soshace.com/verifying-an-email-address-without-sending-an-email-in-nodejs/ and when in doubt, validate by sending activation link
----------------------

# Ref: 
* https://angular.io/
* https://getbootstrap.com/
* https://material.angular.io/ - theme - deeppurple-amber
* https://codinglatte.com/posts/angular/cool-password-validation-angular/


------------------------------------------------------------------------

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
