// tslint:disable:import-spacing
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroesComponent }      from './components//heroes/heroes.component';
import { HeroDetailComponent }  from './components//hero-detail/hero-detail.component';
import { HeroListComponent }    from './components//hero-list/hero-list.component';*/

import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WhyMeComponent } from './components/why-me/why-me.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'why-me', component: WhyMeComponent }
];

export const AppRouting = RouterModule.forRoot(routes, {
  useHash: true
});

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


