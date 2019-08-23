import { Component, OnInit, ViewChild } from '@angular/core';
import { BookedSeats } from '../model/BookedSeats';
import { TicketService } from '../Services/TicketService';
import { ConfirmComponent } from '../confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.scss']
})
export class BookTicketComponent implements OnInit {

  /************************** VARIABLE DECLARATION OKK-18052019 ****************************/
  private seatConfig: any = null;
  private seatmap = [];
  private ticketService: TicketService;
  private tickets: BookedSeats;
  private selectedMovie: string = '0';
  private screenNumber: any;
  private router:Router;
  private movieTimeDropdown: any = '0';

  private seatChartConfig = {
    showRowsLabel : false,
    showRowWisePricing : false,
    newSeatNoForRow : false
  }
  
  private cart = {
    selectedSeats : [],
    seatstoStore : [],
    totalamount : 0,
    subTotal:0,
    cartId : "",
    eventId : 0
  };  

  constructor(ticketService:TicketService,private dialogService:DialogService,
    router:Router){
    this.ticketService = ticketService;
    this.dialogService = dialogService;
    this.router = router;
  }
  ngOnInit(): void {
    /********************* FOR INITIALIZATION OF BOOKING LAYOUT FOR MOVIE OKK-18052019 *********************/
    this.seatConfig = [
      {
        "seat_map": [
          {
            "seat_label": "1",
            "layout": "ggggggggg",
            "seat_price": 320
          },
          {
            "seat_label": "2",
            "layout": "ggggggggg",
            "seat_price": 280
          },
          {
            "seat_label": "3",
            "layout": "ggggggggg",
            "seat_price": 240
          }
        ]
      }
    ]    
  }

  /********************* METHOD TO PROCESSING OF SEAT CHART BASED ON *************************** 
   ********************************** PLATINUM ,GOLD, SILVER OKK-18052019 *********************/
    public processSeatChart ( map_data : any[] ){
      if( map_data.length > 0 ){
        var seatNoCounter = 1;
        for (let __counter = 0; __counter < map_data.length; __counter++) {
          var row_label = "";
          var item_map = map_data[__counter].seat_map;

          //Get the label name and price
          row_label = "Row "+item_map[0].seat_label + " - ";
          if( item_map[ item_map.length - 1].seat_label != " " ){
            row_label += item_map[ item_map.length - 1].seat_label;
            row_label += " : Rs. " + item_map[ item_map.length - 1].seat_price;
          }
          else{
            row_label += item_map[ item_map.length - 2].seat_label;
            row_label += " : Rs. " + item_map[ item_map.length - 1].seat_price;
          }
          var __seat_label;
          for (let __item_counter = 0; __item_counter < item_map.length; __item_counter++) {
            if(item_map[__item_counter].seat_label  === "1"){
              __seat_label = 'A';
            }else if(item_map[__item_counter].seat_label  === "2"){
              __seat_label = 'B';            
            }else if(item_map[__item_counter].seat_label  === "3"){
              __seat_label = 'C';
            }
             
            var mapObj = {
              "seatRowLabel" : __seat_label,
              "seats" : [],
              "seatPricingInformation" : row_label
            };
            row_label = "";
            var seatValArr = item_map[__item_counter].layout.split('');
            if( this.seatChartConfig.newSeatNoForRow ){
              seatNoCounter = 1; //Reset the seat label counter for new row
            }
            var totalItemCounter = 1;
            seatValArr.forEach(item => {
              var seatObj = {
                "key" : item_map[__item_counter].seat_label+"_"+totalItemCounter,
                "price" : item_map[__item_counter].seat_price,
                "status" : "available"
              };
               
              if( item != '_'){
                if(seatNoCounter < 10){
                   seatObj["seatNo"] = "A"+seatNoCounter;
                   seatObj["seatLabel"] = "A"+seatNoCounter;
                }
                else if(seatNoCounter >= 10 && seatNoCounter < 19){
                   seatObj["seatNo"] = "B"+(seatNoCounter-9);
                   seatObj["seatLabel"] = "B"+(seatNoCounter -9);
                }
                else if(seatNoCounter >= 19 && seatNoCounter < 30){ 
                  seatObj["seatNo"] = "C"+(seatNoCounter-18);
                  seatObj["seatLabel"] = "C"+(seatNoCounter -18);
                }
                else { 
                  seatObj["seatNo"] = ""+seatNoCounter;
                  seatObj["seatLabel"] = ""+seatNoCounter;
               }
              seatNoCounter++;
              }
              else{
                seatObj["seatLabel"] = "";
              }
              totalItemCounter++;
              mapObj["seats"].push(seatObj);
            });
            console.log(" \n\n\n Seat Objects " , mapObj);
            this.seatmap.push( mapObj );
          }          
        }
      }
  }
  /************************************ CONFIRMATION METHOD SELECTION OF SEAT  BOOKING PROCESS OKK-18052019 **************************/
  public selectSeat( seatObject : any ){
    console.log( "Seat to block: " , seatObject );
    if(seatObject.status == "available"){
      seatObject.status = "booked";
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
      this.cart.subTotal +=  parseFloat(((seatObject.price)+((seatObject.price*14)/100)+((seatObject.price*0.5)/100)+
          ((seatObject.price*0.5)/100)).toFixed(2));
    }
    else if( seatObject.status = "booked" ){
      seatObject.status = "available";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if( seatIndex > -1){
        this.cart.selectedSeats.splice(seatIndex , 1);
        this.cart.seatstoStore.splice(seatIndex , 1);
        this.cart.totalamount -= seatObject.price;
        this.cart.subTotal -= ((seatObject.price)+((seatObject.price*14)/100)+((seatObject.price*0.5)/100)+
            ((seatObject.price*0.5)/100)).toFixed(2);
      }      
    }
  }
  /************************************ BLOCK SEAT AFTER CONFIRMATION OF SEAT  BOOKING PROCESS OKK-19052019 **************************/
  public blockSeats(seatsToBlock : string,isProcessTickting: boolean){
    if(seatsToBlock != ""){
      var seatsToBlockArr = seatsToBlock.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat =  seatsToBlockArr[index]+"";
        var seatSplitArr = seat.split("_");
        if(isProcessTickting){
          this.tickets = new BookedSeats();
          this.tickets.seatNo =  seatSplitArr[0];
          switch (this.selectedMovie){
            case '1':
              this.tickets.showName = 'Angry Birds 2';
              break;
            case '2':
              this.tickets.showName = 'Mission Mangal';
              break;
              case '3':
              this.tickets.showName = 'Batala House';
              break;
          }
          localStorage.setItem('Ticket', JSON.stringify(this.tickets));
          this.ticketService.addTickets(this.tickets).subscribe(data=>{
            console.log(data);
            this.router.navigate(['/preview']);
            this.showConfirm();
          },error=>{
            console.log(error);
          });
        }
        console.log("Split seat: " , seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if(element.seatRowLabel == seatSplitArr[0][0]){
            var seatObj = element.seats[parseInt(seatSplitArr[0][1]) - 1];
            if(seatObj){
              console.log("\n\n\nFount Seat to block: " , seatObj);
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
              console.log("\n\n\nSeat Obj" , seatObj);
              console.log(this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]);
              break;
            }             
          }
        }       
      }
    } 
  }
  private validTime:boolean;
  /************************************* ON CLICK EVENT FOR BOOK NOW BUTTON OKK-19052019 *******************/
  public processBooking(){
      this.blockSeats(this.cart.selectedSeats.toString(), true);
  }
  /************************************* ON CHANGE EVENT FOR MOVIE NAME DROPDOWN OKK-19052019 *******************/
  onMovieChange(event: any){
  this.seatmap = [];
  this.cart = {
    selectedSeats : [],
    seatstoStore : [],
    totalamount : 0,
    cartId : "",
    subTotal:0,
    eventId : 0
  }
  if(event.target.value != 0){
    this.screenNumber = event.target.value; 
    this.processSeatChart(this.seatConfig);
      this.ticketService.getTickets().subscribe(
        data=>{
          console.log(data);
          if(data.json().length != 0){
            var __str ;
            for (let __counter = 0; __counter < data.json().length; __counter++) {
              if(event.target.value === data.json()[__counter].showName)
                __str = __counter === 0?data.json()[__counter].seatNo:__str += ','+data.json()[__counter].seatNo;            
            }
            this.blockSeats(__str,false);
          }
        },error=>{
          console.log(error);
        }
      );
    }
  }
  showConfirm() {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
        title:'Booking confirmed', 
        message:'Thank you visit again'})
        .subscribe((isConfirmed)=>{
            //We get dialog result
            if(isConfirmed) {
            }
            else {
            }
        });
  }
}
