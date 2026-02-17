using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecruitmentATS.Domain.Entities;

namespace RecruitmentATS.Infrastructure.Data.Configurations;

public class NoteConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.ToTable("notes");
        builder.HasKey(n => n.Id);
        builder.Property(n => n.Content).IsRequired().HasMaxLength(2000);
        builder.Property(n => n.AuthorName).IsRequired().HasMaxLength(200);
        builder.HasIndex(n => n.CandidateId);
    }
}