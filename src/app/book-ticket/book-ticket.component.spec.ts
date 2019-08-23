import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketComponent } from './book-ticket.component';

describe('BookTicketComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookTicketComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BookTicketComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Movie Booking Test'`, () => {
    const fixture = TestBed.createComponent(BookTicketComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Movie Booking Test');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(BookTicketComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Movie Ticket Booking');
  });
});
