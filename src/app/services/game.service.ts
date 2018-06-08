import { Injectable } from '@angular/core';
import { GameItem } from 'app/games/template/gameItem';
import { GameTemplate } from 'app/games/template/template.component';
import { CountingGame } from 'app/games/counting/counting.component';
import { LogicalSerieGame } from 'app/games/logical-serie/logical-serie.component';
import { ShoppingGame } from 'app/games/shopping/shopping.component';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getTestGames() {
    return [
      new GameItem(CountingGame),
      new GameItem(CountingGame),
      new GameItem(LogicalSerieGame),
      new GameItem(LogicalSerieGame),
      new GameItem(ShoppingGame),
      new GameItem(ShoppingGame)
    ];
  }
}
