import { Component, OnInit } from '@angular/core';

import { CountryService }    from '../country.service';
import { Top5 }              from '../top5';

@Component({
  selector: 'app-evolution-past-year',
  templateUrl: './evolution-past-year.component.html',
  styleUrls: ['./evolution-past-year.component.css']
})
export class EvolutionPastYearComponent implements OnInit {
  errorMessage:string;
  top5:any;
  selectedCountry: Top5;
  listDate: Date[] = [];
  data:any;

  constructor(
    private countryService: CountryService
  ) { }

  ngOnInit() {

    this.countryService.getevoSpending()
     .subscribe(top5 => {
       this.top5 = top5;
       this.data = this.top5.map((d) => {
        return {
          id: d.id,
          evolution: d.evolution
        }
      });

      //Tri par dépenses
      this.data.sort((a,b) => {
        return a.evolution < b.evolution ? 1 :
          (a.evolution > b.evolution ? - 1 : 0);
      })

     },
     error => this.errorMessage = <any>error);
  }

}
