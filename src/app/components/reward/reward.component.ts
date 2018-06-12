import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { GameTemplate } from 'app/games/template/template.component';

const coins = [1, 2, 5, 10];

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent extends GameTemplate implements OnInit, OnDestroy {
  @Input() username: string;
  @Input() stars: boolean[];
  sound = new Audio();

  constructor() {
    super();
  }

  ngOnInit() {
    this.sound.src = '/assets/sounds/Win effect.mp3';
    this.sound.load();
    this.sound.play();
  }

  ngOnDestroy() {
    this.sound.pause();
  }

  /**
   * 
   * @param value 
   */
  submit(value: boolean) {
    this.result.emit(value);
  }
}