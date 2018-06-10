import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Main component
import { AppComponent } from 'app/app.component';
// Views
import {
  PageNotFoundComponent,
  RegisterComponent,
  IslandsComponent,
  WelcomeComponent,
  LoginComponent,
  InitialTestView
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
import { OneComponent } from 'app/views/islands/one/one.component';
import { TwoComponent } from 'app/views/islands/two/two.component';
import { ThreeComponent } from 'app/views/islands/three/three.component';
import { GameShoppingComponent } from './views/game-shopping/game-shopping.component';
import { GameCountingComponent } from './views/game-counting/game-counting.component';
import { GameLogicalComponent } from './views/game-logical/game-logical.component';
import { GameTemplate } from 'app/games/template/template.component';
import { GameDirective } from './directives/game.directive';
import { BeachComponent } from './views/islands/beach/beach.component';
import { ForestComponent } from './views/islands/forest/forest.component';
import { CityComponent } from './views/islands/city/city.component';

const appRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'test',
    component: InitialTestView,
    canActivate: [TestGuard]
  },
  {
    path: 'islands',
    component: IslandsComponent,
    canActivate: [IslandsGuard]
  },
  {
    path: 'island/1',
    component: OneComponent,
    canActivate: [IslandsGuard]
  },
  {
    path: 'island/2',
    component: TwoComponent,
    canActivate: [IslandsGuard]
  },
  {
    path: 'island/3',
    component: ThreeComponent,
    canActivate: [IslandsGuard]
  },
  {
    path: 'game/shopping',
    component: GameShoppingComponent,
    canActivate: [IslandsGuard]
  },
  {
    path: 'game/counting',
    component: GameCountingComponent,
    canActivate: [IslandsGuard]
  },
  {
    path: 'game/logical-serie',
    component: GameLogicalComponent,
    canActivate: [IslandsGuard]
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
    RegisterComponent,
    WelcomeComponent,
    IslandsComponent,
    LoginComponent,
    AppComponent,
    ExitButtonComponent,
    CountingGame,
    LogicalSerieGame,
    ShoppingGame,
    OneComponent,
    TwoComponent,
    ThreeComponent,
    GameShoppingComponent,
    GameCountingComponent,
    GameLogicalComponent,
    GameTemplate,
    GameContainerComponent,
    GameDirective,
    InitialTestView,
    BeachComponent,
    ForestComponent,
    CityComponent
  ],
  entryComponents: [GameTemplate, CountingGame, LogicalSerieGame, ShoppingGame],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), FormsModule],
  providers: [AuthService, UserGuard, TestGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
