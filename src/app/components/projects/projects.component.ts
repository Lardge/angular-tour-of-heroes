import { Component, OnInit }                            from '@angular/core';
import { AnimationEvent, trigger, state, style}         from '@angular/animations';
import { animate, transition, keyframes, stagger}       from '@angular/animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less'],
  /*animations: [
    trigger('flyInOut', [
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
          animate(1250, keyframes([
            style({opacity: 1, transform: 'translateY(0px)',     offset: 0}),
            style({ opacity: 1, transform: 'translateY(10px)', offset: 0.33}),
            style({opacity: 0, transform: 'translateY(-50%)', height: 0, padding: 0, margin: 0, offset: 1.0})
          ]))
      ])
    ])
  ]*/
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  animationStarted(event: AnimationEvent) {
    console.warn('Animation started: ', event);
  }

  animationDone(event: AnimationEvent) {
    console.warn('Animation done: ', event);
  }
}
