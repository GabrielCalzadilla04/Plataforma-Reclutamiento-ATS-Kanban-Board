using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecruitmentATS.Domain.Entities;

namespace RecruitmentATS.Infrastructure.Data.Configurations;

public class JobPostingConfiguration : IEntityTypeConfiguration<JobPosting>
{
    public void Configure(EntityTypeBuilder<JobPosting> builder)
    {
        builder.ToTable("job_postings");
        builder.HasKey(j => j.Id);

        builder.Property(j => j.Title).IsRequired().HasMaxLength(200);
        builder.Property(j => j.Description).IsRequired().HasMaxLength(5000);
        builder.Property(j => j.Requirements).HasMaxLength(5000);
        builder.Property(j => j.Location).HasMaxLength(200);
        builder.Property(j => j.SalaryRange).HasMaxLength(100);
        builder.Property(j => j.Department).HasMaxLength(100);
        builder.Property(j => j.ContractType).HasMaxLength(50);
        builder.Property(j => j.Status).HasConversion<string>().HasMaxLength(20);

        builder.HasIndex(j => j.Status);
        builder.HasIndex(j => j.CreatedAt);

        builder.HasMany(j => j.Candidates)
            .WithOne(c => c.JobPosting)
            .HasForeignKey(c => c.JobPostingId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}