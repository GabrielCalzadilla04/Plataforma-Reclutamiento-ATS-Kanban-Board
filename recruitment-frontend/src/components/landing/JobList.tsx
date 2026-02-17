import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import JobCard from './JobCard';
import type { JobPosting } from '../../types/jobPosting';

interface JobListProps { jobs: JobPosting[]; loading: boolean; }

export default function JobList({ jobs, loading }: JobListProps) {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    jobs.forEach((j) => j.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every((tag) => job.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [jobs, search, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="h-4 bg-surface-200 rounded w-1/4 mb-3"></div>
            <div className="h-6 bg-surface-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-surface-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input type="text" placeholder="Buscar por titulo, descripcion o ubicacion..."
            value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
        </div>
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={14} className="text-surface-400" />
            {allTags.map((tag) => (
              <button key={tag} onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all cursor-pointer ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-surface-600 border-surface-200 hover:border-primary-300'
                }`}>{tag}</button>
            ))}
            {selectedTags.length > 0 && (
              <button onClick={() => setSelectedTags([])} className="text-xs text-surface-400 hover:text-surface-600 underline ml-2">
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>
      <p className="text-sm text-surface-500 mb-4">{filtered.length} vacante{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}</p>
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-surface-400 text-lg">No se encontraron vacantes</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}