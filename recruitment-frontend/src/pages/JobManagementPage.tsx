import { useState } from 'react';
import { Plus, Trash2, Globe, FileEdit, X } from 'lucide-react';
import { useJobPostings } from '../hooks/useJobPostings';
import { jobPostingApi } from '../api/jobPostingApi';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import type { CreateJobPostingRequest, UpdateJobPostingRequest } from '../types/jobPosting';

const statusConfig: Record<string, { label: string; variant: 'neutral' | 'success' | 'warning' | 'danger' }> = {
  Draft: { label: 'Borrador', variant: 'neutral' },
  Published: { label: 'Publicada', variant: 'success' },
  Closed: { label: 'Cerrada', variant: 'warning' },
  Archived: { label: 'Archivada', variant: 'danger' },
};

export default function JobManagementPage() {
  const { jobs, loading, createJob, publishJob, deleteJob, refetch } = useJobPostings('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const emptyForm: CreateJobPostingRequest = {
    title: '', description: '', requirements: '', location: '',
    salaryRange: '', department: '', contractType: '', tags: [],
  };
  const [form, setForm] = useState<CreateJobPostingRequest>(emptyForm);
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); }
  };

  const handleCreate = async () => {
    if (!form.title || !form.description) return;
    setSaving(true);
    try { await createJob(form); setShowCreateModal(false); setForm(emptyForm); }
    catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const openEdit = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    setForm({
      title: job.title, description: job.description, requirements: job.requirements,
      location: job.location, salaryRange: job.salaryRange || '', department: job.department || '',
      contractType: job.contractType || '', tags: job.tags,
    });
    setEditingJobId(jobId);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editingJobId) return;
    setSaving(true);
    try {
      const updateData: UpdateJobPostingRequest = { ...form };
      await jobPostingApi.update(editingJobId, updateData);
      setShowEditModal(false); setEditingJobId(null); setForm(emptyForm); await refetch();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handlePublish = async (id: string) => { try { await publishJob(id); } catch (err) { console.error(err); } };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Estas seguro de eliminar esta vacante?')) return;
    try { await deleteJob(id); } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 font-display">Gestion de Vacantes</h1>
          <p className="text-sm text-surface-500 mt-1">Crea, edita y publica vacantes con requisitos</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setShowCreateModal(true); }} className="btn-primary">
          <Plus size={18} />Nueva vacante
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-surface-100 rounded-lg"></div>)}</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-surface-400 text-lg">No hay vacantes creadas aun</p>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary mt-4"><Plus size={18} />Crear primera vacante</button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-50 border-b border-surface-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Vacante</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Ubicacion</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Estado</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Tags</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Candidatos</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {jobs.map((job) => {
                const statusInfo = statusConfig[job.status] || statusConfig.Draft;
                return (
                  <tr key={job.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-surface-900">{job.title}</p>
                      {job.department && <p className="text-xs text-surface-400 mt-0.5">{job.department}</p>}
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-600">{job.location || '-'}</td>
                    <td className="px-6 py-4"><Badge variant={statusInfo.variant}>{statusInfo.label}</Badge></td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {job.tags.slice(0, 3).map((tag) => <Badge key={tag} variant="primary">{tag}</Badge>)}
                        {job.tags.length > 3 && <span className="text-xs text-surface-400">+{job.tags.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-600">{job.candidateCount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {job.status === 'Draft' && (
                          <button onClick={() => handlePublish(job.id)} title="Publicar" className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"><Globe size={16} /></button>
                        )}
                        <button onClick={() => openEdit(job.id)} title="Editar" className="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"><FileEdit size={16} /></button>
                        <button onClick={() => handleDelete(job.id)} title="Eliminar" className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Nueva Vacante" size="lg">
        <JobForm form={form} tagInput={tagInput} onInputChange={handleInputChange} onTagInputChange={setTagInput}
          onTagKeyDown={handleTagKeyDown} onAddTag={addTag} onRemoveTag={removeTag} />
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-100">
          <button onClick={() => setShowCreateModal(false)} className="btn-secondary">Cancelar</button>
          <button onClick={handleCreate} disabled={!form.title || !form.description || saving} className="btn-primary">{saving ? 'Guardando...' : 'Crear vacante'}</button>
        </div>
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Editar Vacante" size="lg">
        <JobForm form={form} tagInput={tagInput} onInputChange={handleInputChange} onTagInputChange={setTagInput}
          onTagKeyDown={handleTagKeyDown} onAddTag={addTag} onRemoveTag={removeTag} />
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-100">
          <button onClick={() => setShowEditModal(false)} className="btn-secondary">Cancelar</button>
          <button onClick={handleUpdate} disabled={!form.title || !form.description || saving} className="btn-primary">{saving ? 'Guardando...' : 'Guardar cambios'}</button>
        </div>
      </Modal>
    </div>
  );
}

interface JobFormProps {
  form: CreateJobPostingRequest; tagInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onTagInputChange: (val: string) => void; onTagKeyDown: (e: React.KeyboardEvent) => void;
  onAddTag: () => void; onRemoveTag: (tag: string) => void;
}

function JobForm({ form, tagInput, onInputChange, onTagInputChange, onTagKeyDown, onAddTag, onRemoveTag }: JobFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">Titulo del puesto <span className="text-red-500">*</span></label>
        <input name="title" value={form.title} onChange={onInputChange} placeholder="Ej: Desarrollador Full Stack Senior" className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">Descripcion <span className="text-red-500">*</span></label>
        <textarea name="description" value={form.description} onChange={onInputChange} rows={4} placeholder="Describe las responsabilidades..." className="input-field resize-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">Requisitos</label>
        <textarea name="requirements" value={form.requirements} onChange={onInputChange} rows={3} placeholder="Experiencia minima, conocimientos..." className="input-field resize-none" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Ubicacion</label>
          <input name="location" value={form.location} onChange={onInputChange} placeholder="Ej: Remoto, CDMX" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Tipo de contrato</label>
          <select name="contractType" value={form.contractType} onChange={onInputChange} className="input-field">
            <option value="">Seleccionar...</option>
            <option value="Full-time">Tiempo completo</option>
            <option value="Part-time">Medio tiempo</option>
            <option value="Contract">Contrato</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Pasantia</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Rango salarial</label>
          <input name="salaryRange" value={form.salaryRange} onChange={onInputChange} placeholder="Ej: $2,000 - $3,500 USD" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Departamento</label>
          <input name="department" value={form.department} onChange={onInputChange} placeholder="Ej: Ingenieria, Marketing" className="input-field" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">Tags / Requisitos clave</label>
        <div className="flex gap-2">
          <input value={tagInput} onChange={(e) => onTagInputChange(e.target.value)} onKeyDown={onTagKeyDown}
            placeholder="Escribe un tag y presiona Enter" className="input-field flex-1" />
          <button type="button" onClick={onAddTag} className="btn-secondary !px-4"><Plus size={16} /></button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {form.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                {tag}
                <button onClick={() => onRemoveTag(tag)} className="hover:text-red-500 transition-colors"><X size={12} /></button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}