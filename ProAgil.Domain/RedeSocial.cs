using System;
using System.Collections.Generic;
using System.Text;

namespace ProAgil.Domain
{
    public class RedeSocial
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string URL { get; set; }        
        public int? EventoId { get; set; }
        public Evento Evento { get; }
        public int? PalestranteId { get; set; }
        public Palestrante Palestrante { get; }
    }
}
