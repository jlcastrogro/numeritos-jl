import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthService } from 'app/services/auth.service';

interface Game {
  id: number;
  active: boolean;
  result: boolean;
  unlocked: boolean;
  html: HTMLElement;
}

@Component({
  selector: 'app-game-shopping',
  templateUrl: './game-shopping.component.html',
  styleUrls: ['./game-shopping.component.css']
})
export class GameShoppingComponent implements OnInit {
  games: Game[] = [];
  current = 0;
  user: User;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = {
      _id: '',
      _rev: '',
      alias: '',
      gender: 'boy',
      islands: []
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
        unlocked: true,
        result: undefined
      };
      game.html.style.display = i === 0 ? 'block' : 'none';
      this.games.push(game);
    }

    this.current = 0;
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
    if (this.current < this.games.length) {
      this.games[this.current].html.style.display = 'block';
    } else {
      let result = 0;
      this.games.forEach(e => (e.result ? result++ : null));
      this.user.islands[0].stars[0] = result;
      this.auth.updateUser(this.user);
      this.router.navigate(['/island/3']);
    }
  }
}
