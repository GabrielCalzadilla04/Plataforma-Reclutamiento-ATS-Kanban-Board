using Microsoft.EntityFrameworkCore;
using RecruitmentATS.Domain.Entities;
using RecruitmentATS.Domain.Enums;
using RecruitmentATS.Infrastructure.Data;

namespace RecruitmentATS.Infrastructure.Repositories;

public class JobPostingRepository : Repository<JobPosting>, IJobPostingRepository
{
    public JobPostingRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<JobPosting>> GetPublishedAsync()
    {
        return await _dbSet
            .Where(j => j.Status == JobPostingStatus.Published)
            .Where(j => j.ExpiresAt == null || j.ExpiresAt > DateTime.UtcNow)
            .Include(j => j.JobPostingTags).ThenInclude(jt => jt.Tag)
            .OrderByDescending(j => j.CreatedAt)
            .ToListAsync();
    }

    public async Task<JobPosting?> GetByIdWithTagsAsync(Guid id)
    {
        return await _dbSet
            .Include(j => j.JobPostingTags).ThenInclude(jt => jt.Tag)
            .FirstOrDefaultAsync(j => j.Id == id);
    }

    public async Task<IEnumerable<JobPosting>> GetByStatusAsync(JobPostingStatus status)
    {
        return await _dbSet
            .Where(j => j.Status == status)
            .Include(j => j.JobPostingTags).ThenInclude(jt => jt.Tag)
            .OrderByDescending(j => j.CreatedAt)
            .ToListAsync();
    }

    public async Task<JobPosting?> GetByIdWithCandidatesAsync(Guid id)
    {
        return await _dbSet
            .Include(j => j.Candidates)
            .Include(j => j.JobPostingTags).ThenInclude(jt => jt.Tag)
            .FirstOrDefaultAsync(j => j.Id == id);
    }
}