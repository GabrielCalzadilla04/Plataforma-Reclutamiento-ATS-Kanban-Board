import { MapPin, Clock, Users, Banknote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import type { JobPosting } from '../../types/jobPosting';

interface JobCardProps { job: JobPosting; }

export default function JobCard({ job }: JobCardProps) {
  const timeAgo = getTimeAgo(job.createdAt);

  return (
    <div className="card p-6 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {job.department && <Badge variant="neutral">{job.department}</Badge>}
          <h3 className="mt-2 text-lg font-semibold text-surface-900 font-display group-hover:text-primary-600 transition-colors">
            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-surface-500">
            {job.location && <span className="flex items-center gap-1.5"><MapPin size={14} />{job.location}</span>}
            {job.contractType && <span className="flex items-center gap-1.5"><Clock size={14} />{job.contractType}</span>}
            {job.salaryRange && <span className="flex items-center gap-1.5"><Banknote size={14} />{job.salaryRange}</span>}
            <span className="flex items-center gap-1.5"><Users size={14} />{job.candidateCount} postulante{job.candidateCount !== 1 ? 's' : ''}</span>
          </div>
          <p className="mt-3 text-sm text-surface-600 line-clamp-2">{job.description}</p>
          {job.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
            </div>
          )}
        </div>
        <Link to={`/jobs/${job.id}`} className="shrink-0 mt-2 p-2 rounded-lg text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-all">
          <ArrowRight size={20} />
        </Link>
      </div>
      <div className="mt-4 pt-4 border-t border-surface-100 flex items-center justify-between">
        <span className="text-xs text-surface-400">Publicada {timeAgo}</span>
        <Link to={`/jobs/${job.id}`} className="btn-primary text-xs !px-4 !py-2">Ver vacante</Link>
      </div>
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const diffDays = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'hoy';
  if (diffDays === 1) return 'ayer';
  if (diffDays < 7) return `hace ${diffDays} dias`;
  if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
  return `hace ${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;
}