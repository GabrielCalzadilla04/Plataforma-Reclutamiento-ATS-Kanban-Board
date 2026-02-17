using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecruitmentATS.Domain.Entities;

namespace RecruitmentATS.Infrastructure.Data.Configurations;

public class TagConfiguration : IEntityTypeConfiguration<Tag>
{
    public void Configure(EntityTypeBuilder<Tag> builder)
    {
        builder.ToTable("tags");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Name).IsRequired().HasMaxLength(100);
        builder.Property(t => t.Category).HasMaxLength(50);
        builder.HasIndex(t => t.Name).IsUnique();
    }
}

public class CandidateTagConfiguration : IEntityTypeConfiguration<CandidateTag>
{
    public void Configure(EntityTypeBuilder<CandidateTag> builder)
    {
        builder.ToTable("candidate_tags");
        builder.HasKey(ct => new { ct.CandidateId, ct.TagId });
        builder.HasOne(ct => ct.Candidate).WithMany(c => c.CandidateTags).HasForeignKey(ct => ct.CandidateId);
        builder.HasOne(ct => ct.Tag).WithMany(t => t.CandidateTags).HasForeignKey(ct => ct.TagId);
    }
}

public class JobPostingTagConfiguration : IEntityTypeConfiguration<JobPostingTag>
{
    public void Configure(EntityTypeBuilder<JobPostingTag> builder)
    {
        builder.ToTable("job_posting_tags");
        builder.HasKey(jt => new { jt.JobPostingId, jt.TagId });
        builder.HasOne(jt => jt.JobPosting).WithMany(j => j.JobPostingTags).HasForeignKey(jt => jt.JobPostingId);
        builder.HasOne(jt => jt.Tag).WithMany(t => t.JobPostingTags).HasForeignKey(jt => jt.TagId);
    }
}