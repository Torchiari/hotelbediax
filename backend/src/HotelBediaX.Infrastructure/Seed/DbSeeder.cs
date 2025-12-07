using Bogus;
using System;
using System.Threading.Tasks;
using HotelBediaX.Infrastructure.Data;
using HotelBediaX.Core.Entities;
using System.Linq;

namespace HotelBediaX.Infrastructure.Seed
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext ctx, int count = 200000)
        {
            if (ctx.Destinations.Any()) return;

            var faker = new Faker<Destination>()
                .RuleFor(x => x.Id, f => Guid.NewGuid())
                .RuleFor(x => x.Name, f => f.Address.City())
                .RuleFor(x => x.Country, f => f.Address.Country())
                .RuleFor(x => x.Region, f => f.Address.State())
                .RuleFor(x => x.Description, f => f.Lorem.Sentence(8))
                .RuleFor(x => x.Rating, f => Math.Round(f.Random.Decimal(0, 5), 1))
                .RuleFor(x => x.CreatedAt, f => f.Date.Past(5).ToUniversalTime());

            var batchSize = 5000;
            var created = 0;
            while (created < count)
            {
                var take = Math.Min(batchSize, count - created);
                var list = faker.Generate(take);
                await ctx.Destinations.AddRangeAsync(list);
                await ctx.SaveChangesAsync();
                created += take;
                Console.WriteLine($"Seeded {created}/{count}");
            }
        }
    }
}
