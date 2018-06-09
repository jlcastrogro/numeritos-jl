import { Component, OnInit, Output, EventEmitter, Type } from '@angular/core';

/**
 * All games must inherit from this. This will be the template for every game.
 */
@Component({
  selector: 'game-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class GameTemplate {
  @Output() result = new EventEmitter<boolean>();
  passed: boolean = false;
  reported: boolean = false;

  constructor() { }

  /**
   * Reports the result of this game. Result must be saved in this.passed.
   */
  report() {
    // Prevents it gets reported twice
    if (!this.reported) {
      this.result.emit(this.passed);
      this.reported = true;
    }
  }
}
