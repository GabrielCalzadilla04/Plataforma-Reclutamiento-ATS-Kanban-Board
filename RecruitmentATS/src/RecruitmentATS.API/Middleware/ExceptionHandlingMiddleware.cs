using System.Net;
using System.Text.Json;

namespace RecruitmentATS.API.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try { await _next(context); }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);
            context.Response.ContentType = "application/json";

            var (code, msg) = ex switch
            {
                ArgumentException       => (HttpStatusCode.BadRequest, ex.Message),
                KeyNotFoundException    => (HttpStatusCode.NotFound, ex.Message),
                InvalidOperationException => (HttpStatusCode.Conflict, ex.Message),
                _ => (HttpStatusCode.InternalServerError, "Error interno del servidor")
            };

            context.Response.StatusCode = (int)code;
            await context.Response.WriteAsync(
                JsonSerializer.Serialize(new { status = (int)code, message = msg, timestamp = DateTime.UtcNow })
            );
        }
    }
}