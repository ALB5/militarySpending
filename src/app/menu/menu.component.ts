import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.fragment.subscribe(f => {
      const element = document.querySelector("#" + f)
      if (element) element.scrollIntoView(element)
    })

    let lastId,
        windowWith = $(window).width();

    let menuLat = $("#menuLat").find("a"),

    scrollItems = menuLat.map(function(){
      let item = $($(this).attr("href"));
      if (item.length) {return item;}
    });

  $(window).scroll(function(){
    let fromTop = $(this).scrollTop()+16;

    let current
    current = scrollItems.map(function(){
      if($(this).offset().top < fromTop)
        return this;
    });

    current = current[current.length-1];
    let id = current && current.length ? current[0].id : "";

    if (lastId !== id){
      lastId = id;

      menuLat
        .removeClass("coche")
        .filter("[href='/home#"+id+"']").addClass("coche");
    }

  });
  }


}
