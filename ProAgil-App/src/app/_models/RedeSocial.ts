import { Palestrante } from './Palestrante';

export interface RedeSocial {
    Id: number;
    Nome: string ;
    URL: string;
    EventoId?: number;
    PalestranteId?: number;
    Palestrante: Palestrante[];
}
