import { Component, OnInit } from '@angular/core';
import { BookedSeats } from '../model/BookedSeats';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.scss', '../../assets/css/font-awesome-korean.css']
})
export class TicketPreviewComponent implements OnInit {

  public tickets: BookedSeats;
  constructor() { }

  ngOnInit() {
    this.getTickets();
  }
  getTickets() {
    this.tickets = JSON.parse(localStorage.getItem('Ticket'));
  }
}
