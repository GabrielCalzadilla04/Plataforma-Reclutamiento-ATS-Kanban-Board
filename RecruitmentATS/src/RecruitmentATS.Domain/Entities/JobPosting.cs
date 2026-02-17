using RecruitmentATS.Domain.Common;
using RecruitmentATS.Domain.Enums;

namespace RecruitmentATS.Domain.Entities;

public class JobPosting : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Requirements { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string? SalaryRange { get; set; }
    public string? Department { get; set; }
    public string? ContractType { get; set; }
    public JobPostingStatus Status { get; set; } = JobPostingStatus.Draft;
    public DateTime? ExpiresAt { get; set; }

    public ICollection<Candidate> Candidates { get; set; } = new List<Candidate>();
    public ICollection<JobPostingTag> JobPostingTags { get; set; } = new List<JobPostingTag>();
}