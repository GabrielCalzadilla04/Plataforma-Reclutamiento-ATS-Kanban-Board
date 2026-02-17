import { Briefcase } from 'lucide-react';
import JobList from '../components/landing/JobList';
import { useJobPostings } from '../hooks/useJobPostings';

export default function LandingPage() {
  const { jobs, loading, error } = useJobPostings('published');

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={20} className="text-primary-200" />
              <span className="text-sm font-medium text-primary-200 tracking-wide uppercase">Portal de empleo</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight">
              Encuentra tu proximo <span className="text-primary-200">gran reto</span>
            </h1>
            <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
              Explora nuestras vacantes abiertas y postulate directamente.
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {error ? (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg">{error}</p>
            <p className="text-surface-400 text-sm mt-2">Verifica que el backend este corriendo en localhost:5290</p>
          </div>
        ) : (
          <JobList jobs={jobs} loading={loading} />
        )}
      </section>
    </div>
  );
}