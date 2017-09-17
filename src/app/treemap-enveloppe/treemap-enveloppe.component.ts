import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import * as $ from 'jquery';


@Component({
  selector: 'app-treemap-enveloppe',
  templateUrl: './treemap-enveloppe.component.html',
  styleUrls: ['./treemap-enveloppe.component.css']
})
export class TreemapEnveloppeComponent implements OnInit {
  showCurrent:boolean = true;
  showPerCapita:boolean = false;

  constructor() { }

  ngOnInit() {
    $(document).on('click', '#current', function(){
      $(".current").addClass("active");
      $(".perCapita").removeClass("active");

      $(".currentTree").show("slow");
      $(".perCapitaTree").hide();
    })

    $(document).on('click', '#perCapita', function(){
      $(".perCapita").addClass("active");
      $(".current").removeClass("active");

      $(".perCapitaTree").show("slow");
      $(".currentTree").hide();
    })
  }

}
