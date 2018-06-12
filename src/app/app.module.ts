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
  GameContainerComponent
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
  ShoppingGame
} from 'app/games';
import { GameTemplate } from 'app/games/template/template.component';
import { GameDirective } from 'app/directives/game.directive';
import { IslandsModule } from 'app/islands/islands.module';
import { ForestComponent } from 'app/views/islands/forest/forest.component';
import { RewardComponent } from './components/reward/reward.component';

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
    ForestComponent,
    IslandView,
    SeaView,
    RewardComponent
  ],
  entryComponents: [
    GameTemplate,
    CountingGame,
    LogicalSerieGame,
    ShoppingGame,
    RewardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    IslandsModule
  ],
  providers: [AuthService, UserGuard, TestGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
