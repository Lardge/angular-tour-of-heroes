import { Component, NgModule, EventEmitter, ChangeDetectorRef }           from '@angular/core';
import { MatIcon, MatIconButtonCssMatStyler, MatIconBase, MatIconModule } from '@angular/material';
import { AnimationEvent, trigger, state, style, group, }                  from '@angular/animations';
import { animate, transition, keyframes, stagger, query}                  from '@angular/animations';
import { MediaMatcher }                                                   from '@angular/cdk/layout';


// ROUTER TRANSITIONS
const routerTransition_OLD = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    query('.block', style({ opacity: 0 }), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
    ]),
    query(':enter .block', stagger(400, [
      style({ transform: 'translateY(100px)' }),
      animate('1s ease-in-out', style({ transform: 'translateY(0px)', opacity: 1 })),
    ]), { optional: true }),
  ])
]);

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

const routerTransition2 = trigger('routeAnimation', [
  transition('* <=> *', [
      style({ height: '!' }),
      query(':enter', style({ transform: 'translateX(-75%)' }), { optional: true }),
      query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 }), { optional: true }),
      // animate the leave page away
      group([
          query(':leave', [
            // animate('350ms cubic-bezier(.35,1,.35,1)', style({ transform: 'translateX(100%)' })),
            animate(250, keyframes([
              style({opacity: 1, transform: 'translateY(0px)', offset: 0}),
              style({ opacity: 1, transform: 'translateY(-100%)', offset: 0.33}),
              style({opacity: 0, transform: 'translateY(-100%)', height: 0, padding: 0, margin: 0, offset: 1})
            ]))
          ], { optional: true }),
          // and now reveal the enter
          query(':enter', [
            // animate('350ms cubic-bezier(.35,1,.35,1)', style({ transform: 'translateX(0)' }))
            animate(250, keyframes([
              style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
              style({opacity: 0.5, transform: 'translateY(-10px)',  offset: 0.33}),
              style({opacity: 0.75, transform: 'translateY(5px)', offset: 0.66}),
              style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
            ]))
          ], { optional: true }),
      ]),
  ]),
]);


/*

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
          animate(250, keyframes([
            style({opacity: 1, transform: 'translateY(0px)',     offset: 0}),
            style({ opacity: 1, transform: 'translateY(10px)', offset: 0.33}),
            style({opacity: 0, transform: 'translateY(-50%)', height: 0, padding: 0, margin: 0, offset: 1.0})
          ]))
      ])
    ])

*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [ routerTransition2 ] // , routerTransition
})

export class AppComponent {
  // title = 'Portfolio V2';

 /* mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    /*const navigationItems = []
      'home':
        };
  }*/

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }


  // tslint:disable-next-line:use-life-cycle-interface
  /*ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  animationStarted(event: AnimationEvent) {
    console.warn('Animation started: ', event);
  }

  animationDone(event: AnimationEvent) {
    console.warn('Animation done: ', event);
  }*/
}



