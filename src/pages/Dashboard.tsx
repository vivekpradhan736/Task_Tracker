
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Project } from '@/types';
import { getProjects } from '@/services/projectService';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/projects/ProjectCard';
import { Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userProjects = getProjects(user.id);
      setProjects(userProjects);
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and tasks</p>
        </div>
        <Button onClick={() => navigate('/new-project')}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p>Loading projects...</p>
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-muted/20 rounded-lg">
          <h2 className="text-xl font-medium mb-2">No projects yet</h2>
          <p className="text-muted-foreground mb-6">
            Create your first project to get started
          </p>
          <Button onClick={() => navigate('/new-project')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
