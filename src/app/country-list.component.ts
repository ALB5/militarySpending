import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Country }           from './country';
import { CountryService }    from './country.service';
import * as L from 'leaflet';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})

export class CountryListComponent implements OnInit {
  errorMessage:string;
  data: GeoJSON.FeatureCollection<any>;

  constructor (
    private router: Router,
    private countryService: CountryService
  ) {}

  ngOnInit() {

    this.getCountries();
  }

  getCountries() {
    this.countryService.getCountries()
                       .subscribe(data => {
                          this.data = data;
                          let myCustomStyle = {
                                stroke: true,
                                fill: true,
                                fillColor: '#fff',
                                fillOpacity: 1
                            }

                          let map:any;
                          map = L.map('map', {scrollWheelZoom :false}).setView([25.000, 0.000], 2.4);

                          function getColor(d){
                              return d > 100000 ? '#b10026':
                                    d > 50000 ? '#e31a1c':
                                    d > 10000 ? '#fc4e2a':
                                    d > 5000 ? '#fd8d3c':
                                    d > 1000 ? '#feb24c':
                                    d === "data unavailable"? '#ffffb2':
                                                '#fed976';
                            }

                            function style(feature){
                              return{
                                fillColor: getColor(feature.properties.expenditure),
                                weight:2,
                                opacity : 1,
                                color: 'white',
                                dashArray: '3',
                                fillOpacity: 0.7
                              };
                            }
                            L.geoJSON(this.data, {style: style}).addTo(map);

                            let geojson;
                            function highlightFeature(e){
                              var layer = e.target;

                              layer.setStyle({
                                weight: 5,
                                color: '#d3d3d3',
                                dashArray: '',
                                fillOpacity: 0.7

                              });

                              if (!L.Browser.ie && !L.Browser.edge) {
                                layer.bringToFront();
                              }

                              info.update(layer.feature.properties);
                            }

                            function resetHighlight(e){
                              geojson.resetStyle(e.target);
                              info.update();
                            }

                            function zoomToFeature (e){
                              map.fitBound(e.target.getBounds());
                            }

                            function onEachFeature(feature, layer){
                              layer.on({
                                mouseover: highlightFeature,
                                mouseout: resetHighlight,
                                click: zoomToFeature
                              });
                            }

                            geojson = L.geoJSON(this.data, {
                              style: style,
                              onEachFeature: onEachFeature
                            }).addTo(map);

                            let info:any;
                            info = new L.Control();

                            info.onAdd = function(map){
                              this._div = L.DomUtil.create('div', 'info');
                              this.update();
                              return this._div;
                            };

                            info.update = function(props){
                              this._div.innerHTML = '<h4>Military spendings around the world</h4>' + (props ? '<b>' + props.name + '</b><br />' + (props.expenditure == "data unavailable"? props.expenditure : props.expenditure + ' millions dollars') : 'Hover over a country');
                            };

                            info.addTo(map);

                            let legend:any;
                            legend = new L.Control({position: 'bottomright'});

                            legend.onAdd = function (map){
                              var div = L.DomUtil.create('div', 'info legend'),
                                grades = [0, 1000, 5000, 10000, 50000, 100000 ],
                                labels = [];

                              div.innerHTML += '<i style="background: white"></i>Data Unavailable<br>'
                              for (var i = 0; i < grades.length; i++){
                                div.innerHTML += '<i style="background: ' + getColor(grades[i] + 1) +'"></i>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                              }



                              return div;
                            };
                            legend.addTo(map);
                        },
                         error => this.errorMessage = <any>error);

  }

}
