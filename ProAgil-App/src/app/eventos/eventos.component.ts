import { EventoService } from './../_services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  titulo = 'Eventos';

  public loading = false;

  eventosFiltrados: Evento[];
  eventos: Evento[] = [];
  evento: Evento;
  modoSalvar = 'put';
  imagemLargura = 50;
  imagemMargem = 2;
  mostrar = false;
  registerForm: FormGroup;
  bodyDeletarEvento = '';

  arquivo: File;
  fileNameToUpload: string;
  dataAtual: string;

  _filtroLista = '';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localService: BsLocaleService,
    private toastr: ToastrService,
  ) {
    this.localService.use('pt-br');
  }

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  editarEvento(evento: Evento, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = Object.assign({}, evento);
    this.fileNameToUpload = evento.imagemURL.toString();
    this.evento.imagemURL = '';
    this.registerForm.patchValue(this.evento);
  }

  novoEvento(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código ${evento.id}`;
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  filtrarEventos(filtroValue: string): Evento[] {
    filtroValue = filtroValue.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtroValue) !== -1
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(12000)]],
      imagemURL: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  mostrarImagem() {
    this.mostrar = !this.mostrar;
  }

  uploadImage() {
    this.loading = true;
    if (this.modoSalvar === 'post') {
    const nomeArquivo = this.evento.imagemURL.split('\\', 3);
    this.evento.imagemURL = nomeArquivo[2];

    this.eventoService.postUpload(this.arquivo, nomeArquivo[2]).subscribe(
      () => {
        this.getEventos();
      }
    );
    } else {
      this.evento.imagemURL = this.fileNameToUpload;
      this.eventoService.postUpload(this.arquivo, this.fileNameToUpload).subscribe(
        () => {
          this.getEventos();
        }
      );
    }
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.evento = Object.assign({}, this.registerForm.value);

        this.uploadImage();

        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            template.hide();
            this.getEventos();
            this.toastr.success('Adicionado com sucesso!');
          }, error => this.toastr.error('Mensagem de Error', `Erro ao adicionar evento: ${error}`)
        );
      } else {
        if (this.modoSalvar === 'put') {
          this.evento = Object.assign({ id: this.evento.id }, this.registerForm.value);

          this.uploadImage();

          this.eventoService.putEvento(this.evento).subscribe(
            () => {
              template.hide();
              this.getEventos();
              this.toastr.success('Editado com sucesso!');
            }, error => this.toastr.error('Mensagem de Error', `Erro ao inserir evento: ${error}`)
          );
        }
      }
    }
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
        template.hide();
        this.getEventos();
        this.toastr.success('Deletado com sucesso!');
      }, error => this.toastr.error('Mensagem de Error', `Erro ao deletar o evento: ${error}`)
    );
  }

  getEventos() {
    this.loading = true;
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
        this.loading = false;
      }, err => {
        this.loading = false;
        this.toastr.error(`Error ao tentar carregar eventos: ${err}`);
      }
    );
  }

  onfileChange(evento) {
    const reader = new FileReader();

    if (evento.target.files && evento.target.files.length) {
      this.arquivo = evento.target.files;
      console.log(this.arquivo);
    }
  }

}
