import { ThankYouComponent } from './thank-you/thank-you.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { LoginComponent } from './login/login.component';
import { TicketPreviewComponent } from './ticket-preview/ticket-preview.component';

export class Approutes {
    static routes = [
        {
            path: '',
            component: LoginComponent
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'preview',
            component: TicketPreviewComponent
        },
        {
            path: 'thank-you',
            component: ThankYouComponent
        },
        {
            path: 'book-ticket',
            component: BookTicketComponent
        }
    ];
}
