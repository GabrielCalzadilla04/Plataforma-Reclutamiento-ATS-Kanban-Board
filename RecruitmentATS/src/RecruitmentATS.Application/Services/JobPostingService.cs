using Microsoft.EntityFrameworkCore;
using RecruitmentATS.Application.DTOs.JobPosting;
using RecruitmentATS.Application.Interfaces;
using RecruitmentATS.Domain.Entities;
using RecruitmentATS.Domain.Enums;

namespace RecruitmentATS.Application.Services;

public class JobPostingService : IJobPostingService
{
    private readonly IJobPostingRepository _jobPostingRepo;
    private readonly ITagRepository _tagRepo;

    public JobPostingService(IJobPostingRepository jobPostingRepo, ITagRepository tagRepo)
    {
        _jobPostingRepo = jobPostingRepo;
        _tagRepo = tagRepo;
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
            var tagEntities = await _tagRepo.GetOrCreateTagsAsync(dto.Tags);
            foreach (var tag in tagEntities)
            {
                jobPosting.JobPostingTags.Add(new JobPostingTag
                {
                    JobPostingId = jobPosting.Id,
                    TagId = tag.Id
                });
            }
        }

        await _jobPostingRepo.AddAsync(jobPosting);
        return MapToResponse(jobPosting);
    }

    public async Task<JobPostingResponseDto?> GetByIdAsync(Guid id)
    {
        var jobPosting = await _jobPostingRepo.GetByIdWithTagsAsync(id);
        if (jobPosting is null) return null;

        var candidateCount = await _jobPostingRepo.GetCandidateCountAsync(id);
        var response = MapToResponse(jobPosting);
        response.CandidateCount = candidateCount;
        return response;
    }

    public async Task<IEnumerable<JobPostingResponseDto>> GetAllAsync()
    {
        var jobPostings = await _jobPostingRepo.GetAllWithTagsAndCandidatesAsync();
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
            dto.CandidateCount = await _jobPostingRepo.GetCandidateCountAsync(j.Id);
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
            await _jobPostingRepo.RemoveJobPostingTagsAsync(jobPosting);
            var tagEntities = await _tagRepo.GetOrCreateTagsAsync(dto.Tags);
            foreach (var tag in tagEntities)
            {
                jobPosting.JobPostingTags.Add(new JobPostingTag
                {
                    JobPostingId = jobPosting.Id,
                    TagId = tag.Id
                });
            }
        }

        await _jobPostingRepo.UpdateAsync(jobPosting);
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
        await _jobPostingRepo.UpdateAsync(jobPosting);
        return MapToResponse(jobPosting);
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