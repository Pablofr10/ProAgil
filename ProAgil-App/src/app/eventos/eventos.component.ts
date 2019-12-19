import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any;
  
  constructor(private htttp: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.htttp.get('http://localhost:9000/site/values').subscribe(response => {
       this.eventos = response;
       }, err => {
        console.log(err);
      }
    );
  }

}
