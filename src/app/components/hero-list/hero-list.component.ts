// tslint:disable:import-spacing
import { Component, OnInit, Input, ViewChild }          from '@angular/core';
import { ActivatedRoute }                               from '@angular/router';
import { Location }                                     from '@angular/common';
import { AnimationEvent, trigger, state, style}         from '@angular/animations';
import { animate, transition, keyframes, stagger}       from '@angular/animations';

import { Hero } from '../../classes/hero';
import { HeroService } from '../../services/hero.service';

const ALL_HEROES = [
  'Windstorm',
  'RubberMan',
  'Bombasto',
  'Magneta',
  'Dynama',
  'Narco',
  'Celeritas',
  'Dr IQ',
  'Magma',
  'Tornado',
  'Mr. Nice'
].map(name => new Hero(1, name));

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.less'],
  animations: [
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
  ]
})

export class HeroListComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  animationStarted(event: AnimationEvent) {
    console.warn('Animation started: ', event);
  }

  animationDone(event: AnimationEvent) {
    console.warn('Animation done: ', event);
  }

  canAdd() {
    return this.heroes.length < ALL_HEROES.length;
  }

  canRemove() {
    return this.heroes.length > 0;
  }

  addActive(active = true) {
    const hero = ALL_HEROES[this.heroes.length];
    hero.state = active ? 'active' : 'inactive';
    this.heroes.push(hero);
  }

  addInactive() {
    this.addActive(false);
  }

  remove() {
    this.heroes.length -= 1;
  }

  goBack(): void {
    this.location.back();
  }
}
