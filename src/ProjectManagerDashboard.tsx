import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Project {
  id: number;
  name: string;
}

interface Props {
  token: string;
}

const ProjectManagerDashboard: React.FC<Props> = ({ token }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get<Project[]>('http://192.168.0.73:8000/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setProjects(res.data))
      .catch(err => {
        console.error(err);
        setError('Error al obtener los proyectos');
      });
  }, [token]);

  return (
    <div className="container mt-5">
      <h1>Jefe de Obra</h1>
      <p>Bienvenido, solo tiene acceso a los proyectos asignados</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <ul className="list-group mt-4">
        {projects.length === 0 ? (
          <li className="list-group-item">No tiene proyectos asignados.</li>
        ) : (
          projects.map(project => (
            <li key={project.id} className="list-group-item">
              {project.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProjectManagerDashboard;

