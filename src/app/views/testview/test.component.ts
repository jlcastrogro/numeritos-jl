import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'app/services/auth.service';
import { GameService } from 'app/services/game.service';
import { GameItem } from 'app/games/template/gameItem';
import { Observer, Observable } from 'rxjs';

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
  games: GameItem[] = [];
  game: Observable<GameItem>;
  gameChanger: Observer<GameItem>;
  current: number;
  user: User;

  constructor(private auth: AuthService,
    private router: Router,
    private gameService: GameService) {  }

  ngOnInit() {
    this.game = new Observable<GameItem>(observer => {
      this.gameChanger = observer;
      this.gameChanger.next(this.games[this.current = 0]);
    });
    
    this.user = {
      _id: '',
      _rev: '',
      alias: '',
      gender: 'boy',
      islands: []
    };

    this.games = this.gameService.getTestGames();
    this.auth.user.subscribe(user => (this.user = user));
  }

  passed(result) {
    this.gameChanger.next(this.games[++this.current]);
  }
}
