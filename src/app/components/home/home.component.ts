import { Component, OnInit, Input, ViewChild }                from '@angular/core';
import { ActivatedRoute }                                     from '@angular/router';
import { Location }                                           from '@angular/common';
import { AnimationEvent, trigger, state, style, query}        from '@angular/animations';
import { animate, transition, keyframes, stagger, group}      from '@angular/animations';

// CONSTANT ANIMATIONS
const flyInOutAnimation = trigger('flyInOut', [
  state('in', style({transform: 'translateY(0)'})),
  transition('void => *', [
      animate(250, keyframes([
        style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
        style({opacity: 0.5, transform: 'translateY(-10px)',  offset: 0.33}),
        style({opacity: 0.75, transform: 'translateY(5px)', offset: 0.66}),
        style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
      ]))
  ]),
  transition('* => void', [
      animate(250, keyframes([
        style({opacity: 1, transform: 'translateY(0px)',     offset: 0}),
        style({ opacity: 1, transform: 'translateY(10px)', offset: 0.33}),
        style({opacity: 0, transform: 'translateY(-50%)', height: 0, padding: 0, margin: 0, offset: 1.0})
      ]))
  ])
]);

// CONST
const homeAnimation = trigger('homeAnimation', [
  transition('* => *', [
    query('.letter', style({ opacity: 0, transform: 'translateY(-75%)'})),
    query('.letter', stagger('100ms', [
      animate('500ms 500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      /*/animate('1s ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
        style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
      ]))*/
    ]))
  ])
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations: [homeAnimation]
})

export class HomeComponent implements OnInit {
  homeTitle = 'LARS BECK-FRIIS';
  homeSubTitle = 'Wed developer';
  homeTitleArray = [];
  homeSubTitleArray = [];

  constructor() { }

  ngOnInit() {
    this.homeTitleArray = this.homeTitle.split('');
    this.homeSubTitleArray = this.homeSubTitle.split('');
  }

  animationStarted(event: AnimationEvent) {
    console.warn('Animation started: ', event);
  }

  animationDone(event: AnimationEvent) {
    console.warn('Animation done: ', event);
  }
}
