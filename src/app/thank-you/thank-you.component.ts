import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss', '../../assets/bootstrap.css']
})
export class ThankYouComponent implements OnInit {
  public router: Router;

  constructor(private ngxRouter: Router) {
    this.router = ngxRouter;
   }

  ngOnInit() {
  }
  /*************************** ON CLICK HOME PAGE BUTTON OKK-19052019 **********************************/
  onHomePageClick() {
    this.router.navigate(['/book-ticket']);
  }
}
