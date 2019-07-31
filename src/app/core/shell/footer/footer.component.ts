import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        // Login screen not use footer
        if (document.getElementById("myBtn")) {
          document.getElementById("myBtn").style.display = "block";
        }
      } else {
        if (document.getElementById("myBtn")) {
          document.getElementById("myBtn").style.display = "none";
        }
      }
    };
  }

  /**
   * When the user clicks on the button, scroll to the top of the document
   *
   * @memberof FooterComponent
   */
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
