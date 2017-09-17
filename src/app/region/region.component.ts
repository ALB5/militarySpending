import { Component, OnInit } from '@angular/core';

import * as d3                    from 'd3';
import * as d3Scale               from 'd3';
import * as d3Array               from 'd3';
import * as d3Axis                from 'd3';

import { CountryService } from '../country.service';
import { Top5 }           from '../top5';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  top5: Top5[] = [];

  private data:any;

  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 50, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  private tooltip: any;

  constructor(private countryService: CountryService) { }

  ngOnInit() {

    this.countryService.getRegions()
      .subscribe(top5 => {
        this.top5 = top5;
        this.data = this.top5.map((d) => {
          return {
            region: d.region,
            somme: +d.somme/1000
          }
        });
    this.buildGraph();
  });
}

private buildGraph():void {
  this.svg = d3.select(".region-graph")

  this.width = parseInt(d3.select('.region-graph').style('width'), 10) - this.margin.left - this.margin.right;
  this.svg.attr("width", this.width + this.margin.left + this.margin.right),
  this.height = parseInt(d3.select('.region-graph').style('height'), 10)- this.margin.top - this.margin.bottom;
  this.svg.attr("height", this.height + this.margin.top + this.margin.bottom);

  this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
  this.y = d3.scaleLinear().rangeRound([this.height,0]),

  this.g = this.svg.append("g")
    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
    .attr("class", "contenu-graph-region");

  this.x.domain(this.data.map((d) => d.region));
  this.y.domain([0, d3.max(this.data, (d:any) => d.somme)+50]);

  let format;
  format = d3.formatLocale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  }).format("$,d");

  this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x));

  this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(this.y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .attr("fill", "#696969")
      .text("Expenditure - Billion $");

  //this.tooltip = d3.select(".contenu-graph-region")
    //.append("div")
    //.attr("class", "tooltip")
    //.attr("display", "none");


  let regions = this.g.selectAll(".bar")
    .data(this.data)
    .enter().append("g")

  this.tooltip = regions.append("text")
      .attr("class", "tooltip")
      .attr("display", "none")

  regions.append("rect")
      .attr("class", "bar")
      .attr("x", (d) => this.x(d.region) )
      .attr("y", (d) => this.y(d.somme) )
      .attr("width", this.x.bandwidth())
      .attr("height", (d) => this.height - this.y(d.somme))
      .on("mousemove", (d:any) => {
        this.tooltip
          //On ajoute this.x.bandwidth()/4 pour centrer les étiquettes
          .attr("transform", "translate(" + (this.x(d.region)+(this.x.bandwidth()/4)) + "," + (this.y(d.somme)-5) + ")")
          .attr("display", "inline-block")
          .text(format(d.somme)+"B");
      })
      .on("mouseout", (d) => {
        this.tooltip.attr("display", "none")
      })
}

onResize(event){
  d3.selectAll(".contenu-graph-region").remove();
  this.buildGraph();
}


}
