import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Observable }             from 'rxjs/Observable';

import { CountryService }         from '../country.service';
import { Top5 }                   from '../top5';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  top5: Top5;

  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void{
    let id = this.route.params
      .switchMap((params: Params) => this.countryService.getCountry(params['id']))
      .subscribe(top5 => this.top5 = top5);
    console.log(id);
  }

  goBack(): void {
    this.location.back();
  }

}
