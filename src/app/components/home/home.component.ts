import { Component, OnInit, Input, ViewChild }                from '@angular/core';
import { HostListener, ElementRef }                           from '@angular/core';
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
    query('mat-card', style({ opacity: 0 }), { optional: true }),
    query('.letter', stagger('100ms', [
      animate('500ms 500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])),
    query('mat-card', stagger('100ms', [
        animate('500ms ease-out', style({ opacity: 1 }))
    ]), { optional: true })
  ])
]);

const scrollAnimation = trigger('scrollAnimation', [
  state('show', style({
    opacity: 1 // ,
  })),
  state('hide',   style({
    opacity: 0,
    transform: 'translateX(-100%)'
  })),
  transition('show => hide', animate('700ms cubic-bezier(.1,1,.1,1)')),
  transition('hide => show', animate('700ms cubic-bezier(.1,1,.1,1)'))
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations: [homeAnimation, scrollAnimation],
})

export class HomeComponent implements OnInit {
  homeTitle = 'LARS BECK-FRIIS';
  homeSubTitle = 'Wed developer';
  homeTitleArray = [];
  homeSubTitleArray = [];

  // ANIMATION VARIBALES
  scrollAnimationState = 'hide';
  footerScrollAnimationState = 'hide';

  constructor(public el: ElementRef) { }

  ngOnInit() {
    this.homeTitleArray = this.homeTitle.split('');
    this.homeSubTitleArray = this.homeSubTitle.split('');
  }


  @HostListener('scroll', ['$event']) onElementScroll($event) {
    const componentPosition = this.el.nativeElement.offsetParent.offsetParent.offsetHeight;
    const scrollPosition = $event.path[0].scrollTop;
    // const scrollPosition = window.pageYOffset;
    const halfWindowHeight = window.innerHeight / 2;

    if (scrollPosition  >= (componentPosition - halfWindowHeight)) {
      this.scrollAnimationState = 'show';
    } else {
      this.scrollAnimationState = 'hide';
    }

    if (scrollPosition  >= (2 * componentPosition - halfWindowHeight)) {
      this.footerScrollAnimationState = 'show';
    } else {
      this.footerScrollAnimationState = 'hide';
    }

  }

 /* @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
      console.log('scrolling...');
  }
  */


}
