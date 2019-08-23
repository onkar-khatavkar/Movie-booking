import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Approutes } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
  RouterModule.forRoot(Approutes.routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppRoutingModule { }
