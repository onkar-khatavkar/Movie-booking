import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketService } from './Services/TicketService';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular-custom-modal';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './confirm.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { LoginComponent } from './login/login.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TicketPreviewComponent } from './ticket-preview/ticket-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    ThankYouComponent,
    BookTicketComponent,
    LoginComponent,
    TicketPreviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ModalModule,
    BootstrapModalModule.forRoot({container: document.body}),
    HttpModule,
    TooltipModule,
    ReactiveFormsModule
  ],
  providers: [TicketService],
  bootstrap: [AppComponent],
  entryComponents : [ConfirmComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AppModule { }
