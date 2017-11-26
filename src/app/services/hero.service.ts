import { Injectable, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Hero } from '../classes/hero';
import { HEROES } from '../data/mock-heroes';
import { MessageService } from '../services/message.service';
import { MatMenuTrigger } from '@angular/material';

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

@Injectable()
export class HeroService {

  heroes: Hero[] = [];

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

/*   canAdd() {
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
  } */
}
