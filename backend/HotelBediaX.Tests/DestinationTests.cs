using System;
using HotelBediaX.Core.Entities;
using Xunit;

namespace HotelBediaX.Tests
{
    public class DestinationTests
    {
        [Fact]
        public void Should_Create_Destination_With_Default_Values()
        {
            var destination = new Destination();

            Assert.NotEqual(Guid.Empty, destination.Id);
            Assert.NotNull(destination.Name);
            Assert.NotNull(destination.Country);
            Assert.NotNull(destination.Region);
            Assert.NotNull(destination.Description);
            Assert.Equal(0m, destination.Rating);
            Assert.True(destination.CreatedAt <= DateTime.UtcNow);
            Assert.True(destination.UpdatedAt <= DateTime.UtcNow);
        }

        [Fact]
        public void Should_Assign_Properties_Correctly()
        {
            var destination = new Destination();
            var now = DateTime.UtcNow;

            destination.Name = "Madrid";
            destination.Country = "Spain";
            destination.Region = "Europe";
            destination.Description = "A beautiful city full of culture.";
            destination.Rating = 4.7m;
            destination.UpdatedAt = now;

            Assert.Equal("Madrid", destination.Name);
            Assert.Equal("Spain", destination.Country);
            Assert.Equal("Europe", destination.Region);
            Assert.Equal("A beautiful city full of culture.", destination.Description);
            Assert.Equal(4.7m, destination.Rating);
            Assert.Equal(now, destination.UpdatedAt);
        }

        [Fact]
        public void CreatedAt_Should_Not_Change_When_Updating()
        {
            var destination = new Destination();
            var originalCreatedAt = destination.CreatedAt;

            destination.UpdatedAt = DateTime.UtcNow;

            Assert.Equal(originalCreatedAt, destination.CreatedAt);
            Assert.True(destination.UpdatedAt >= originalCreatedAt);
        }
    }
}
