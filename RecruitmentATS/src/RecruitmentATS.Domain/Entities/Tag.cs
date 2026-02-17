using RecruitmentATS.Domain.Common;

namespace RecruitmentATS.Domain.Entities;

public class Tag : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Category { get; set; }

    public ICollection<CandidateTag> CandidateTags { get; set; } = new List<CandidateTag>();
    public ICollection<JobPostingTag> JobPostingTags { get; set; } = new List<JobPostingTag>();
}