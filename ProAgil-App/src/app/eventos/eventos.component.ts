import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  eventosFiltrados: any = [];
  eventos: any = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrar = false;

  constructor(private htttp: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtroValue: string): any {
    filtroValue = filtroValue.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtroValue) !== -1
    );
  }

  getEventos() {
    this.htttp.get('http://localhost:9000/site/values').subscribe(response => {
       this.eventos = response;
       }, err => {
        console.log(err);
      }
    );
  }

  mostrarImagem() {
    this.mostrar = !this.mostrar;
  }

}
