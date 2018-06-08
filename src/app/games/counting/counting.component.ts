import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameTemplate } from 'app/games/template/template.component';

// Defines the available animals
const animals: string[] = ['pig', 'cat', 'dog', 'cow', 'rabbit'];
// Defines the maximum number of animals which can be displayed
const maxAnimals = 16;
// Defines the total number of options
const totalOptions = 3;

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingGame extends GameTemplate implements OnInit {
  options = [];
  animals = [];
  targetAnimal = 'unknown';
  xAnimal = 'unknown';
  answer = 0;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.selectAnimals();
    this.distributeAnimals();
    // Filling available options
    this.options.push(this.answer, this.answer + 1, this.answer - 1);
    // Randomly sorts the array of options
    this.options.sort(() => Math.random() - 0.5);
  }

  /**
   * Chooses the target animal and the animal which will be the intruder on
   * this game.
   */
  selectAnimals() {
    // Selecting target animal
    const target = randInt(animals.length);
    // Selecting the animal that is not the target animal (:p)
    let notTarget: number;
    while ((notTarget = randInt(animals.length)) === target) {}

    // Adding respective string
    this.targetAnimal = animals[target];
    this.xAnimal = animals[notTarget];
  }

  /**
   * Distributes randomly the two animals selected on the field.
   */
  distributeAnimals() {
    for (let i = 0; i < maxAnimals; i++) {
      const foo = randInt(3);
      switch (foo) {
        case 0:
          this.animals.push(this.targetAnimal);
          this.answer++;
          break;
        case 1:
          this.animals.push(this.xAnimal);
          break;
        default:
          this.animals.push(undefined);
          break;
      }
    }
  }

  /**
   * Triggers when an answer is clicked. It emits a notification to parent
   * component with the result of the game (true if passed, false otherwise).
   * @param i The value of the answer clicked.
   */
  select(i) {
    this.passed = i === this.answer
    this.report();
  }
}

/**
 * Provides a random integer from [0, a), or [a, b) if b is provided.
 * @param a If b is not provided then a becomes upper bound: [0, a). If b is
 * provided then bounds will be [a, b).
 * @param b Defines upper bound for this.
 */
function randInt(a: number, b?: number): number {
  if (b === undefined) {
    b = a;
    a = 0;
  }

  return Math.floor(a + Math.random() * (b - a));
}
