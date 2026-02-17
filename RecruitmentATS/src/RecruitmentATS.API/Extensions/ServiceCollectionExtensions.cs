using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using RecruitmentATS.Application.Interfaces;
using RecruitmentATS.Application.Services;
using RecruitmentATS.Application.Validators;
using RecruitmentATS.Infrastructure.Data;
using RecruitmentATS.Infrastructure.Repositories;

namespace RecruitmentATS.API.Extensions;

public static class ServiceCollectionExtensions
{
   public static IServiceCollection AddInfrastructureServices(
    this IServiceCollection services, IConfiguration configuration)
{
    services.AddDbContext<AppDbContext>(options =>
        options.UseMySql(
            configuration.GetConnectionString("DefaultConnection"),
            new MySqlServerVersion(new Version(8, 0, 36)),
            o => o.MigrationsAssembly("RecruitmentATS.Infrastructure")
        ));

    services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
    services.AddScoped<IJobPostingRepository, JobPostingRepository>();
    return services;
}
}