using System;
using System.Threading.Tasks;
using HotelBediaX.Core.DTOs;
using HotelBediaX.Core.Queries;

namespace HotelBediaX.Core.Repositories
{
    public interface IDestinationRepository
    {
        Task<PagedResult<DestinationDto>> GetPagedAsync(string? q, string? country, string? region, decimal? ratingMin, decimal? ratingMax, int page, int pageSize, string? sortBy);
        Task<DestinationDto?> GetByIdAsync(Guid id);
        Task<DestinationDto> CreateAsync(DestinationCreateDto dto);
        Task<bool> UpdateAsync(Guid id, DestinationUpdateDto dto);
        Task<bool> DeleteAsync(Guid id);
        Task<long> CountAsync();
    }
}
