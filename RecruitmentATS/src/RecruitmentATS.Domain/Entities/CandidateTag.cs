namespace RecruitmentATS.Domain.Entities;

public class CandidateTag
{
    public Guid CandidateId { get; set; }
    public Candidate Candidate { get; set; } = null!;

    public Guid TagId { get; set; }
    public Tag Tag { get; set; } = null!;
}