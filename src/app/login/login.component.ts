import { Component, OnInit } from '@angular/core';
import { TicketService } from '../Services/TicketService';
import { Router } from '@angular/router';
import { Login } from '../model/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
  '../../assets/css/style.css'
  ]
})
export class LoginComponent implements OnInit {
  private ticketService: TicketService;
  private router: Router;
  private login: Login;

  public usernameInputEL: any = '';
  public passwordInputEL: any = '';
  public validUser: boolean;
  public validPassword: boolean;

  constructor(ticketService: TicketService, router: Router) {
    this.ticketService = ticketService;
    this.router = router;
  }

  ngOnInit() {
    this.login = new Login();
  }

  public onSignin() {

      if (this.login.username.length === 0) {
          this.validUser = true;
      } else if (this.login.password.length === 0) {
        this.validUser = false;
        this.validPassword = true;
      } else {
        this.validPassword = false;
        this.ticketService.validateLogin().subscribe(data => {
          console.log(data);
          if (this.login.username === data.json().username && this.login.password === data.json().password) {
            this.router.navigate(['/book-ticket']);
          }
        }, error => {
          console.log(error + 'Login component');
        });
      }
    }
  }
