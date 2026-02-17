using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecruitmentATS.Domain.Entities;

namespace RecruitmentATS.Infrastructure.Data.Configurations;

public class CandidateConfiguration : IEntityTypeConfiguration<Candidate>
{
    public void Configure(EntityTypeBuilder<Candidate> builder)
    {
        builder.ToTable("candidates");
        builder.HasKey(c => c.Id);

        builder.Property(c => c.FullName).IsRequired().HasMaxLength(200);
        builder.Property(c => c.Email).IsRequired().HasMaxLength(300);
        builder.Property(c => c.Phone).HasMaxLength(30);
        builder.Property(c => c.LinkedInUrl).HasMaxLength(500);
        builder.Property(c => c.Status).HasConversion<string>().HasMaxLength(20);
        builder.Property(c => c.CvOriginalFileName).HasMaxLength(300);
        builder.Property(c => c.CvStoragePath).HasMaxLength(500);
        builder.Property(c => c.CvContentType).HasMaxLength(100);

        builder.HasIndex(c => c.Email);
        builder.HasIndex(c => c.Status);
        builder.HasIndex(c => c.JobPostingId);

        builder.HasMany(c => c.Notes)
            .WithOne(n => n.Candidate)
            .HasForeignKey(n => n.CandidateId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}