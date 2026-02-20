# Kanban Board
# 🏗️ Arquitectura Completa — ATS Kanban Board

## 1. Visión General

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
│  React 18 + TypeScript + Tailwind CSS + dnd-kit          │
│  Puerto: 5173                                            │
├─────────────────────────────────────────────────────────┤
│                        ↕ HTTP/REST                       │
├─────────────────────────────────────────────────────────┤
│                 BACKEND (.NET 8 Web API)                  │
│  N-Capas: Controller → Service → Repository              │
│  Puerto: 5290                                            │
├─────────────────────────────────────────────────────────┤
│                        ↕ EF Core                         │
├─────────────────────────────────────────────────────────┤
│                   PostgreSQL 16                           │
│  Puerto: 5432                                            │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Estructura de Carpetas — Backend

```
RecruitmentATS/
├── RecruitmentATS.sln
│
├── src/
│   ├── RecruitmentATS.API/                    # Capa de Presentación
│   │   ├── Controllers/
│   │   │   ├── JobPostingsController.cs       # CRUD vacantes
│   │   │   ├── CandidatesController.cs        # Postulaciones + PATCH status
│   │   │   ├── FilesController.cs             # Descarga segura de CVs
│   │   │   └── KanbanController.cs            # Board data + columnas
│   │   ├── Middleware/
│   │   │   └── ExceptionHandlingMiddleware.cs
│   │   ├── Extensions/
│   │   │   └── ServiceCollectionExtensions.cs  # Inyección de dependencias
│   │   ├── Program.cs
│   │   ├── appsettings.json
│   │   └── appsettings.Development.json
│   │
│   ├── RecruitmentATS.Application/            # Capa de Lógica de Negocio
│   │   ├── DTOs/
│   │   │   ├── JobPosting/
│   │   │   │   ├── CreateJobPostingDto.cs
│   │   │   │   ├── UpdateJobPostingDto.cs
│   │   │   │   └── JobPostingResponseDto.cs
│   │   │   ├── Candidate/
│   │   │   │   ├── CreateCandidateDto.cs
│   │   │   │   ├── UpdateCandidateStatusDto.cs
│   │   │   │   ├── CandidateResponseDto.cs
│   │   │   │   └── CandidateFilterDto.cs
│   │   │   └── Note/
│   │   │       ├── CreateNoteDto.cs
│   │   │       └── NoteResponseDto.cs
│   │   ├── Interfaces/
│   │   │   ├── IJobPostingService.cs
│   │   │   ├── ICandidateService.cs
│   │   │   ├── IFileStorageService.cs
│   │   │   └── INoteService.cs
│   │   ├── Services/
│   │   │   ├── JobPostingService.cs
│   │   │   ├── CandidateService.cs
│   │   │   ├── FileStorageService.cs
│   │   │   └── NoteService.cs
│   │   ├── Mappings/
│   │   │   └── MappingProfile.cs              # AutoMapper profiles
│   │   ├── Validators/
│   │   │   ├── CreateJobPostingValidator.cs   # FluentValidation
│   │   │   └── CreateCandidateValidator.cs
│   │   └── Specifications/                    # Patrón Especificación
│   │       ├── ISpecification.cs
│   │       ├── BaseSpecification.cs
│   │       └── CandidateByTagsSpecification.cs
│   │
│   ├── RecruitmentATS.Domain/                 # Capa de Dominio (Entidades)
│   │   ├── Entities/
│   │   │   ├── JobPosting.cs
│   │   │   ├── Candidate.cs
│   │   │   ├── CandidateTag.cs
│   │   │   ├── Tag.cs
│   │   │   ├── Note.cs
│   │   │   ├── KanbanColumn.cs
│   │   │   └── CvFile.cs
│   │   ├── Enums/
│   │   │   ├── CandidateStatus.cs
│   │   │   └── JobPostingStatus.cs
│   │   └── Common/
│   │       └── BaseEntity.cs
│   │
│   └── RecruitmentATS.Infrastructure/         # Capa de Acceso a Datos
│       ├── Data/
│       │   ├── AppDbContext.cs
│       │   └── Configurations/                # Fluent API configs
│       │       ├── JobPostingConfiguration.cs
│       │       ├── CandidateConfiguration.cs
│       │       ├── TagConfiguration.cs
│       │       └── NoteConfiguration.cs
│       ├── Repositories/
│       │   ├── IRepository.cs                 # Interfaz genérica
│       │   ├── Repository.cs                  # Implementación genérica
│       │   ├── IJobPostingRepository.cs
│       │   ├── JobPostingRepository.cs
│       │   ├── ICandidateRepository.cs
│       │   └── CandidateRepository.cs
│       ├── Migrations/
│       └── Storage/
│           └── LocalFileStorage.cs            # Almacenamiento de CVs
```

---

## 3. Estructura de Carpetas — Frontend

```
recruitment-frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── axiosClient.ts                    # Instancia Axios configurada
│   │   ├── jobPostingApi.ts                  # Endpoints vacantes
│   │   ├── candidateApi.ts                   # Endpoints candidatos
│   │   └── fileApi.ts                        # Endpoints archivos
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── landing/
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobList.tsx
│   │   │   └── ApplicationForm.tsx
│   │   ├── kanban/
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── KanbanColumn.tsx
│   │   │   └── CandidateCard.tsx
│   │   ├── candidate/
│   │   │   ├── CandidateModal.tsx
│   │   │   ├── CandidateProfile.tsx
│   │   │   ├── PdfViewer.tsx
│   │   │   └── NotesSection.tsx
│   │   └── ui/                               # Componentes reutilizables
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       ├── Badge.tsx
│   │       ├── FileUpload.tsx
│   │       └── FilterBar.tsx
│   ├── pages/
│   │   ├── LandingPage.tsx                   # Página pública postulación
│   │   ├── JobDetailPage.tsx                 # Detalle vacante + formulario
│   │   ├── DashboardPage.tsx                 # Panel principal reclutador
│   │   ├── KanbanPage.tsx                    # Tablero Kanban
│   │   └── JobManagementPage.tsx             # CRUD vacantes (admin)
│   ├── hooks/
│   │   ├── useJobPostings.ts
│   │   ├── useCandidates.ts
│   │   └── useDragAndDrop.ts
│   ├── types/
│   │   ├── jobPosting.ts
│   │   ├── candidate.ts
│   │   └── kanban.ts
│   ├── utils/
│   │   └── formatters.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                             # Tailwind directives
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 4. Modelo de Datos (ERD)

```
┌──────────────────┐       ┌──────────────────────┐
│   JobPosting     │       │     Candidate         │
├──────────────────┤       ├──────────────────────┤
│ Id (PK, GUID)   │──┐    │ Id (PK, GUID)        │
│ Title            │  │    │ FullName             │
│ Description      │  │    │ Email                │
│ Requirements     │  ├───>│ Phone                │
│ Location         │  │    │ JobPostingId (FK)    │
│ Salary Range     │  │    │ Status (enum)        │
│ Tags[]           │       │ CvFileName           │
│ Status (enum)    │       │ CvStoragePath        │
│ CreatedAt        │       │ KanbanOrder          │
│ ExpiresAt        │       │ CreatedAt            │
└──────────────────┘       │ UpdatedAt            │
                           └──────┬───────────────┘
                                  │           │
                    ┌─────────────┘           └──────────┐
                    ▼                                    ▼
          ┌─────────────────┐               ┌──────────────────┐
          │ CandidateTag    │               │     Note          │
          ├─────────────────┤               ├──────────────────┤
          │ CandidateId(FK) │               │ Id (PK, GUID)    │
          │ TagId (FK)      │               │ CandidateId (FK) │
          └────────┬────────┘               │ Content          │
                   │                        │ AuthorName       │
                   ▼                        │ CreatedAt        │
          ┌─────────────────┐               └──────────────────┘
          │      Tag        │
          ├─────────────────┤
          │ Id (PK, GUID)   │
          │ Name (unique)   │
          │ Category        │
          └─────────────────┘
```

---

## 5. Endpoints API

### Vacantes (JobPostings)
| Método | Ruta                         | Descripción                    |
|--------|------------------------------|--------------------------------|
| GET    | /api/job-postings            | Listar vacantes (público)      |
| GET    | /api/job-postings/{id}       | Detalle vacante (público)      |
| POST   | /api/job-postings            | Crear vacante (admin)          |
| PUT    | /api/job-postings/{id}       | Editar vacante (admin)         |
| DELETE | /api/job-postings/{id}       | Eliminar vacante (admin)       |

### Candidatos (Candidates)
| Método | Ruta                                 | Descripción                     |
|--------|--------------------------------------|---------------------------------|
| POST   | /api/candidates                      | Postularse (público + CV)       |
| GET    | /api/candidates                      | Listar candidatos (filtros)     |
| GET    | /api/candidates/{id}                 | Detalle candidato               |
| PATCH  | /api/candidates/{id}/status          | Cambiar status (Kanban D&D)     |
| GET    | /api/candidates/by-job/{jobId}       | Candidatos por vacante          |

### Archivos (Files)
| Método | Ruta                                 | Descripción                     |
|--------|--------------------------------------|---------------------------------|
| GET    | /api/files/cv/{candidateId}          | Descargar CV (protegido)        |

### Notas (Notes)
| Método | Ruta                                 | Descripción                     |
|--------|--------------------------------------|---------------------------------|
| POST   | /api/candidates/{id}/notes           | Agregar nota                    |
| GET    | /api/candidates/{id}/notes           | Listar notas del candidato      |

---

## 6. Flujos Principales

### Flujo 1: Candidato se postula
```
Candidato → Landing → Selecciona Vacante → Llena formulario + sube PDF
    → POST /api/candidates (multipart/form-data)
        → Backend valida MIME type (solo PDF)
        → Guarda archivo en /storage/cvs/{guid}.pdf
        → Crea registro en BD con status = "Nuevo"
        → Retorna 201 Created
```

### Flujo 2: Reclutador mueve tarjeta en Kanban
```
Reclutador → Arrastra tarjeta de "Entrevista" a "Oferta"
    → dnd-kit detecta onDragEnd
    → PATCH /api/candidates/{id}/status { status: "Oferta", order: 2 }
        → Backend actualiza status y kanbanOrder
        → Retorna 200 OK
    → Frontend actualiza estado local (optimistic update)
```

### Flujo 3: Ver CV de candidato
```
Reclutador → Click en tarjeta → Modal se abre
    → GET /api/files/cv/{candidateId}
        → Backend verifica permisos
        → Lee archivo de disco
        → Retorna FileStreamResult con Content-Type: application/pdf
    → Frontend renderiza PDF en <iframe> o react-pdf
```

---

## 7. Stack Tecnológico

| Capa         | Tecnología                              |
|--------------|-----------------------------------------|
| Frontend     | React 18, TypeScript, Vite              |
| Estilos      | Tailwind CSS 3                          |
| Drag & Drop  | @dnd-kit/core + @dnd-kit/sortable       |
| HTTP Client  | Axios                                   |
| Backend      | .NET 8 Web API, C#                      |
| ORM          | Entity Framework Core 8                 |
| Validación   | FluentValidation                        |
| Mapping      | AutoMapper                              |
| Base de Datos| PostgreSQL 16                           |
| Archivos     | Almacenamiento local (disco)            |

---

## 8. Orden de Implementación (Roadmap)

| Fase | Módulo                              | Entregable                              |
|------|-------------------------------------|-----------------------------------------|
| 1    | ✅ Setup + Vacantes                 | Backend CRUD + Landing pública          |
| 2    | Postulación + Upload CV             | Formulario + almacenamiento seguro      |
| 3    | Tablero Kanban                      | Board con D&D + persistencia            |
| 4    | Visor de Perfiles                   | Modal + PDF viewer + Notas              |
| 5    | Filtrado dinámico                   | Especificaciones + tags                 |
| 6    | Seguridad + Polish                  | Auth básica + validaciones finales      |
