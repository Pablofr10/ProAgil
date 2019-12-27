using ProAgil.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProAgil.Repository
{
<<<<<<< HEAD
    interface IProAgilRepository
=======
    public interface IProAgilRepository
>>>>>>> Angular
    {
        //Geral
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        //EVENTOS
        Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes);
<<<<<<< HEAD
        Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);
=======
        Task<Evento[]> GetAllPalestranteAsync(bool includePalestrantes);
>>>>>>> Angular
        Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrantes);

        // PALESTRANSTE
        Task<Palestrante> GetAllPalestranteAsync(int palestranteId, bool includeEvento);
        Task<Palestrante[]> GetAllPalestranteSAsyncByName(string nome, bool includeEvento);
    }
}
