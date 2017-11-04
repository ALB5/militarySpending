import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMessage:string;

  constructor(private router: Router) { }

  ngOnInit() {
        let $this = $(".counter"),
        countTo = $this.attr('data-count');

        $(window).on('load', function(){
          $(".loading").remove(),
          $(".enveloppe-site").css("opacity", "1"),
          $(".enveloppe-site").removeClass("preload"),

          $({ countNum: $this.text()}).delay(4000).animate({
            countNum: countTo
          },

          {
            duration: 8000,
            easing:'linear',
            step: function(){
              $this.text("$ " + Math.floor(this.countNum).toLocaleString('fr'));
            },
            complete: function(){
              $this.text("$ " + (this.countNum).toLocaleString('fr')),
              setTimeout(function(){
                $('.message').fadeIn("slow"),
                $('.fleche').delay(1000).fadeIn("slow");
              }, 1000)
          }

        });
      })

      $('.fleche').click(function(){
        document.querySelector('.carte').scrollIntoView({
          behavior: 'smooth'
        })
      })
      //tentative de faire scroller vers le bas en cliquant sur la flèche
      $(function() {
        $('.fleche').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            console.log(target)
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top
              }, 1000);
              return false;
            }
          }
        });
      });



  }

}
