import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable()
export class TicketService {
  private baseURL: any = 'http://localhost:3000/';
  private http: Http;

  constructor(private httpService: HttpClient, http: Http) {
    this.http = http;
  }

  getTickets() {
    return this.http.get(this.baseURL + 'bookedTicket', {});
  }

  addTickets(inputpayload: any) {
    return this.http.post(this.baseURL + 'bookedTicket', inputpayload, {});
  }
  validateLogin() {
    return this.http.get(this.baseURL + 'loginCredentials', {});
  }
}
