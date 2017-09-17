import { Component, OnInit } from '@angular/core';
import * as d3                    from 'd3';
import * as d3Scale               from 'd3';
import * as d3Shape               from 'd3';
import * as d3Array               from 'd3';
import * as d3Axis                from 'd3';
import * as d3Selection           from 'd3';
import * as d3Timeformat          from 'd3';
import * as d3Format              from 'd3';
import * as d3Hierarchy           from 'd3';

import { CountryService } from '../country.service';
import { Top5 }           from '../top5';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.css']
})

export class TreemapComponent implements OnInit {
  top5: Top5[] = [];

  dataf:any;
  data:any;
  width: number;
  height: number;
  color:any;
  div:any;
  x0:any;
  y0:any;
  x1:any;
  y1:any;

  constructor(private countryService: CountryService) { }

  ngOnInit():void {
    this.countryService.getTop5()
      .subscribe(top5 => {
        this.top5 = top5;
        this.dataf = this.top5.map((id) => id.values.map((d) => {
          return {
            id: id.id,
            expenditure: +d.expenditure,
            date: d.date
          }
        }))
        this.dataf = [].concat.apply([], this.dataf);

        this.dataf = this.dataf.filter((date) => {
          return  date.date === 2016;
        });
        this.buildGraph();
      })
  }

  private buildGraph():void{
    this.width = parseInt(d3.select('.region-graph').style('width'), 10);
    this.height = parseInt(d3.select('.container-treemap').style('height'), 10);

    let svg
    svg = d3.select(".container-treemap");

    let format;
    format = d3.formatLocale({
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["$", ""]
    }).format("$,d");

    let color;
    color = d3.scaleOrdinal(["#62181D","#623638", "#AF090F", "#AF2B33","#E23742", "#E77D84"]);

    let treemap;
    treemap = d3.treemap()
    .tile(d3.treemapResquarify)
    .size([this.width, this.height])
    .padding(1)
    .round(true);

    let root;
    root = d3.hierarchy({values:this.dataf}, (d) => {return d.values})
      .sum((d:any) => {return d.expenditure ;})
      .sort((a:any, b:any) => {return b.height - a.height || b.value - a.value;});

    treemap(root);

    let node = svg.selectAll("g")
      .data(root.leaves())
      .enter().append("g")
        .attr("transform", function(d:any) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
        .attr("class", "carre");

    node.append("rect")
      .attr("class", "node")
      .attr("width", (d:any) => { return d.x1 - d.x0 })
      .attr("height", (d:any) => { return d.y1 - d.y0 })
      .attr("id", (d:any) => {return d.data.id;})
      .attr("fill", (d:any) => { return color(d.data.id);})


    node.append("text")
      .attr("class", "node-label")
      .text((d) => { return d.data.id })
      .attr("x", 4)
      .attr("y", 20)
      .attr("fill", "white");

    node.append("text")
      .attr("class", "node-value")
      .text((d) => {return format(d.value/1000000000) + "B"; })
      .attr("x", 4)
      .attr("y", 45)
      .attr("fill", "white");
  }

  onResize(event){
    d3.selectAll(".carre").remove();
    this.buildGraph();
  }

}
