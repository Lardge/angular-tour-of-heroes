// tslint:disable:import-spacing
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';
import { Location }                 from '@angular/common';

import { Hero }                     from '../../classes/hero';
import { HeroService }              from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})
export class HeroDetailComponent implements OnInit {

    @Input() hero: Hero;

    constructor(
      private route: ActivatedRoute,
      private heroService: HeroService,
      private location: Location
    ) {}

    ngOnInit() {
      this.getHero();
    }

    getHero(): void {
      // The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
      const id = +this.route.snapshot.paramMap.get('id');
      this.heroService.getHero(id).subscribe(hero => this.hero = hero);
    }

    goBack(): void {
      this.location.back();
    }
}