import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  token: string;
}

interface Project {
  id: number;
  name: string;
}

const CoordinatorDashboard: React.FC<Props> = ({ token }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [error, setError] = useState('');

  // Load all projects on mount
  useEffect(() => {
    axios
      .get<Project[]>('http://192.168.0.73:8000/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.error(err);
        setError('Error al obtener proyectos');
      });
  }, [token]);

  const createProject = () => {
    if (!newProjectName.trim()) return;

    axios
      .post<Project>(
        'http://192.168.0.73:8000/projects',
        { name: newProjectName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setProjects([...projects, res.data]);
        setNewProjectName('');
      })
      .catch((err) => {
        console.error(err);
        setError('Error al crear el proyecto');
      });
  };

  const deleteProject = (id: number) => {
    axios
      .delete(`http://192.168.0.73:8000/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setProjects(projects.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error(err);
        setError('Error al eliminar el proyecto');
      });
  };

  return (
    <div className="container mt-5">
      <h1>Administrador</h1>
      <p>Bienvenido, tiene acceso a todos los proyectos.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nombre del nuevo proyecto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button className="btn btn-success" onClick={createProject}>
          Crear Proyecto
        </button>
      </div>

      <h4>Proyectos existentes:</h4>
      {projects.map((project) => (
        <div
          key={project.id}
          className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
        >
          <span>{project.name}</span>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteProject(project.id)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default CoordinatorDashboard;
