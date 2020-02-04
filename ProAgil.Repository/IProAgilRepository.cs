using ProAgil.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        //Geral
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entity) where T : class;

        Task<bool> SaveChangesAsync();

        //EVENTOS
        Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes);

        Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);

        Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrantes);

        // PALESTRANSTE
        Task<Palestrante> GetPalestranteAsync(int palestranteId, bool includeEvento);
        Task<Palestrante[]> GetAllPalestranteAsyncByName(string nome, bool includeEvento);
    }
}
