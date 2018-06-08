import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'game-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class GameTemplate implements OnInit {
  @Output() result = new EventEmitter<boolean>();
  correctAnswer = new Audio();
  passed: boolean = false;

  constructor() { }

  ngOnInit() {
    this.correctAnswer.src = '/assets/sounds/Correct answer.mp3';
    this.correctAnswer.load();
  }

  report() {
    if (this.passed) {
      this.correctAnswer.play();
    }

    this.result.emit(this.passed);
  }
}
