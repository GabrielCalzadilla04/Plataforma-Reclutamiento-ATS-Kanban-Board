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
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IJobPostingService, JobPostingService>();
        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblyContaining<CreateJobPostingValidator>();
        return services;
    }

    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection"),
                o => o.MigrationsAssembly("RecruitmentATS.Infrastructure")
            ));

        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped<IJobPostingRepository, JobPostingRepository>();
        return services;
    }
}