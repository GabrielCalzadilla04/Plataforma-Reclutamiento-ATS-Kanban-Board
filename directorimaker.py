#!/usr/bin/env python3
"""
 Ejecutar desde la carpeta ats-project:
   python generate_structure.py

 Crea carpetas y archivos VACÍOS listos para pegar código.
 Compatible con Windows (PowerShell / CMD).
"""
import os
import stat

BASE = os.path.dirname(os.path.abspath(__file__))

STRUCTURE = [
    # ── BACKEND: Scripts ──
    "RecruitmentATS\\setup-backend.sh",

    # ── BACKEND: Domain ──
    "RecruitmentATS\\src\\RecruitmentATS.Domain\\Common\\BaseEntity.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Domain\\Enums\\JobPostingStatus.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Domain\\Enums\\CandidateStatus.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Domain\\Entities\\JobPosting.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Domain\\Entities\\Candidate.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Domain\\Entities\\Tag.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Domain\\Entities\\CandidateTag.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Domain\\Entities\\JobPostingTag.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Domain\\Entities\\Note.cs",

    # ── BACKEND: Infrastructure ──
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Data\\AppDbContext.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Data\\Configurations\\JobPostingConfiguration.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Data\\Configurations\\CandidateConfiguration.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Data\\Configurations\\TagConfiguration.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Data\\Configurations\\NoteConfiguration.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Repositories\\IRepository.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Repositories\\Repository.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Repositories\\IJobPostingRepository.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Repositories\\JobPostingRepository.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Migrations\\.gitkeep",
    "RecruitmentATS\\src\\RecruitmentATS.Infrastructure\\Storage\\.gitkeep",

    # ── BACKEND: Application ──
    "RecruitmentATS\\src\\RecruitmentATS.Application\\DTOs\\JobPosting\\CreateJobPostingDto.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\DTOs\\JobPosting\\UpdateJobPostingDto.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\DTOs\\JobPosting\\JobPostingResponseDto.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\DTOs\\Candidate\\CreateCandidateDto.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\DTOs\\Candidate\\UpdateCandidateStatusDto.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\DTOs\\Candidate\\CandidateResponseDto.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\DTOs\\Candidate\\CandidateFilterDto.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\DTOs\\Note\\CreateNoteDto.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\DTOs\\Note\\NoteResponseDto.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Interfaces\\IJobPostingService.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Interfaces\\ICandidateService.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Interfaces\\IFileStorageService.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Interfaces\\INoteService.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Services\\JobPostingService.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Services\\CandidateService.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Services\\FileStorageService.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Services\\NoteService.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Validators\\CreateJobPostingValidator.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Validators\\CreateCandidateValidator.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Mappings\\MappingProfile.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Specifications\\ISpecification.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Specifications\\BaseSpecification.cs",
    "RecruitmentATS\\src\\RecruitmentATS.Application\\Specifications\\CandidateByTagsSpecification.cs",

    # ── BACKEND: API ──
    "RecruitmentATS\\src\\RecruitmentATS.API\\Controllers\\JobPostingsController.cs",
    "RecruitmentATS\\src\\RecruitmentATS.API\\Controllers\\CandidatesController.cs",
    "RecruitmentATS\\src\\RecruitmentATS.API\\Controllers\\FilesController.cs",
    "RecruitmentATS\\src\\RecruitmentATS.API\\Controllers\\KanbanController.cs",
    "RecruitmentATS\\src\\RecruitmentATS.API\\Middleware\\ExceptionHandlingMiddleware.cs",
    "RecruitmentATS\\src\\RecruitmentATS.API\\Extensions\\ServiceCollectionExtensions.cs",
    "RecruitmentATS\\src\\RecruitmentATS.API\\Program.cs",
    "RecruitmentATS\\src\\RecruitmentATS.API\\appsettings.json",
    "RecruitmentATS\\src\\RecruitmentATS.API\\appsettings.Development.json",
    "RecruitmentATS\\src\\RecruitmentATS.API\\Properties\\launchSettings.json",

    # ── BACKEND: Storage ──
    "RecruitmentATS\\storage\\cvs\\.gitkeep",

    # ── FRONTEND: Config ──
    "recruitment-frontend\\package.json",
    "recruitment-frontend\\vite.config.ts",
    "recruitment-frontend\\tsconfig.json",
    "recruitment-frontend\\tailwind.config.js",
    "recruitment-frontend\\postcss.config.js",
    "recruitment-frontend\\index.html",

    # ── FRONTEND: Source ──
    "recruitment-frontend\\src\\main.tsx",
    "recruitment-frontend\\src\\App.tsx",
    "recruitment-frontend\\src\\index.css",
    "recruitment-frontend\\src\\vite-env.d.ts",

    # ── FRONTEND: API ──
    "recruitment-frontend\\src\\api\\axiosClient.ts",
    "recruitment-frontend\\src\\api\\jobPostingApi.ts",
    "recruitment-frontend\\src\\api\\candidateApi.ts",
    "recruitment-frontend\\src\\api\\fileApi.ts",

    # ── FRONTEND: Types ──
    "recruitment-frontend\\src\\types\\jobPosting.ts",
    "recruitment-frontend\\src\\types\\candidate.ts",
    "recruitment-frontend\\src\\types\\kanban.ts",

    # ── FRONTEND: Hooks ──
    "recruitment-frontend\\src\\hooks\\useJobPostings.ts",
    "recruitment-frontend\\src\\hooks\\useCandidates.ts",
    "recruitment-frontend\\src\\hooks\\useDragAndDrop.ts",

    # ── FRONTEND: Utils ──
    "recruitment-frontend\\src\\utils\\formatters.ts",

    # ── FRONTEND: Components — Layout ──
    "recruitment-frontend\\src\\components\\layout\\Navbar.tsx",
    "recruitment-frontend\\src\\components\\layout\\Sidebar.tsx",
    "recruitment-frontend\\src\\components\\layout\\Footer.tsx",

    # ── FRONTEND: Components — Landing ──
    "recruitment-frontend\\src\\components\\landing\\JobCard.tsx",
    "recruitment-frontend\\src\\components\\landing\\JobList.tsx",
    "recruitment-frontend\\src\\components\\landing\\ApplicationForm.tsx",

    # ── FRONTEND: Components — Kanban ──
    "recruitment-frontend\\src\\components\\kanban\\KanbanBoard.tsx",
    "recruitment-frontend\\src\\components\\kanban\\KanbanColumn.tsx",
    "recruitment-frontend\\src\\components\\kanban\\CandidateCard.tsx",

    # ── FRONTEND: Components — Candidate ──
    "recruitment-frontend\\src\\components\\candidate\\CandidateModal.tsx",
    "recruitment-frontend\\src\\components\\candidate\\CandidateProfile.tsx",
    "recruitment-frontend\\src\\components\\candidate\\PdfViewer.tsx",
    "recruitment-frontend\\src\\components\\candidate\\NotesSection.tsx",

    # ── FRONTEND: Components — UI ──
    "recruitment-frontend\\src\\components\\ui\\Button.tsx",
    "recruitment-frontend\\src\\components\\ui\\Modal.tsx",
    "recruitment-frontend\\src\\components\\ui\\Badge.tsx",
    "recruitment-frontend\\src\\components\\ui\\FileUpload.tsx",
    "recruitment-frontend\\src\\components\\ui\\FilterBar.tsx",

    # ── FRONTEND: Pages ──
    "recruitment-frontend\\src\\pages\\LandingPage.tsx",
    "recruitment-frontend\\src\\pages\\JobDetailPage.tsx",
    "recruitment-frontend\\src\\pages\\DashboardPage.tsx",
    "recruitment-frontend\\src\\pages\\KanbanPage.tsx",
    "recruitment-frontend\\src\\pages\\JobManagementPage.tsx",
]

def main():
    created_dirs = set()
    created_files = 0

    for filepath in STRUCTURE:
        full = os.path.join(BASE, filepath)
        dirpath = os.path.dirname(full)

        if dirpath not in created_dirs:
            os.makedirs(dirpath, exist_ok=True)
            created_dirs.add(dirpath)

        if not os.path.exists(full):
            open(full, "w").close()
            created_files += 1
        else:
            print(f"  Ya existe: {filepath}")

    print(f"\n  Estructura creada:")
    print(f"   {len(created_dirs)} carpetas")
    print(f"   {created_files} archivos vacios")
    print(f"\n   Ahora pega el codigo en cada archivo.")

if __name__ == "__main__":
    main()