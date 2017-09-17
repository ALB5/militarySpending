import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule }    from './app-routing.module';

import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list.component';
import { CountryService } from './country.service';
import { AffichagePaysComponent } from './affichage-pays/affichage-pays.component';
import { HomeComponent } from './home/home.component';
import { Evolution3Component } from './evolution3/evolution3.component';
import { TreemapComponent } from './treemap/treemap.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { PerCapitaComponent } from './per-capita/per-capita.component';
import { TreemapEnveloppeComponent } from './treemap-enveloppe/treemap-enveloppe.component';
import { EvolutionPastYearComponent } from './evolution-past-year/evolution-past-year.component';
import { RegionComponent } from './region/region.component';
import { MenuComponent } from './menu/menu.component';
import { BasPageComponent } from './bas-page/bas-page.component';
import { EvolutionBubleComponent } from './evolution-buble/evolution-buble.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    AffichagePaysComponent,
    HomeComponent,
    Evolution3Component,
    TreemapComponent,
    CountryDetailComponent,
    PerCapitaComponent,
    TreemapEnveloppeComponent,
    EvolutionPastYearComponent,
    RegionComponent,
    MenuComponent,
    BasPageComponent,
    EvolutionBubleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    CountryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
