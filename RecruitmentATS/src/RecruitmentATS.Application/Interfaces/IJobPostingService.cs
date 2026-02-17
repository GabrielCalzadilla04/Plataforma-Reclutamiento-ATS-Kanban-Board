using RecruitmentATS.Application.DTOs.JobPosting;

namespace RecruitmentATS.Application.Interfaces;

public interface IJobPostingService
{
    Task<JobPostingResponseDto> CreateAsync(CreateJobPostingDto dto);
    Task<JobPostingResponseDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<JobPostingResponseDto>> GetAllAsync();
    Task<IEnumerable<JobPostingResponseDto>> GetPublishedAsync();
    Task<JobPostingResponseDto?> UpdateAsync(Guid id, UpdateJobPostingDto dto);
    Task<bool> DeleteAsync(Guid id);
    Task<JobPostingResponseDto?> PublishAsync(Guid id);
}