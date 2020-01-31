import { Palestrante } from './Palestrante';
import { Lote } from './Lote';
import { RedeSocial } from './RedeSocial';

export class Evento {

    constructor() { }

    id: number;
    local: string ;
    dataEvento: Date;
    tema: string;
    qtdPessoas: number;
    imagemURL: string;
    telefone: string;
    email: string;
    lotes: Lote[];
    redesSocials: RedeSocial[];
    palestranteEventos: Palestrante[];
}
