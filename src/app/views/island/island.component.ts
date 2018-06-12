import { Component, OnInit, Type, AfterViewInit } from '@angular/core';
import { User, AuthService } from 'app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  CountingGame,
  ShoppingGame,
  LogicalSerieGame,
  NumericalSerieEasyGame,
  NumericalSerieMediumGame,
  NumericalSerieHardGame
} from 'app/games';
import { GameItem } from 'app/components';
import { Observable, Observer } from 'rxjs';
import { RewardComponent } from 'app/components/reward/reward.component';

interface Game {
  id: number;
  active: boolean;
  result: boolean;
}

interface IslandGame {
  id: number;
  screenshot: string;
  game: Type<any>;
}

interface Island {
  id: number;
  name: string;
  games: IslandGame[]
}

export const islandMap = {
  forest: 0,
  beach: 1,
  city: 2
};

export const islands: Island[] = [
  {
    id: 0,
    name: 'forest',
    games: [
      { id: 0, screenshot: '/assets/screenshots/mini11.png', game: CountingGame },
      { id: 1, screenshot: '/assets/screenshots/mini12.png', game: NumericalSerieEasyGame },
      { id: 2, screenshot: '/assets/screenshots/mini11.png', game: CountingGame },
      { id: 3, screenshot: '/assets/screenshots/mini12.png', game: NumericalSerieEasyGame }
    ]
  },
  {
    id: 1,
    name: 'beach',
    games: [
      { id: 0, screenshot: '/assets/screenshots/mini21.png', game: LogicalSerieGame },
      { id: 1, screenshot: '/assets/screenshots/mini22.png', game: NumericalSerieMediumGame },
      { id: 2, screenshot: '/assets/screenshots/mini21.png', game: LogicalSerieGame },
      { id: 3, screenshot: '/assets/screenshots/mini22.png', game: NumericalSerieMediumGame }
    ]
  },
  {
    id: 2,
    name: 'city',
    games: [
      { id: 0, screenshot: '/assets/screenshots/mini31.png', game: ShoppingGame },
      { id: 1, screenshot: '/assets/screenshots/mini32.png', game: NumericalSerieHardGame },
      { id: 2, screenshot: '/assets/screenshots/mini31.png', game: ShoppingGame },
      { id: 3, screenshot: '/assets/screenshots/mini32.png', game: NumericalSerieHardGame }
    ]
  }
];

@Component({
  selector: 'app-island',
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.css']
})
export class IslandView implements OnInit, AfterViewInit {
  user: User;
  stars = [[], [], [], []];
  island: Island = islands[0];
  subroute: boolean = false;
  game: Observable<GameItem>;
  games: GameItem[];
  gameChanger: Observer<GameItem>;
  gameId: number;
  current: number;
  unlockedRecently = false;
  recent = '/assets/newGameUnlocked.png';

  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      _id: '',
      _rev: '',
      alias: 'unknown',
      gender: 'boy',
      islands: []
    };

    this.auth.user.subscribe(u => {
      this.user = u;
      const iid = this.island.id;
      for (let i = 0; i < this.user.islands[iid].stars.length; i++) {
        for (let j = 0; j < 3; j++) {
          // Determines which kind of star to show.
          if (this.user.islands[iid].stars[i] > j) {
            this.stars[i].push('gold');
          } else {
            this.stars[i].push('silver');
          }
        }
      }
    });

    this.route.params.subscribe(params => {
      this.island = islands[islandMap[params.island]];
      if (this.subroute = params.gameId !== undefined) {
        this.gameId = Number(params.gameId);
        this.games = this.generateGames();
        this.game = new Observable<GameItem>(observer => {
          this.gameChanger = observer;
          this.gameChanger.next(this.games[this.current = 0]);
        });
      }
    });
  }

  ngAfterViewInit() {
    if (!this.subroute) {
      // Change background
      const gc = <HTMLElement>document.querySelector('.games-container');
      gc.style.background = `url(/assets/${this.island.name}.png) no-repeat center`;
      gc.style.backgroundSize = 'cover';
    }
  }

  redirect(id: string) {
    this.router.navigate(['/islands', this.island.name, id]);
  }

  generateGames(): GameItem[] {
    return [
      {
        component: this.island.games[this.gameId].game,
        data: {
          active: true
        }
      },
      {
        component: this.island.games[this.gameId].game,
        data: {
          active: false
        }
      },
      {
        component: this.island.games[this.gameId].game,
        data: {
          active: false
        }
      }
    ];
  }

  determineClass(game: any): string[] {
    const classes: string[] = [];
    classes.push(game.result ? 'completed' : 'incompleted');
    game.active ? classes.push('active') : null;

    return classes;
  }

  passed(result: boolean) {
    if (this.current + 1 < this.games.length) {
      this.games[this.current].data.result = result;
      this.games[this.current].data.active = false;
      this.games[++this.current].data.active = true;
      this.gameChanger.next(this.games[this.current]);
    } else if (this.current < this.games.length) {
      this.games[this.current].data.result = result;
      this.games[this.current].data.active = false;
      this.current++;
      const stars = this.games.map(g => g.data.result);
      // End and show reward component
      this.gameChanger.next({
        component: RewardComponent, // Add Reward Component
        data: {
          username: this.user.alias,
          stars: stars
        }
      });
      // Update user
      let correctAnswers = 0;
      this.games.forEach(g => g.data.result ? correctAnswers++ : null);
      if (this.user.islands[this.island.id].stars[this.gameId] < correctAnswers) {
        this.user.islands[this.island.id].stars[this.gameId] = correctAnswers;
        if (correctAnswers === 3) {
          if (this.gameId === 3 && this.island.id !== 2 && this.user.level < 3) {
            this.unlockedRecently = true;
            this.recent = '/assets/newIslandUnlocked.png';
          } else if (this.gameId !== 3) {
            this.unlockedRecently = true;
            this.recent = '/assets/newGameUnlocked.png';
          }
          setTimeout(() => this.unlockedRecently = false, 3000);
        }
      }
      if (correctAnswers === 3 && this.gameId === 3 && this.island.id < 2 &&
        this.user.level - 1 === this.island.id) {
        // User level upgrade
        this.user.level++;
      }
      this.auth.updateUser(this.user);
    } else {
      this.router.navigate(['/islands', this.island.name]);
    }
  }
}
