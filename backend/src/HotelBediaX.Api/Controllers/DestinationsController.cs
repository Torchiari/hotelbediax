using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using HotelBediaX.Core.Repositories;
using HotelBediaX.Core.DTOs;

namespace HotelBediaX.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinationsController : ControllerBase
    {
        private readonly IDestinationRepository _repo;
        public DestinationsController(IDestinationRepository repo) => _repo = repo;

        [HttpGet]
        public async Task<IActionResult> Get(
           [FromQuery] string? q,
           [FromQuery] string? country,
           [FromQuery] string? region,
           [FromQuery] decimal? ratingMin,
           [FromQuery] decimal? ratingMax,
           [FromQuery] int page = 1,
           [FromQuery] int pageSize = 50,
           [FromQuery] string? sortBy = "name"
        )
        {
            var result = await _repo.GetPagedAsync(q, country, region, ratingMin, ratingMax, Math.Max(1, page), Math.Clamp(pageSize, 1, 500), sortBy);
            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var d = await _repo.GetByIdAsync(id);
            if (d == null) return NotFound();
            return Ok(d);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DestinationCreateDto dto)
        {
            var created = await _repo.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] DestinationUpdateDto dto)
        {
            var ok = await _repo.UpdateAsync(id, dto);
            if (!ok) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var ok = await _repo.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
