using System.ComponentModel.DataAnnotations;

namespace RecruitmentATS.Application.DTOs.JobPosting;

public class CreateJobPostingDto
{
    [Required] [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required] [MaxLength(5000)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(5000)]
    public string Requirements { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Location { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? SalaryRange { get; set; }

    [MaxLength(100)]
    public string? Department { get; set; }

    [MaxLength(50)]
    public string? ContractType { get; set; }

    public DateTime? ExpiresAt { get; set; }

    public List<string> Tags { get; set; } = new();
}