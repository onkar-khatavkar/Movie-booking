import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BookTicketComponent } from './book-ticket.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend} from '@angular/http';
import { TicketService } from '../Services/TicketService';
import { of } from 'rxjs'; // Add imports
import { By } from '@angular/platform-browser';
import { DialogService } from 'ng2-bootstrap-modal';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../login/login.component';
import { TicketPreviewComponent } from '../ticket-preview/ticket-preview.component';
import { ThankYouComponent } from '../thank-you/thank-you.component';
import { AppComponent } from '../app.component';

describe('BookTicketComponent', () => {
  let ticketService: TicketService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookTicketComponent,
        LoginComponent,
        TicketPreviewComponent,
        ThankYouComponent,
        AppComponent
      ],
      imports: [ HttpClientTestingModule, AppRoutingModule  ],
      providers: [
        TicketService,
        DialogService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backend, defaultOptions);
            }
         }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BookTicketComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(BookTicketComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Movie Ticket Booking');
  });
});
