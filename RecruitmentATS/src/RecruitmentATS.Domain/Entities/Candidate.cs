using RecruitmentATS.Domain.Common;
using RecruitmentATS.Domain.Enums;

namespace RecruitmentATS.Domain.Entities;

public class Candidate : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? LinkedInUrl { get; set; }
    public CandidateStatus Status { get; set; } = CandidateStatus.New;
    public int KanbanOrder { get; set; } = 0;

    public string? CvOriginalFileName { get; set; }
    public string? CvStoragePath { get; set; }
    public string? CvContentType { get; set; }

    public Guid JobPostingId { get; set; }

    public JobPosting JobPosting { get; set; } = null!;
    public ICollection<CandidateTag> CandidateTags { get; set; } = new List<CandidateTag>();
    public ICollection<Note> Notes { get; set; } = new List<Note>();
}