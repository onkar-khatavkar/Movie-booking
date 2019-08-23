import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TicketService } from '../Services/TicketService';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend} from '@angular/http';
import { LoginComponent } from './login.component';
import { of } from 'rxjs'; // Add imports
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement  } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ThankYouComponent } from '../thank-you/thank-you.component';
import { BookTicketComponent } from '../book-ticket/book-ticket.component';
import { AppComponent } from '../app.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let ticketService: TicketService;
  let loginEL: DebugElement;
  let passwordEL: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        ThankYouComponent,
        BookTicketComponent,
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        AppRoutingModule
      ],
      providers: [
        TicketService,
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should get users', inject([HttpTestingController, TicketService],
      () => {
      expect(ticketService).toBeTruthy();
    }
  ));
  beforeEach(() => {
    loginEL = fixture.debugElement.query(By.css('input[type=email]'));
    passwordEL = fixture.debugElement.query(By.css('input[type=password]'));
    ticketService = TestBed.get(TicketService);
  });
  let login;

  describe('findOne', () => {
    it('should return a single user', () => {
      const userResponse = {
        username: 'a',
        password: 'a'
      };
      spyOn(ticketService, 'validateLogin').and.returnValue(of(userResponse));

      ticketService.validateLogin().subscribe(res => {
        login = res;
      });
     });
    });
  it('Entering email and password emits loggedIn event', () => {
      fixture.detectChanges();
      loginEL.nativeElement.value = 'a';
      passwordEL.nativeElement.value = 'a';
      // Now we can check to make sure the emitted value is correct
      expect(login.username).toBe('a');
      expect(login.password).toBe('a');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
