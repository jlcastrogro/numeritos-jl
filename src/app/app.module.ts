import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from 'app/app.component';
import {
  PageNotFoundComponent,
  RegisterComponent,
  IslandsComponent,
  WelcomeComponent,
  LoginComponent,
  TestComponent
} from 'app/views';
import {
  AuthService,
  UserGuard
} from 'app/services';

const appRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [UserGuard]
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'test',
    component: TestComponent,
    canActivate: [UserGuard]
  }, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    PageNotFoundComponent,
    RegisterComponent,
    WelcomeComponent,
    IslandsComponent,
    LoginComponent,
    TestComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [AuthService, UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
