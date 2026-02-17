using System.ComponentModel.DataAnnotations;

namespace RecruitmentATS.Application.DTOs.JobPosting;

public class UpdateJobPostingDto
{
    [MaxLength(200)]  public string? Title { get; set; }
    [MaxLength(5000)] public string? Description { get; set; }
    [MaxLength(5000)] public string? Requirements { get; set; }
    [MaxLength(200)]  public string? Location { get; set; }
    [MaxLength(100)]  public string? SalaryRange { get; set; }
    [MaxLength(100)]  public string? Department { get; set; }
    [MaxLength(50)]   public string? ContractType { get; set; }
    public string? Status { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public List<string>? Tags { get; set; }
}