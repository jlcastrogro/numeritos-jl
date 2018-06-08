import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  ComponentRef,
  EventEmitter,
  Output
} from '@angular/core';
import { GameService } from 'app/services/game.service';
import { GameItem } from 'app/games/template/gameItem';
import { GameDirective } from 'app/directives/game.directive';
import { GameTemplate } from 'app/games/template/template.component';
import { Observable } from 'rxjs';

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

  constructor(private cmpFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.gameItem.subscribe(this.loadComponent.bind(this));
  }

  loadComponent(game: GameItem) {
    if (game) {
      const cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(
        game.component
      );
      const viewContainerRef = this.gameHost.viewContainerRef;
      viewContainerRef.clear();
      this.gameRef = viewContainerRef.createComponent(cmpFactory);
    }
    this.gameRef.instance.result.subscribe(result => {
      this.result.emit(result);
    });
  }
}
