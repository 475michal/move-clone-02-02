using AutoMapper;
using Common.Entity;
using Microsoft.Extensions.DependencyInjection;
using Service;
using Service.Interfaces;
using Service.Service;
using Service.Service.Service.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddRepositories();
            services.AddScoped<IService<DriverDto>, DriverService>();
            services.AddScoped<IService<UserDto>, UserService>();
            services.AddScoped<IService<ReviewDto>, ReviewService>();
            services.AddScoped<IService<OrderingDto>, OrderingService>();
            services.AddAutoMapper(typeof(MapperProfile));
            return services;
        }

    }
}
