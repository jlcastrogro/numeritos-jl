import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { isNumber } from 'util';
import { GameTemplate } from 'app/games/template/template.component';

interface Element {
  id: number;
  value: number;
}

const serieLength = 9;

/**
 * 
 */
@Component({
  selector: 'app-numerical-serie-hard',
  templateUrl: './numerical-serie-hard.component.html',
  styleUrls: ['./numerical-serie-hard.component.css']
})
export class NumericalSerieHardGame extends GameTemplate implements OnInit {
  serie: Element[] = [];
  answer: Element[] = [];
  options: Element[] = [];
  offset: number;

  constructor() {
    super();
  }

  ngOnInit() {
    this.offset = randInt(1, 30);
    // Generates numerical serie
    for (let i = 0; i < serieLength; i++) {
      this.serie.push({
        id: i,
        value: this.offset + i * 2
      });
    }
    // Fills answer and options
    for (let i = 0; i < this.serie.length; i++) {
      if (i < 3 || i === (this.serie.length - 1)) {
        this.answer.push(this.serie[i]);
      } else {
        this.options.push(this.serie[i]);
        this.answer.push(undefined);
      }
    }
    // Some other element
    this.options.push({
      id: this.serie.length,
      value: this.offset - 2
    });
    this.options.push({
      id: this.serie.length,
      value: this.offset + this.serie.length * 2
    });
    // Sorts options to answer it randomly
    this.options.sort(() => Math.random() - 0.5);
  }

  /**
   * Defines options behaviour when an element is dragged from there.
   * @param evt Event resulted from dragging.
   */
  dragFromOption(evt: DragEvent) {
    const value = (<HTMLElement>evt.target).getAttribute('value');
    if (value.length) {
      evt.dataTransfer.setData('option', value);
    }
  }

  /**
   * Defines answers behaviour when an element is dragged from there.
   * @param evt Event resulted from dragging.
   */
  dragFromAnswer(evt: DragEvent) {
    const value = (<HTMLElement>evt.target).getAttribute('value');
    if (value.length) {
      evt.dataTransfer.setData('answer', value);
    }
  }

  /**
   * Defines options behaviour when an element is dropped there.
   * @param evt Event resulted from dragging.
   */
  dropOnOption(evt: DragEvent) {
    const value = evt.dataTransfer.getData('answer');
    if (value.length) {
      const idx = this.answer.findIndex(e => e && e.id === Number(value));
      this.options.push(this.answer[idx]);
      this.answer[idx] = undefined;
    }
  }

  /**
   * Defines answers behaviour when an element is dropped there.
   * @param evt Event resulted from dragging.
   */
  dropOnAnswer(evt: DragEvent) {
    // WARNING: Fragile structure due to direct DOM manipulation
    const serieDiv = document.querySelectorAll('.serie');
    const value = evt.dataTransfer.getData('option');
    let target = <HTMLElement>evt.target;
    // Until it reaches the desired component
    while (target.nodeName !== 'DIV') {
      target = target.parentElement;
    }
    if (value.length && target.children.length === 0) {
      let idx;
      for (let i = 0; i < serieDiv.length; i++) {
        for (idx = 0; idx < serieDiv[i].children.length; idx++) {
          if (serieDiv[i].children[idx] === evt.target) {
            break;
          }
        }
        if (idx !== serieDiv[i].children.length) {
          break;
        }
      }
      const opt = this.options.findIndex(e => e.id === Number(value));
      this.answer[idx] = this.options[opt];
      this.options.splice(opt, 1);
    }
  }

  /**
   * Allows HTML5 drag & drop.
   * @param evt Event resulted from dragging.
   */
  allowDrop(evt: DragEvent) {
    // TODO: Add effects
    evt.preventDefault();
  }

  /**
   * Checks the result and reports the answer.
   */
  submit() {
    for (let i = 0; i < this.serie.length; i++) {
      if (
        !this.answer[i] ||
        this.serie[i].value !== this.answer[i].value
      ) {
        this.passed = false;
        this.report();
        return;
      }
    }

    this.passed = true;
    this.report();
  }
}

/**
 * Provides a random integer from [0, a), or [a, b) if b is provided.
 * @param a If b is not provided then a becomes upper bound: [0, a). If b is
 * provided then bounds will be [a, b).
 * @param b Defines upper bound for this.
 * @returns A random integer in range.
 */
function randInt(a: number, b?: number): number {
  if (b === undefined) {
    b = a;
    a = 0;
  }

  return Math.floor(a + Math.random() * (b - a));
}
