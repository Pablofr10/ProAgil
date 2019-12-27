import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from '../_models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  eventosFiltrados: Evento[];
  eventos: Evento[];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrar = false;

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtroValue: string): Evento[] {
    filtroValue = filtroValue.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtroValue) !== -1
    );
  }

  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
       this.eventos = _eventos;
       this.eventosFiltrados = this.eventos;
       }, err => {
        console.log(err);
      }
    );
  }

  mostrarImagem() {
    this.mostrar = !this.mostrar;
  }

}
