using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProAgil.Domain
{
    public class Lote
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Preco { get; set; }
        public DateTime? DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public int Quantidade { get; set; }
<<<<<<< HEAD
        public Evento Evento { get; set; }
=======
        public Evento Evento { get; }
>>>>>>> Angular
    }
}
