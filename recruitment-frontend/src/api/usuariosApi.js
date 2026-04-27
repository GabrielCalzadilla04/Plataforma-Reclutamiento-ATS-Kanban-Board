import API from './axiosInstance';

// Datos simulados de usuarios
const mockUsuarios = [
  {
    id: 1,
    nombre: 'Carlos',
    apellido: 'Martinez',
    email: 'carlos.martinez@talentifysv.com',
    rol: 'Administrador',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    nombre: 'Maria',
    apellido: 'Rodriguez',
    email: 'maria.rodriguez@talentifysv.com',
    rol: 'Manager',
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: 3,
    nombre: 'Juan',
    apellido: 'Lopez',
    email: 'juan.lopez@talentifysv.com',
    rol: 'Manager',
    createdAt: '2024-03-10T09:15:00Z',
  },
  {
    id: 4,
    nombre: 'Ana',
    apellido: 'Gonzalez',
    email: 'ana.gonzalez@gmail.com',
    rol: 'General',
    createdAt: '2024-04-05T16:45:00Z',
  },
  {
    id: 5,
    nombre: 'Roberto',
    apellido: 'Hernandez',
    email: 'roberto.hernandez@gmail.com',
    rol: 'General',
    createdAt: '2024-04-12T11:20:00Z',
  },
  {
    id: 6,
    nombre: 'Sofia',
    apellido: 'Ramirez',
    email: 'sofia.ramirez@outlook.com',
    rol: 'General',
    createdAt: '2024-05-01T08:00:00Z',
  },
  {
    id: 7,
    nombre: 'Miguel',
    apellido: 'Torres',
    email: 'miguel.torres@talentifysv.com',
    rol: 'Manager',
    createdAt: '2024-05-15T13:30:00Z',
  },
  {
    id: 8,
    nombre: 'Laura',
    apellido: 'Sanchez',
    email: 'laura.sanchez@gmail.com',
    rol: 'General',
    createdAt: '2024-06-02T10:10:00Z',
  },
  {
    id: 9,
    nombre: 'Diego',
    apellido: 'Flores',
    email: 'diego.flores@hotmail.com',
    rol: 'General',
    createdAt: '2024-06-18T15:00:00Z',
  },
  {
    id: 10,
    nombre: 'Carmen',
    apellido: 'Vega',
    email: 'carmen.vega@talentifysv.com',
    rol: 'Administrador',
    createdAt: '2024-07-01T09:00:00Z',
  },
];

// Variable local para simular cambios
let usuariosData = [...mockUsuarios];

export const getUsuarios = async () => {
  try {
    const response = await API.get('/usuarios');
    return response;
  } catch {
    // Retornar datos simulados si la API falla
    return { data: usuariosData };
  }
};

export const changeUsuarioRol = async (id, rol) => {
  try {
    const response = await API.patch(`/usuarios/${id}/rol`, { rol });
    return response;
  } catch {
    // Simular cambio de rol
    const usuario = usuariosData.find(u => u.id === id);
    if (usuario) {
      usuario.rol = rol;
      return { data: { ...usuario } };
    }
    throw new Error('Usuario no encontrado');
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await API.delete(`/usuarios/${id}`);
    return response;
  } catch {
    // Simular eliminacion
    const index = usuariosData.findIndex(u => u.id === id);
    if (index !== -1) {
      usuariosData.splice(index, 1);
      return { data: { message: 'Usuario eliminado' } };
    }
    throw new Error('Usuario no encontrado');
  }
};
