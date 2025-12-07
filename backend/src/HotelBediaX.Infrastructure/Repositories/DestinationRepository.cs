using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HotelBediaX.Core.Repositories;
using HotelBediaX.Core.DTOs;
using HotelBediaX.Core.Queries;
using HotelBediaX.Infrastructure.Data;
using HotelBediaX.Core.Entities;
using System.Collections.Generic;


namespace HotelBediaX.Infrastructure.Repositories
{
    public class DestinationRepository : IDestinationRepository
    {
        private readonly AppDbContext _ctx;
        public DestinationRepository(AppDbContext ctx) { _ctx = ctx; }

        public async Task<PagedResult<DestinationDto>> GetPagedAsync(
    string? q,
    string? country,
    string? region,
    decimal? ratingMin,
    decimal? ratingMax,
    int page,
    int pageSize,
    string? sortBy
)
        {
            var query = _ctx.Destinations.AsNoTracking().AsQueryable();

            // Search
            if (!string.IsNullOrWhiteSpace(q))
            {
                var qLower = q.ToLower();
                query = query.Where(d =>
                    d.Name.ToLower().Contains(qLower) ||
                    d.Description.ToLower().Contains(qLower) ||
                    d.Region.ToLower().Contains(qLower)
                );
            }

            // Country filter
            if (!string.IsNullOrWhiteSpace(country))
                query = query.Where(d => d.Country != null && d.Country.ToLower().Contains(country.ToLower()));


            // Region filter
            if (!string.IsNullOrWhiteSpace(region))
            {
                var regionLower = region.ToLower();
                query = query.Where(d => d.Region != null && d.Region.ToLower().Contains(regionLower));
            }


            // Rating filters
            if (ratingMin.HasValue)
                query = query.Where(d => d.Rating >= ratingMin.Value);

            if (ratingMax.HasValue)
                query = query.Where(d => d.Rating <= ratingMax.Value);

            // Count
            var total = await query.LongCountAsync();

            // Sort
            query = sortBy?.ToLower() switch
            {
                "name" => query.OrderBy(d => d.Name),
                "rating" => query.OrderByDescending(d => d.Rating),
                "createdat" => query.OrderByDescending(d => d.CreatedAt),
                "updatedat" => query.OrderByDescending(d => d.UpdatedAt),
                _ => query.OrderBy(d => d.Name)
            };

            // Pagination + DTO
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(d => new DestinationDto(
                    d.Id,
                    d.Name,
                    d.Country,
                    d.Region,
                    d.Description,
                    d.Rating,
                    d.CreatedAt,
                    d.UpdatedAt
                ))
                .ToListAsync();

            return new PagedResult<DestinationDto>
            {
                Total = total,
                Page = page,
                PageSize = pageSize,
                Items = items
            };
        }

        public async Task<DestinationDto?> GetByIdAsync(Guid id)
        {
            var d = await _ctx.Destinations.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (d == null) return null;

            return new DestinationDto(
                d.Id,
                d.Name,
                d.Country,
                d.Region,
                d.Description,
                d.Rating,
                d.CreatedAt,
                d.UpdatedAt
            );
        }

        public async Task<DestinationDto> CreateAsync(DestinationCreateDto dto)
        {
            var ent = new Destination
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Country = dto.Country,
                Region = dto.Region,
                Description = dto.Description,
                Rating = dto.Rating,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _ctx.Destinations.Add(ent);
            await _ctx.SaveChangesAsync();

            return new DestinationDto(
                ent.Id,
                ent.Name,
                ent.Country,
                ent.Region,
                ent.Description,
                ent.Rating,
                ent.CreatedAt,
                ent.UpdatedAt
            );
        }

        public async Task<bool> UpdateAsync(Guid id, DestinationUpdateDto dto)
        {
            var ent = await _ctx.Destinations.FindAsync(id);
            if (ent == null) return false;

            ent.Name = dto.Name;
            ent.Country = dto.Country;
            ent.Region = dto.Region;
            ent.Description = dto.Description;
            ent.Rating = dto.Rating;
            ent.UpdatedAt = DateTime.UtcNow;

            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var ent = await _ctx.Destinations.FindAsync(id);
            if (ent == null) return false;

            _ctx.Destinations.Remove(ent);
            await _ctx.SaveChangesAsync();
            return true;
        }

        public Task<long> CountAsync() => _ctx.Destinations.LongCountAsync();
    }
}
