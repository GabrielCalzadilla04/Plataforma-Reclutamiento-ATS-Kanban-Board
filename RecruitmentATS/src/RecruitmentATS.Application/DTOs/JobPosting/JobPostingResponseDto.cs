namespace RecruitmentATS.Application.DTOs.JobPosting;

public class JobPostingResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Requirements { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string? SalaryRange { get; set; }
    public string? Department { get; set; }
    public string? ContractType { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public int CandidateCount { get; set; }
    public List<string> Tags { get; set; } = new();
}