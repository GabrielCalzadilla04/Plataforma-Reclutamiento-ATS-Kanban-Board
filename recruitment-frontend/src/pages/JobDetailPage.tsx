import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Banknote, Users, Calendar } from 'lucide-react';
import { jobPostingApi } from '../api/jobPostingApi';
import Badge from '../components/ui/Badge';
import type { JobPosting } from '../types/jobPosting';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    jobPostingApi.getById(id).then(setJob).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
        <div className="h-8 bg-surface-200 rounded w-2/3 mb-4"></div>
        <div className="h-4 bg-surface-100 rounded w-1/3 mb-8"></div>
        <div className="space-y-3">{[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-surface-100 rounded w-full"></div>)}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-xl text-surface-500">Vacante no encontrada</p>
        <Link to="/" className="btn-primary mt-4 inline-flex">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-primary-600 mb-6 transition-colors">
        <ArrowLeft size={16} />Volver a vacantes
      </Link>
      <div className="card p-8">
        <div className="mb-6">
          {job.department && <Badge variant="neutral">{job.department}</Badge>}
          <h1 className="mt-2 text-3xl font-bold text-surface-900 font-display">{job.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-surface-500">
            {job.location && <span className="flex items-center gap-1.5"><MapPin size={16} />{job.location}</span>}
            {job.contractType && <span className="flex items-center gap-1.5"><Clock size={16} />{job.contractType}</span>}
            {job.salaryRange && <span className="flex items-center gap-1.5"><Banknote size={16} />{job.salaryRange}</span>}
            <span className="flex items-center gap-1.5"><Users size={16} />{job.candidateCount} postulante{job.candidateCount !== 1 ? 's' : ''}</span>
            {job.expiresAt && <span className="flex items-center gap-1.5"><Calendar size={16} />Expira: {new Date(job.expiresAt).toLocaleDateString('es-ES')}</span>}
          </div>
        </div>
        {job.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">{job.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
        )}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-surface-900 font-display mb-3">Descripcion del puesto</h2>
          <div className="text-sm text-surface-600 whitespace-pre-wrap">{job.description}</div>
        </div>
        {job.requirements && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-surface-900 font-display mb-3">Requisitos</h2>
            <div className="text-sm text-surface-600 whitespace-pre-wrap">{job.requirements}</div>
          </div>
        )}
        <div className="mt-8 pt-6 border-t border-surface-100">
          <div className="bg-primary-50 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-primary-900 font-display">Te interesa esta posicion?</h3>
            <p className="text-sm text-primary-700 mt-1 mb-4">El formulario de postulacion estara disponible proximamente.</p>
            <button disabled className="btn-primary opacity-60 cursor-not-allowed">Postularme (proximamente)</button>
          </div>
        </div>
      </div>
    </div>
  );
}