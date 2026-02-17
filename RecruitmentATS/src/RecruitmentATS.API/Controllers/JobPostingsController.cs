using Microsoft.AspNetCore.Mvc;
using RecruitmentATS.Application.DTOs.JobPosting;
using RecruitmentATS.Application.Interfaces;

namespace RecruitmentATS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobPostingsController : ControllerBase
{
    private readonly IJobPostingService _service;
    public JobPostingsController(IJobPostingService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobPostingResponseDto>>> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("published")]
    public async Task<ActionResult<IEnumerable<JobPostingResponseDto>>> GetPublished()
        => Ok(await _service.GetPublishedAsync());

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<JobPostingResponseDto>> GetById(Guid id)
    {
        var result = await _service.GetByIdAsync(id);
        return result is null ? NotFound(new { message = $"Vacante {id} no encontrada" }) : Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<JobPostingResponseDto>> Create([FromBody] CreateJobPostingDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<JobPostingResponseDto>> Update(Guid id, [FromBody] UpdateJobPostingDto dto)
    {
        var result = await _service.UpdateAsync(id, dto);
        return result is null ? NotFound(new { message = $"Vacante {id} no encontrada" }) : Ok(result);
    }

    [HttpPatch("{id:guid}/publish")]
    public async Task<ActionResult<JobPostingResponseDto>> Publish(Guid id)
    {
        var result = await _service.PublishAsync(id);
        return result is null ? NotFound(new { message = $"Vacante {id} no encontrada" }) : Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted ? NoContent() : NotFound(new { message = $"Vacante {id} no encontrada" });
    }
}