using System;

namespace HotelBediaX.Core.DTOs
{
    public record DestinationDto(
        Guid Id,
        string Name,
        string Country,
        string Region,
        string Description,
        decimal Rating,
        DateTime CreatedAt,
        DateTime UpdatedAt
    );

    public record DestinationCreateDto(string Name, string Country, string Region, string Description, decimal Rating);
    public record DestinationUpdateDto(string Name, string Country, string Region, string Description, decimal Rating);
}
