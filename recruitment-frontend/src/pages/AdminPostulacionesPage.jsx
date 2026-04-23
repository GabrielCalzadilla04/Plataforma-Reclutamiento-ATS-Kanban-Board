import { useEffect, useState } from "react";
import KanbanBoard from "../components/postulaciones/KanbanBoard";
import { getPostulaciones } from "../api/postulacionesApi";

const AdminPostulacionesPage = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostulaciones()
      .then((res) => setPostulaciones(res.data))
      .catch((err) => console.error('Error loading postulaciones:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Cargando postulaciones...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-navy mb-6">
        Tablero de Candidatos
      </h1>
      <KanbanBoard postulaciones={postulaciones} />
    </div>
  );
};

export default AdminPostulacionesPage;
