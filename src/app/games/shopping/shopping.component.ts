import { Component, OnInit, Output, EventEmitter } from '@angular/core';

const coins = [1, 2, 5, 10];

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  @Output() passed = new EventEmitter<boolean>();
  opA = 1;
  opB = 1;
  res = '';
  result: boolean;

  constructor() { }

  ngOnInit() {
    this.opA = coins[randInt(coins.length)];
    this.opB = coins[randInt(coins.length)];
    this.res = '';
   }

  submit(evt: KeyboardEvent) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      // this.result = Number(this.res) === (this.opA + this.opB);
      this.passed.emit(this.result = Number(this.res) === (this.opA + this.opB));
    }
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
