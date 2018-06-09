import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'app/services';
import { Observer, Observable } from 'rxjs';
import { GameItem } from 'app/components';
import {
  CountingGame,
  LogicalSerieGame,
  ShoppingGame
} from 'app/games';

interface Game {
  id: number;
  active: boolean;
  result: boolean;
  unlocked: boolean;
}

@Component({
  selector: 'initial-test',
  templateUrl: './initial-test.component.html',
  styleUrls: ['./initial-test.component.css']
})
export class InitialTestView implements OnInit {
  games: GameItem[] = [];
  game: Observable<GameItem>;
  gameChanger: Observer<GameItem>;
  current: number;
  user: User;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    // While user is being fetched, this prevents error for undefined user
    this.user = {
      _id: '',
      _rev: '',
      alias: '',
      gender: 'boy',
      islands: []
    };
    // Fetch user
    this.auth.user.subscribe(user => (this.user = user));
    // Initialize set of games to be used
    this.games = this.generateGames();
    // Initialize an observer to change games at certain times
    this.game = new Observable<GameItem>(observer => {
      this.gameChanger = observer;
      this.gameChanger.next(this.games[this.current = 0]);
    });
  }

  /**
   * Determines the next operation once the game was completed.
   * @param result The result of the game (correct/wrong).
   */
  passed(result: boolean) {
    this.games[this.current].data.result = result;

    if (this.current < this.games.length) {
      // Checks if its even
      if (this.current & 1) {
        if (
          this.games[this.current].data.result && // Checks this result
          this.games[this.current - 1].data.result // Checks previous result
        ) {
          this.games[this.current + 1].data.unlocked = true;
          this.games[this.current + 2].data.unlocked = true;
          this.nextGame();
        } else {
          this.finishGames();
        }
      } else {
        this.nextGame();
      }
    } else {
      this.finishGames();
    }
  }

  nextGame() {
    this.games[this.current].data.active = false;
    this.games[++this.current].data.active = true;
    this.gameChanger.next(this.games[this.current]);
  }

  finishGames() {
    let correctAnswers = 0;
    for (let game of this.games) {
      correctAnswers += game.data.result ? 1 : 0;
    }
    this.user.level = Math.floor(correctAnswers / 2);
    // TODO: Update user!
    // console.log(this.user.level);
  }

  /**
   * Determines to which classes this game indicator will belong.
   * @param game Data about the game.
   * @returns An array of classes for the indicator provided.
   */
  determineClass(game: any) {
    let classes = [];
    game.active ? classes.push('active') : null;
    game.unlocked ? null : classes.push('superhide');
    classes.push(game.result ? 'completed' : 'incompleted');
    return classes;
  }

  /**
   * Generates the games that this view will hold and information about them.
   * @returns An array with the games and their information.
   */
  generateGames() {
    return [
      {
        component: CountingGame, data: {
          unlocked: true,
          active: true
        }
      },
      {
        component: CountingGame, data: {
          unlocked: true
        }
      },
      { component: LogicalSerieGame, data: {} },
      { component: LogicalSerieGame, data: {} },
      { component: ShoppingGame, data: {} },
      { component: ShoppingGame, data: {} }
    ];
  }
}
