import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { CountryService }    from '../country.service';
import { Top5 }              from '../top5';

@Component({
  selector: 'app-affichage-pays',
  templateUrl: './affichage-pays.component.html',
  styleUrls: ['./affichage-pays.component.css']
})
export class AffichagePaysComponent implements OnInit {
  errorMessage:string;
  top5: Top5[] = [];
  selectedCountry: Top5;
  listDate: Date[] = [];
  data:any;
  selectedDate: any;

  listDate2: Date[] = [];

  date:any;

  constructor(
    private router: Router,
    private countryService: CountryService
  ) { }

  ngOnInit():void {
    let listDate:any = [];
    let newListDate:any = [];
    let checkDate = 0;

    this.countryService.getTop5()
     .subscribe(top5 => {
       this.top5 = top5;

      //Afficher les id et les valeurs dans le même ensemble pour pouvoir trier les dépenses
      //Retourne 6 arrays : une pour chaque pays
      this.data = this.top5.map((c) => c.values.map((d) => {
        return {
          id: c.id,
          date: d.date,
          expenditure: (d.expenditure/1000000000)
        }
      }))
      //Concat 6 arrays en une seule
      this.data = [].concat.apply([], this.data);

      //Tri par dépenses
      this.data.sort((a,b) => {
        return a.expenditure < b.expenditure ? 1 :
          (a.expenditure > b.expenditure ? - 1 : 0);
      })

      let date = this.top5.map(d => d.values.filter(date => date.date == date));
      console.log(date);

       //creation de la liste des dates
       this.top5.map((d:any) => {
         d.values.map((d:any)=>{
             listDate.push(d.date);
             listDate.forEach((date:any)=>{
               if(date != checkDate && newListDate.indexOf(date) === -1){
                 checkDate = date;
                 newListDate.push(date);
                 return this.listDate = newListDate;
               }
             })
           })
       }

     );
     },
     error => this.errorMessage = <any>error);
  }

  onSelect(top5: Top5): void {
    this.selectedCountry = top5;
  }

  gotoDetail(): void{
    this.router.navigate(['/detail', this.selectedCountry.id]);
  }

}
