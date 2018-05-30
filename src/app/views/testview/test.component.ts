import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'app/services';

interface Game {
  id: number;
  active: boolean;
  result: boolean;
  unlocked: boolean;
  html: HTMLElement;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  games: Game[] = [];
  current = 0;
  user: User;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = {
      _id: '',
      _rev: '',
      alias: '',
      gender: 'boy'
    };

    this.auth.user.subscribe(user => (this.user = user));

    this.initGames();
  }

  /**
   * Start games, hide some games, display one. Saves some properties about
   * them.
   */
  initGames() {
    const gamesElements = document.querySelectorAll('.games-container > *');

    for (let i = 0; i < gamesElements.length; i++) {
      const game = {
        id: i,
        html: <HTMLElement>gamesElements[i],
        active: false,
        unlocked: false,
        result: undefined
      };
      game.html.style.display = i === 0 ? 'block' : 'none';
      this.games.push(game);
    }

    this.current = 0;
    this.unlockNextBlock();
  }

  /**
   * Unlocks games two by two until it reach 6.
   */
  unlockNextBlock() {
    let i = 0;
    this.games.forEach(e => (i += e.result ? 1 : 0));

    if (this.current < this.games.length && i === this.current) {
      this.games[this.current].active = true;
      this.games[this.current].unlocked = true;
      this.games[this.current + 1].active = false;
      this.games[this.current + 1].unlocked = true;
    } else {
      this.user.testResults = {
        level: Math.floor(i / 2)
      };
      this.auth.updateUser(this.user).then(() => this.router.navigate(['/islands']));
    }
  }

  /**
   * Returns the respective classes for a game provided.
   * @param game The respective game to check class.
   * @returns The supposed class for this.
   */
  getClasses(game: Game): string {
    let className = this.current === game.id ? 'active' : '';
    className += game.unlocked ? '' : ' superhide';
    className += game.result ? ' completed' : ' incompleted';

    return className;
  }

  /**
   * Executes every time a game finalizes.
   * @param result The result of the game wheter it passed or failed.
   */
  gameEvent(result: boolean) {
    this.games[this.current].result = result;

    if (result) {
      setTimeout(this.nextGame.bind(this), 1000);
    } else {
      this.nextGame();
    }
  }

  /**
   * Displays next game to go, if there is one.
   */
  nextGame() {
    this.games[this.current].html.style.display = 'none';
    this.games[this.current++].active = false;
    if (this.current % 2 === 0) {
      this.unlockNextBlock();
    }
    if (this.current < this.games.length) {
      this.games[this.current].html.style.display = 'block';
    }
  }
}
