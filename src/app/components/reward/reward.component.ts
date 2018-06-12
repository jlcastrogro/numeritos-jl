import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GameTemplate } from 'app/games/template/template.component';

const coins = [1, 2, 5, 10];

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent extends GameTemplate implements OnInit {
  @Input() username: string;
  @Input() stars: boolean[];

  constructor() {
    super();
  }

  ngOnInit() {

  }

  /**
   * 
   * @param value 
   */
  submit(value: boolean) {
    this.result.emit(value);
  }
}