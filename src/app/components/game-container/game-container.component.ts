import {
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  ViewChild,
  Component,
  Output,
  OnInit,
  Input,
  Type
} from '@angular/core';
import { Observable } from 'rxjs';
import { GameDirective } from 'app/directives/game.directive';
import { GameTemplate } from 'app/games';

const timeBetweenGames = 1500; // ms

export interface GameItem {
  component: Type<any>;
  data?: any;
}

/**
 * Contains and instantiates a given component. The component to instantiate
 * must be received from a suscriber at GameItem as a GameItem object.
 */
@Component({
  selector: 'game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.css']
})
export class GameContainerComponent implements OnInit {
  @Input() gameItem: Observable<GameItem>;
  @Output() result = new EventEmitter<boolean>();
  @ViewChild(GameDirective) gameHost: GameDirective;
  gameRef: ComponentRef<GameTemplate>;
  correctAnswerAudio = new Audio();

  constructor(private cmpFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.correctAnswerAudio.src = '/assets/sounds/Correct answer.mp3';
    this.correctAnswerAudio.load();
    // Every time a game is published by this parent component, load it
    this.gameItem.subscribe(this.loadComponent.bind(this));
  }

  /**
   * Clears the content on this and reloads screen.
   * @param game 
   */
  loadComponent(game: GameItem) {
    if (game) {
      const cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(
        game.component
      );
      const viewContainerRef = this.gameHost.viewContainerRef;
      viewContainerRef.clear();
      this.gameRef = viewContainerRef.createComponent(cmpFactory);
    }

    this.gameRef.instance.result.subscribe(this.gameResult.bind(this));
  }

  gameResult(result: boolean) {
    if (result) {
      this.correctAnswerAudio.currentTime = 0;
      this.correctAnswerAudio.play();
    }
    // Time varies whether the answer correctness
    setTimeout(() => {
      this.result.emit(result);
    }, result ? timeBetweenGames : 500);
  }
}
