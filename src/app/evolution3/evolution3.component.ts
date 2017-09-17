import { Component, OnInit, OnChanges }      from '@angular/core';
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
  selector: 'app-evolution3',
  templateUrl: './evolution3.component.html',
  styleUrls: ['./evolution3.component.css']
})
export class Evolution3Component implements OnInit {
  top5: Top5[] = [];

  data: any;
  dataf: any;

  svg: any;
  margin = {top: 20, right: 300, bottom: 30, left: 50};
  g: any;
  width: number;
  height: number;
  x:any;
  y:any;
  z:any;
  line:any;
  maxY:any;
  d:any;
  i:any;
  d1:any;
  d0:any;
  bisectDate:any;
  x0:any;
  pos:any;

  constructor(private countryService: CountryService) { }

  ngOnInit():void {
    let paysList:any = [];
    let date;

    let parseTime = d3.timeParse("%Y");
    this.bisectDate = d3.bisector(function(d:any) { return d.date; }).left;

    this.countryService.getTop5()
      .subscribe(top5 => {
        this.top5 = top5;

        //formatage de la date
        top5.map((d) => d.values.map((d:any) => {
          date = parseTime(d.date);
          d.date = date;
          return d.date;
        }));

        //remodelage de l'objet pour formater "expenditure" et ajouter le paramètre "visible"
        this.dataf = top5.map((id:any) => {
            return {
              id: id.id,
              values: id.values.map((d) => {
                return {date: d.date, expenditure: +d.expenditure/1000000000}
              }),
              visible: ((id.id === "USA" || id.id === "China" || id.id === "Russia") ? true: false) // "visible": all false except
            }

        })

        this.buildGraph();
      })
  }

  private buildGraph(){
    this.data = this.dataf.map((v:any) => v.values.map((v:any) => v.date ))[0];

    this.initChart();
    this.drawAxis();
    this.drawPath();
  }

  private initChart(): void {
    this.svg = d3.select(".graph2");

    //Paramétrage de la dimension du graph pour qu'il soit responsive.
    //Sélectionne le largeur de '.contenu-evolution' puis il l'applique au graph.
    this.width = parseInt(d3.select('.contenu-evolution').style('width'), 10) - this.margin.left - this.margin.right;
    this.svg.attr("width", this.width + this.margin.left + this.margin.right);
    this.height = parseInt(d3.select('.enveloppe-evolution').style('height'), 10) -this.margin.top -this.margin.bottom;
    this.svg.attr("height", this.height + this.margin.top + this.margin.bottom);

    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      .attr("class", "contenu-graph")

    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.z = d3.scaleOrdinal(d3.schemeCategory10);

    this.line = d3.line()
                   .curve(d3.curveBasis)
                   .x( (d: any) => this.x(d.date) )
                   .y( (d: any) => this.y(d.expenditure) )
                   .defined((d:any) => {return d.expenditure});

    //définition d'une valeur de y par défaut
    this.y.domain([0,900])

    this.x.domain(d3.extent(this.data, (d: Date) => d));

    this.z.domain(this.dataf.map((d:any) => {return d.id}));
  }

  private drawAxis(): void {

    this.g.append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "#eee")

    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));

    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#696969")
      .text("Expenditure - Billion $");

  }

  private drawPath(): void {
    let countries = this.g.selectAll(".country")
      .data(this.dataf)
      .enter().append("g")
      .attr("class", "country");

    countries.append("path")
      .attr("class", "line")
      .attr("d", (d:any) => {return d.visible ? this.line(d.values) : null;})
      .attr("clip-path", "url(#clip)")
      .style("stroke", (d:any) => this.z(d.id) );

    //tooltips
    let format;
    format = d3.formatLocale({
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["$", ""]
    }).format("$,d");


    let focus = countries.append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", this.height)
        .style("display", (d:any) => {return d.visible ? "block" : "none"});

    //A voir si cet étélemnt est indispendable;
   //focus.append("line")
         //.attr("class", "y-hover-line hover-line")
         //.attr("x1", this.width)
         //.attr("x2", this.width);


   focus.append("circle")
         .attr('r', 7.5)
         .style("display", (d:any) => {return d.visible ? "block" : "none";})
         .style("stroke", (d:any) => this.z(d.id))
         .style("stroke-width", 5)
         .style("fill", "#EEEEEE");

   focus.append("text")
         .attr("x", 15)
         .attr("dy", ".31em")
         .style("display", (d:any) => {return d.visible ? "block" : "none";});

    //On redéfinit les variables dont on a besoin afin d'éviter les conflits avec "this" Dans
    //d3.mouse(this)
    let heightThis = this.height;
    let widthThis = this.width;
    let ythis = this.y
    let xthis = this.x
    //
    let bisectDate = d3.bisector(function(d:any) {return d.date; }).left;

    this.svg.append('rect')
      .attr("transform", "translate(" + this.margin.left + ","+this.margin.top+")")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .attr("class", "mouseZone")
      .on("mouseout", function(){
        focus.style("display", "none");

      })
      .on("mouseover", function(){
        focus.style("display", null);
      })
      .on("mousemove", mousemove);

      //A FAIRE : faire en sorte de ne pas répéter le code à deux reprises.
      //Se renseigner sur comment créer une fonction.
      function mousemove(){
        //X0 renvoie la date qui correspond à l'emplacement de la souris :
        let x0 = xthis.invert(d3.mouse(this)[0]);

        function manipulateData(data){
          //i renvoie l'index de la date.Dans ce cas, 1988 = 1, 1989=2 etc.
          let i = bisectDate(data.values, x0, 1),
              //d0 renvoie l'array (date + expenditure) à la date selectionnée
              d0 = data.values[i - 1],
              //d1 renvoie l'array (date + expenditure) de la date d+1
              d1 = data.values[i],
              //d fait calcul si X0 - la date de D0 est supérieurs à la date de d1 - X0
              //si c'est le cas, il renvoie d1 sinon il renvoie d0
              d = x0 - d0.date > d1.date - x0 ? d1 : d0;
          return d;
        }

        focus.attr("transform", function (data:any) {
            let d = manipulateData(data);
            return data.visible ? "translate("+ xthis(d.date) + "," + ythis(d.expenditure) + ")" : null;
          })
        focus.select('text').text(function (data:any){
          //On applique le format sur "Expenditure"
          return format(manipulateData(data).expenditure)+"B";
        })
        focus.select(".x-hover-line").attr("y2", function(data:any){
          return heightThis - ythis(manipulateData(data).expenditure);
        })
      }



    //légende
    let countriesId = this.dataf.map((id) => {return id.id})
    let legendSpace = this.height / countriesId.length;
    countries.append("circle")
      .attr("r", 7.5)
      .attr("cx", this.width + (this.margin.right/4) - 15)
      .attr("cy", (d, i) => {return (legendSpace)+i*(legendSpace)-8})
      .attr("fill", (d:any) => { return d.visible ? this.z(d.id) : "#F1F1F2";} )
      .attr("class", "legend-box")
      .on("click", (d) => {
        d.visible = !d.visible;

        this.maxY = findMaxY(this.dataf);
        this.y.domain([0, this.maxY]);
        this.svg.select(".axis.axis--y")
          .transition()
          .call(d3Axis.axisLeft(this.y));

        countries.select("path")
          .transition()
          .attr("d", (d) => {
            return d.visible ? this.line(d.values) : null;
          });

        countries.selectAll("circle")
          .transition()
          .attr("fill", (d) => {
            return d.visible ? this.z(d.id) : "#F1F1F2";
          });

        focus.selectAll("line, circle, text")
          .style("display", (d:any) => {return d.visible ? "block" : "none"});


        //Pour mettre à jour le l'étiquette, il suffit juste de réactiver la fonction mousemove.
        this.svg.select('.mouseZone')
          .on("mousemove", mousemove)


      })

      //texte de la légende
      countries.append("text")
        .attr("x", this.width + (this.margin.right/3))
        .attr("y", (d, i) => {return (legendSpace)+i*(legendSpace); })
        .attr("class", "text")
        .text((d) => { return d.id})

      let maxYValues:any;
      function findMaxY(data){
        maxYValues = data.map((d) => {
          if (d.visible){
            return d3.max(d.values, ((value:any) => {
              return value.expenditure;
            }))
          }
        });
        return d3.max(maxYValues);
      }

  }

  onResize(event){
    d3.selectAll(".contenu-graph").remove();
    this.buildGraph();
  }





}
