using Microsoft.EntityFrameworkCore;
using RecruitmentATS.Application.DTOs.JobPosting;
using RecruitmentATS.Application.Interfaces;
using RecruitmentATS.Domain.Entities;
using RecruitmentATS.Domain.Enums;
using RecruitmentATS.Infrastructure.Data;
using RecruitmentATS.Infrastructure.Repositories;

namespace RecruitmentATS.Application.Services;

public class JobPostingService : IJobPostingService
{
    private readonly IJobPostingRepository _jobPostingRepo;
    private readonly AppDbContext _context;

    public JobPostingService(IJobPostingRepository jobPostingRepo, AppDbContext context)
    {
        _jobPostingRepo = jobPostingRepo;
        _context = context;
    }

    public async Task<JobPostingResponseDto> CreateAsync(CreateJobPostingDto dto)
    {
        var jobPosting = new JobPosting
        {
            Title = dto.Title,
            Description = dto.Description,
            Requirements = dto.Requirements,
            Location = dto.Location,
            SalaryRange = dto.SalaryRange,
            Department = dto.Department,
            ContractType = dto.ContractType,
            ExpiresAt = dto.ExpiresAt,
            Status = JobPostingStatus.Draft
        };

        if (dto.Tags.Any())
        {
            var tagEntities = await GetOrCreateTagsAsync(dto.Tags);
            foreach (var tag in tagEntities)
            {
                jobPosting.JobPostingTags.Add(new JobPostingTag
                {
                    JobPostingId = jobPosting.Id,
                    TagId = tag.Id
                });
            }
        }

        _context.JobPostings.Add(jobPosting);
        await _context.SaveChangesAsync();
        return MapToResponse(jobPosting);
    }

    public async Task<JobPostingResponseDto?> GetByIdAsync(Guid id)
    {
        var jobPosting = await _jobPostingRepo.GetByIdWithTagsAsync(id);
        if (jobPosting is null) return null;

        var candidateCount = await _context.Candidates.CountAsync(c => c.JobPostingId == id);
        var response = MapToResponse(jobPosting);
        response.CandidateCount = candidateCount;
        return response;
    }

    public async Task<IEnumerable<JobPostingResponseDto>> GetAllAsync()
    {
        var jobPostings = await _context.JobPostings
            .Include(j => j.JobPostingTags).ThenInclude(jt => jt.Tag)
            .Include(j => j.Candidates)
            .OrderByDescending(j => j.CreatedAt)
            .ToListAsync();

        return jobPostings.Select(j =>
        {
            var dto = MapToResponse(j);
            dto.CandidateCount = j.Candidates.Count;
            return dto;
        });
    }

    public async Task<IEnumerable<JobPostingResponseDto>> GetPublishedAsync()
    {
        var jobPostings = await _jobPostingRepo.GetPublishedAsync();
        var result = new List<JobPostingResponseDto>();
        foreach (var j in jobPostings)
        {
            var dto = MapToResponse(j);
            dto.CandidateCount = await _context.Candidates.CountAsync(c => c.JobPostingId == j.Id);
            result.Add(dto);
        }
        return result;
    }

    public async Task<JobPostingResponseDto?> UpdateAsync(Guid id, UpdateJobPostingDto dto)
    {
        var jobPosting = await _jobPostingRepo.GetByIdWithTagsAsync(id);
        if (jobPosting is null) return null;

        if (dto.Title is not null) jobPosting.Title = dto.Title;
        if (dto.Description is not null) jobPosting.Description = dto.Description;
        if (dto.Requirements is not null) jobPosting.Requirements = dto.Requirements;
        if (dto.Location is not null) jobPosting.Location = dto.Location;
        if (dto.SalaryRange is not null) jobPosting.SalaryRange = dto.SalaryRange;
        if (dto.Department is not null) jobPosting.Department = dto.Department;
        if (dto.ContractType is not null) jobPosting.ContractType = dto.ContractType;
        if (dto.ExpiresAt is not null) jobPosting.ExpiresAt = dto.ExpiresAt;

        if (dto.Status is not null && Enum.TryParse<JobPostingStatus>(dto.Status, true, out var status))
            jobPosting.Status = status;

        if (dto.Tags is not null)
        {
            _context.JobPostingTags.RemoveRange(jobPosting.JobPostingTags);
            var tagEntities = await GetOrCreateTagsAsync(dto.Tags);
            foreach (var tag in tagEntities)
            {
                jobPosting.JobPostingTags.Add(new JobPostingTag
                {
                    JobPostingId = jobPosting.Id,
                    TagId = tag.Id
                });
            }
        }

        await _context.SaveChangesAsync();
        return MapToResponse(jobPosting);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var jobPosting = await _jobPostingRepo.GetByIdAsync(id);
        if (jobPosting is null) return false;
        await _jobPostingRepo.DeleteAsync(jobPosting);
        return true;
    }

    public async Task<JobPostingResponseDto?> PublishAsync(Guid id)
    {
        var jobPosting = await _jobPostingRepo.GetByIdWithTagsAsync(id);
        if (jobPosting is null) return null;
        jobPosting.Status = JobPostingStatus.Published;
        await _context.SaveChangesAsync();
        return MapToResponse(jobPosting);
    }

    private async Task<List<Tag>> GetOrCreateTagsAsync(List<string> tagNames)
    {
        var tags = new List<Tag>();
        foreach (var name in tagNames.Distinct(StringComparer.OrdinalIgnoreCase))
        {
            var normalized = name.Trim().ToLowerInvariant();
            var existing = await _context.Tags.FirstOrDefaultAsync(t => t.Name.ToLower() == normalized);
            if (existing is not null)
                tags.Add(existing);
            else
            {
                var newTag = new Tag { Name = name.Trim() };
                _context.Tags.Add(newTag);
                tags.Add(newTag);
            }
        }
        await _context.SaveChangesAsync();
        return tags;
    }

    private static JobPostingResponseDto MapToResponse(JobPosting entity) => new()
    {
        Id = entity.Id,
        Title = entity.Title,
        Description = entity.Description,
        Requirements = entity.Requirements,
        Location = entity.Location,
        SalaryRange = entity.SalaryRange,
        Department = entity.Department,
        ContractType = entity.ContractType,
        Status = entity.Status.ToString(),
        CreatedAt = entity.CreatedAt,
        ExpiresAt = entity.ExpiresAt,
        Tags = entity.JobPostingTags
            .Select(jt => jt.Tag?.Name ?? "")
            .Where(n => !string.IsNullOrEmpty(n))
            .ToList()
    };
}