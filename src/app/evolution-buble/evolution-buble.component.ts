import { Component, OnInit} from '@angular/core';

import * as d3                    from 'd3';
import * as d3Scale               from 'd3';
import * as d3Shape               from 'd3';
import * as d3Array               from 'd3';
import * as d3Axis                from 'd3';
import * as d3Selection           from 'd3';
import * as d3Timeformat          from 'd3';
import * as d3Format              from 'd3';
import * as d3Event               from 'd3';

import { CountryService } from '../country.service';
import { Top5 }           from '../top5';

@Component({
  selector: 'app-evolution-buble',
  templateUrl: './evolution-buble.component.html',
  styleUrls: ['./evolution-buble.component.css']
})
export class EvolutionBubleComponent implements OnInit {

  top5:any;
  svg:any;
  width:any;
  height:any;

  color:any;
  pack:any;

  constructor(private countryService: CountryService) {}

  ngOnInit() {

    this.countryService.getevoSpending20()
    .subscribe(top5 => {
      this.top5 = top5;
      this.top5 = this.top5.map((d:any) => {
        return {
          id: d.id,
          evolution: +d.evolution
        }
      })
      this.buildGraph();
    })
  }

  private buildGraph(): void{
    this.initChart();
    this.createBubble();
  }

  private initChart():void {
    this.svg = d3.select(".graph-bubble");

    //Paramétrage de la dimension du graph pour qu'il soit responsive.
    //Sélectionne le largeur de '.contenu-evolution' puis il l'applique au graph.
    this.width = parseInt(d3.select('.contenu-graph-bubble').style('width'), 10);
    this.svg.attr("width", this.width);
    this.height = parseInt(d3.select('.contenu-graph-bubble').style('height'), 10);
    this.svg.attr("height", this.height);

    this.color = d3.scaleOrdinal(["#0A2A3D","#165E89", "#284556", "#3F6E89","#2292D6"]);

    this.pack = d3.pack()
      .size([this.width, this.height])
      .padding(1.5);
  }

  private createBubble():void{
    let format;
    format = d3.format(".2p");

    let root;
    root = d3.hierarchy({values: this.top5}, (d) => {return d.values})
      .sum((d:any) => {return d.evolution; });

    let nodeBubble = this.svg.selectAll(".nodesBubble")
      .data(this.pack(root).leaves())
      .enter().append("g")
        .attr("class", "nodesBubble")
        .attr("transform", (d:any)=> {return "translate(" + d.x + "," + d.y +")"; });

    nodeBubble.append("circle")
      .attr("class", "circleBubble")
      .attr("id", (d) => {return d.data.id; })
      .attr("r", (d) => {return d.r})
      .style("fill", (d) => {return this.color(d.data.id)})


    nodeBubble.append("clipPath")
      .attr("id", (d) => {return "clip-" + d.data.id ;})
      .append("use")
      .attr("xlink:href", (d) => {return "#" + d.data.id ;})

    nodeBubble.append("text")
      .append("tspan")
      .attr("class", "node-name")
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", (d) => -d.r/5)
      .attr("fill", "white")
      .attr("font-size", (d) => d.r/4)
      .text((d) => d.data.id);

    nodeBubble.append("text")
      .attr("class", "node-bubble-value")
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", (d) => d.r/5)
      .attr("fill", "white")
      .attr("font-size", (d) => d.r/4)
      .text((d) => "+" + format(d.value));

      nodeBubble
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)

      function mouseover(){

        let self;
        self = this;
        //on contrôle si "this" renvoie bien le bon objet (this:any)
        d3.select(self.firstChild).transition()
          .attr("r", (d:any) => d.r*1.2)
        d3.select(self.children[2].children[0]).transition()
          .attr("font-size", (d:any) => d.r/3)
        d3.select(self.children[3]).transition()
          .attr("font-size", (d:any)=> d.r/3)
        //on fait passer l'élément sélectionné en premier pour qu'il apparaisse devant les autres bulles
        self.parentNode.appendChild(self);
      }

      function mouseout(){
        let self;
        self = this;
        d3.select(self.firstChild).transition()
          .attr("r", (d:any) => {return d.r})
        d3.select(self.children[2].children[0]).transition()
          .attr("font-size", (d:any) => d.r/4)
        d3.select(self.children[3]).transition()
          .attr("font-size", (d:any)=> d.r/4)
      }
  }

  onResize(event){
    d3.selectAll(".nodesBubble").remove();
    this.buildGraph();
  }

}
