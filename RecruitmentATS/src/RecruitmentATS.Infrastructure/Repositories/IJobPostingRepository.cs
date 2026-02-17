using RecruitmentATS.Domain.Entities;
using RecruitmentATS.Domain.Enums;

namespace RecruitmentATS.Infrastructure.Repositories;

public interface IJobPostingRepository : IRepository<JobPosting>
{
    Task<IEnumerable<JobPosting>> GetPublishedAsync();
    Task<JobPosting?> GetByIdWithTagsAsync(Guid id);
    Task<IEnumerable<JobPosting>> GetByStatusAsync(JobPostingStatus status);
    Task<JobPosting?> GetByIdWithCandidatesAsync(Guid id);
}