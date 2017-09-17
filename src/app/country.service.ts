import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Country } from './country';
import { Top5 }    from './top5'

@Injectable()
export class CountryService {
  private countriesUrl = '../assets/final.geojson';
  private top5Url = '../assets/top10.json';
  private perCapita = '../assets/percapita.json';
  private evoSpending = '../assets/evoSpending.json';
  private regions = '../assets/regions.json';
  private evoSpending20 = '../assets/evoSpending30.json';

  listDate: Date[] = [];
  date:any;

  constructor(private http: Http) { }

  getCountries():Observable<GeoJSON.FeatureCollection<any>> {
    return this.http.get(this.countriesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getTop5():Observable<Top5[]>{
    return this.http.get(this.top5Url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getCountry(id:any):Observable<Top5>{
    return this.getTop5()
      .map(top5 => top5.find(country => country.id == id));
  }

  getperCapita():Observable<Top5[]>{
    return this.http.get(this.perCapita)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getevoSpending():Observable<Top5[]>{
    return this.http.get(this.evoSpending)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getevoSpending20():Observable<Top5[]>{
    return this.http.get(this.evoSpending20)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getRegions():Observable<Top5[]>{
    return this.http.get(this.regions)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
  let body = res.json();
  return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
