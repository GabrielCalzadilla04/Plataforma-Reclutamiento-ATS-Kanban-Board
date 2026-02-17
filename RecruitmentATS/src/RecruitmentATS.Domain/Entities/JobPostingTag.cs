namespace RecruitmentATS.Domain.Entities;

public class JobPostingTag
{
    public Guid JobPostingId { get; set; }
    public JobPosting JobPosting { get; set; } = null!;

    public Guid TagId { get; set; }
    public Tag Tag { get; set; } = null!;
}