import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';



@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this._animateBackgroundOnMouseMove();
  }


  // (Tutorial)-- "moving background-image on mousemove": https://codepen.io/Mojer/pen/VrqrbN
  private _animateBackgroundOnMouseMove() {
    $(document).ready(function () {
      let movementStrength = 40;
      let height = movementStrength / $(window).height();
      let width = movementStrength / $(window).width();

      $("#auth-container").mousemove(function (e) {
        let pageX = e.pageX - ($(window).width() / 2);
        let pageY = e.pageY - ($(window).height() / 2);
        let newvalueX = width * pageX * -1 - 25;
        let newvalueY = height * pageY * -1 - 50;
        $('#auth-container').css("background-position", newvalueX + "px     " + newvalueY + "px");
      });
    });
  }
}
