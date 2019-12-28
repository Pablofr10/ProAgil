// MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';

// COMPONENTES
import { NavComponent } from './nav/nav.component';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';

// PIPES
import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';

// SERVICES
import { EventoService } from './_services/evento.service';

@NgModule({
   declarations: [
      AppComponent,
      EventosComponent,
      NavComponent,
      DateTimeFormatPipePipe
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
      EventoService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
