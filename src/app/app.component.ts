import { Component, NgModule, EventEmitter, ChangeDetectorRef }           from '@angular/core';
import { MatIcon, MatIconButtonCssMatStyler, MatIconBase, MatIconModule } from '@angular/material';
import { AnimationEvent, trigger, state, style, group, }                  from '@angular/animations';
import { animate, transition, keyframes, stagger, query}                  from '@angular/animations';
import { MediaMatcher }                                                   from '@angular/cdk/layout';


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

// DEPtH TRANSITIONS
const routerTransition = trigger('routeAnimation', [
  transition('1 => 2, 2 => 3', [
      style({ height: '!' }),
      query(':enter', style({ transform: 'translateX(75%)'})),
      query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
      // animate the leave page away
      group([
          query(':leave', [
             animate('350ms cubic-bezier(.35,1,.35,1)', style({ transform: 'translateX(-100%)'})),
          ]),
          // and now reveal the enter
          query(':enter', [
            animate('350ms cubic-bezier(.35,1,.35,1)', style({ transform: 'translateX(0)'})),
          ]),
      ]),
  ]),
  transition('3 => 2, 2 => 1, * <=> *', [
      style({ height: '!' }),
      query(':enter', style({ transform: 'translateX(-75%)' })),
      query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
      // animate the leave page away
      group([
          query(':leave', [
            animate('350ms cubic-bezier(.35,1,.35,1)', style({ transform: 'translateX(100%)' })),

          ]),
          // and now reveal the enter
          query(':enter', [
            animate('350ms cubic-bezier(.35,1,.35,1)', style({ transform: 'translateX(0)' }))
          ]),
      ]),
  ]),
]);

const routerAnimationFylIn = trigger('routeAnimation', [
  transition('1 => 2, 1 => 3, 1 => 4, 2 => 1, 2 => 3, 2 => 4, 3 => 1, 3 => 2, 3 => 4, 4 => 1, 4 => 2, 4 => 3' , [
      style({ height: '!' }),
      query(':enter', style({ transform: 'translateX(100%)', filter: 'blur(0px)' }), { optional: true }),
      query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 }), { optional: true }),
      // animate the leave page away
      // 1 => 2, 1 => 3, 1 => 4, 2 => 1, 2 => 3, 2 => 4, 3 => 1, 3 => 2, 3 => 4, 4 => 1, 4 => 2, 4 => 3
      group([
          query(':leave', [
            animate('350ms cubic-bezier(.1,1,.1,1)', style({ transform: 'translateX(-100%)', filter: 'blur(0px)' })),
            /*animate(350, keyframes([
              style({opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)', offset: 0}),
              style({ opacity: 1, transform: 'translateY(-100%)', filter: 'blur(3px)', offset: 0.33}),
              style({opacity: 0, transform: 'translateY(-100%)', filter: 'blur(10px)', height: 0, padding: 0, margin: 0, offset: 1})
            ]))*/
          ], { optional: true }),
          // and now reveal the enter
          query(':enter', [
            animate('350ms cubic-bezier(.1,1,.1,1)', style({ transform: 'translateX(0)', filter: 'blur(0px)' }))
            /*animate(350, keyframes([
              style({opacity: 0, transform: 'translateY(100%)', filter: 'blur(10px)', offset: 0}),
              style({opacity: 0.5, transform: 'translateY(-15px)', filter: 'blur(3px)',  offset: 0.33}),
              style({opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)', offset: 0.66}),
              style({opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)', offset: 1.0})
            ]))*/
          ], { optional: true }),
      ]),
  ]),
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [ routerAnimationFylIn ] // , routerTransition
})

export class AppComponent {
  events = [];

  getRouteDepth(outlet) {
    return outlet.activatedRouteData.depth;
  }

  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}



