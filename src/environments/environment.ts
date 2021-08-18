// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = { // fyi - env specific values go here
  production: false,
  ISITREALMAIL_API_URL: "https://isitarealemail.com/api/email/validate",
  EMAIL_VALIDATION_API_KEY:  "c15bc917-d563-43c6-a12e-82f11c26c732", 
  DEMO_API_SIGNUP_USER: "https://demo-api.now.sh/users"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
