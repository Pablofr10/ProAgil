using ProAgil.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProAgil.Repository
{
    interface IProAgilRepository
    {
        //Geral
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        //EVENTOS
        Task<Evento[]> GetAllEventosAsyncByTema(string tema, bool includePalestrantes);
        Task<Evento[]> GetAllEventosAsync();
        Task<Evento[]> GetEventosAsyncById(int EventoId, bool includePalestrantes);

        // PALESTRANSTE
        Task<Evento[]> GetAllPalestranteSAsyncByName(bool includePalestrantes);
        Task<Evento[]> GetAllPalestrantesAsync();
        Task<Evento[]> GetPalestranteSAsyncById(int PalestranteId, bool includePalestrantes);
    }
}
