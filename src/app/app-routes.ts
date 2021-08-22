import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupFormComponent } from './signup-form/component/signup-form.component';

const appRoutes: Routes = [
    { path: 'signup', component: SignupFormComponent }, //fyi - todo - this should act as auth guard for user(profile) module
    { path: 'user',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    { path: '',   redirectTo: '/signup', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
  ];
  
export default appRoutes;