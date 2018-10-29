import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Main component
import { AppComponent } from 'app/app.component';
// Views
import {
  PageNotFoundComponent,
  RegisterView,
  WelcomeView,
  LoginView,
  InitialTestView,
  IslandView,
  SeaView
} from 'app/views';
// Components
import {
  ExitButtonComponent,
  GameContainerComponent,
  RewardComponent
} from 'app/components';
// Services
import { AuthService } from 'app/services';
// Guards
import {
  UserGuard,
  TestGuard,
  IslandsGuard
} from 'app/services';
// Games
import {
  CountingGame,
  LogicalSerieGame,
  ShoppingGame,
  NumericalSerieEasyGame,
  NumericalSerieHardGame,
  NumericalSerieMediumGame,
  GameTemplate
} from 'app/games';
import { GameDirective } from 'app/directives/game.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeView,
    canActivate: [UserGuard]
  },
  {
    path: 'login',
    component: LoginView
  },
  {
    path: 'register',
    component: RegisterView
  },
  {
    path: 'test',
    component: InitialTestView,
    canActivate: [TestGuard]
  },
  {
    path: 'islands',
    children: [
      { path: '', component: SeaView, pathMatch: 'full' },
      { path: ':island', component: IslandView },
      { path: ':island/:gameId', component: IslandView }
    ],
    // canActivate: [IslandsGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    PageNotFoundComponent,
    RegisterView,
    WelcomeView,
    LoginView,
    AppComponent,
    ExitButtonComponent,
    CountingGame,
    LogicalSerieGame,
    ShoppingGame,
    GameTemplate,
    GameContainerComponent,
    GameDirective,
    InitialTestView,
    IslandView,
    SeaView,
    RewardComponent,
    NumericalSerieEasyGame,
    NumericalSerieHardGame,
    NumericalSerieMediumGame
  ],
  entryComponents: [
    GameTemplate,
    CountingGame,
    LogicalSerieGame,
    ShoppingGame,
    NumericalSerieEasyGame,
    NumericalSerieHardGame,
    NumericalSerieMediumGame,
    RewardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, UserGuard, TestGuard, IslandsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
