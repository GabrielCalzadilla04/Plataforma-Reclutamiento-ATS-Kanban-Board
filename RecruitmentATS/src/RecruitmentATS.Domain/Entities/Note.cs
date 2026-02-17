using RecruitmentATS.Domain.Common;

namespace RecruitmentATS.Domain.Entities;

public class Note : BaseEntity
{
    public string Content { get; set; } = string.Empty;
    public string AuthorName { get; set; } = string.Empty;

    public Guid CandidateId { get; set; }

    public Candidate Candidate { get; set; } = null!;
}