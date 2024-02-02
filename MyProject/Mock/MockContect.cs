using Repository.Entity;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mock
{
    public class MockContect : IContext
    {
        public List<Drivers> drivers { get; set; }
        public List<Users> users { get; set; }
        public List<Ordering> orderings { get; set; }
        public List<Review> reviews { get; set; }

        public MockContect(){

            this.drivers = new List<Drivers>();
            this.users = new List<Users>();
            this.orderings = new List<Ordering>();
            this.reviews = new List<Review>();

            this.drivers.Add(new Drivers { Id = 1, Name = "Driver1", ContactMethod = "SMS", Status = "Available", Location = "Location1", PlacesInCar = 4, Rating = 5, Email = "driver1@example.com", PhoneNumber = "123456789" });
            this.drivers.Add(new Drivers { Id = 2, Name = "Driver2", ContactMethod = "Email", Status = "NotAvailable", Location = "Location2", PlacesInCar = 3, Rating = 4, Email = "driver2@example.com", PhoneNumber = "987654321" });

            this.users.Add(new Users { Id = 1, Username = "User1", Email = "user1@example.com", Password = "password1", PhoneNumber = "111111111", AuthenticationType = "SMS" });
            this.users.Add(new Users { Id = 2, Username = "User2", Email = "user2@example.com", Password = "password2", PhoneNumber = "222222222", AuthenticationType = "Email" });

            this.orderings.Add(new Ordering { Id = 1, UserId = 1, DriverId = 1, Status = "Open", PlacesNeeded = 2, Origin = "Origin1", Destination = "Destination1", TravelTime = DateTime.Now });
            this.orderings.Add(new Ordering { Id = 2, UserId = 2, DriverId = 2, Status = "Closed", PlacesNeeded = 1, Origin = "Origin2", Destination = "Destination2", TravelTime = DateTime.Now });

            this.reviews.Add(new Review { Id = 1, UserId = 1, DriverId = 1, Date = DateTime.Now, Rating = 5, Comment = "Great service!" });
            this.reviews.Add(new Review { Id = 2, UserId = 2, DriverId = 2, Date = DateTime.Now, Rating = 4, Comment = "Good driver" });


        }
       public void save()
        {

        }
    }
}
