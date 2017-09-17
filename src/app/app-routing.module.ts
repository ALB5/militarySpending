import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

import { HomeComponent }              from './home/home.component';
import { CountryDetailComponent }     from './country-detail/country-detail.component';
import { RegionComponent }            from './region/region.component';
import { TreemapEnveloppeComponent }  from './treemap-enveloppe/treemap-enveloppe.component';
import { CountryListComponent }       from './country-list.component';
import { Evolution3Component }        from './evolution3/evolution3.component';
import { EvolutionPastYearComponent } from './evolution-past-year/evolution-past-year.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home',       component: HomeComponent},
  { path: 'detail/:id', component: HomeComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
