using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProAgil.Dtos
{
    public class EventoDTO
    {
        private string _dataEvento = "";
        public string Id { get; set; }
        [Required(ErrorMessage = "É obrigatório informar um local.")]
        public string Local { get; set; }      

        public string DataEvento
        {
            get { return this._dataEvento; }
            set { this._dataEvento = Convert.ToDateTime(value).ToString("yyyy/MM/dd hh:mm"); }
        }


        [Required(ErrorMessage ="É obrigatório informar um tema.")]
        [StringLength(50, MinimumLength =3, ErrorMessage = "O tema deve ter no mínimo 3 caractéres e no máximo 8")]
        public string Tema { get; set; }
        [Required(ErrorMessage = "É obrigatório informar a quantidade de pessoas.")]
        [Range(2, 120000)]
        public int QtdPessoas { get; set; }

        public string ImagemURL { get; set; }
        [Required(ErrorMessage = "É obrigatório informar um telefone.")]
        public string Telefone { get; set; }
        [EmailAddress]
        public string Email { get; set; }

        public List<LoteDTO> Lotes { get; set; }
        public List<RedeSocialDTO> RedeSocials { get; set; }
        public List<PalestranteDTO> Palestrantes { get; set; }

    }
}
