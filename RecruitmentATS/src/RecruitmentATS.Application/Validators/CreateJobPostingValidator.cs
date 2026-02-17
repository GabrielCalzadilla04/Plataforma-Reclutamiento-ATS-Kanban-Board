using FluentValidation;
using RecruitmentATS.Application.DTOs.JobPosting;

namespace RecruitmentATS.Application.Validators;

public class CreateJobPostingValidator : AbstractValidator<CreateJobPostingDto>
{
    public CreateJobPostingValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("El titulo es obligatorio")
            .MaximumLength(200);

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("La descripcion es obligatoria")
            .MaximumLength(5000);

        RuleFor(x => x.ExpiresAt)
            .GreaterThan(DateTime.UtcNow)
            .When(x => x.ExpiresAt.HasValue)
            .WithMessage("La fecha de expiracion debe ser futura");

        RuleFor(x => x.Tags)
            .Must(tags => tags.Count <= 20)
            .WithMessage("Maximo 20 tags");

        RuleForEach(x => x.Tags)
            .NotEmpty()
            .MaximumLength(50);
    }
}