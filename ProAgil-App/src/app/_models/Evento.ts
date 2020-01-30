import { Palestrante } from './Palestrante';
import { Lote } from './Lote';
import { RedeSocial } from './RedeSocial';

export interface Evento {
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
