#!/bin/bash
set -e
echo "Creando solucion .NET 8..."

dotnet new sln -n RecruitmentATS -o . --force
dotnet new webapi   -n RecruitmentATS.API            -o src/RecruitmentATS.API            --force
dotnet new classlib -n RecruitmentATS.Application    -o src/RecruitmentATS.Application    --force
dotnet new classlib -n RecruitmentATS.Domain         -o src/RecruitmentATS.Domain         --force
dotnet new classlib -n RecruitmentATS.Infrastructure -o src/RecruitmentATS.Infrastructure --force

dotnet sln add src/RecruitmentATS.API/RecruitmentATS.API.csproj
dotnet sln add src/RecruitmentATS.Application/RecruitmentATS.Application.csproj
dotnet sln add src/RecruitmentATS.Domain/RecruitmentATS.Domain.csproj
dotnet sln add src/RecruitmentATS.Infrastructure/RecruitmentATS.Infrastructure.csproj

dotnet add src/RecruitmentATS.API/RecruitmentATS.API.csproj reference src/RecruitmentATS.Application/RecruitmentATS.Application.csproj
dotnet add src/RecruitmentATS.API/RecruitmentATS.API.csproj reference src/RecruitmentATS.Infrastructure/RecruitmentATS.Infrastructure.csproj
dotnet add src/RecruitmentATS.Application/RecruitmentATS.Application.csproj reference src/RecruitmentATS.Domain/RecruitmentATS.Domain.csproj
dotnet add src/RecruitmentATS.Infrastructure/RecruitmentATS.Infrastructure.csproj reference src/RecruitmentATS.Domain/RecruitmentATS.Domain.csproj
dotnet add src/RecruitmentATS.Infrastructure/RecruitmentATS.Infrastructure.csproj reference src/RecruitmentATS.Application/RecruitmentATS.Application.csproj

dotnet add src/RecruitmentATS.API/RecruitmentATS.API.csproj package Swashbuckle.AspNetCore
dotnet add src/RecruitmentATS.Application/RecruitmentATS.Application.csproj package AutoMapper.Extensions.Microsoft.DependencyInjection --version 12.0.1
dotnet add src/RecruitmentATS.Application/RecruitmentATS.Application.csproj package FluentValidation.AspNetCore --version 11.3.0
dotnet add src/RecruitmentATS.Infrastructure/RecruitmentATS.Infrastructure.csproj package Npgsql.EntityFrameworkCore.PostgreSQL --version 8.0.11
dotnet add src/RecruitmentATS.Infrastructure/RecruitmentATS.Infrastructure.csproj package Microsoft.EntityFrameworkCore.Tools --version 8.0.11
dotnet add src/RecruitmentATS.Infrastructure/RecruitmentATS.Infrastructure.csproj package Microsoft.EntityFrameworkCore.Design --version 8.0.11

rm -f src/RecruitmentATS.Application/Class1.cs
rm -f src/RecruitmentATS.Domain/Class1.cs
rm -f src/RecruitmentATS.Infrastructure/Class1.cs
rm -f src/RecruitmentATS.API/Controllers/WeatherForecastController.cs
rm -f src/RecruitmentATS.API/WeatherForecast.cs
mkdir -p storage/cvs

echo ""
echo "Solucion creada. Ahora pega los archivos .cs en sus carpetas."
echo "Luego: cd src/RecruitmentATS.API"
echo "       dotnet ef migrations add InitialCreate --project ../RecruitmentATS.Infrastructure"
echo "       dotnet run"