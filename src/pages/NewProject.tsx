
import ProjectForm from '@/components/projects/ProjectForm';

const NewProject: React.FC = () => {
  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground">Add a new project to your workspace</p>
      </div>
      <ProjectForm />
    </div>
  );
};

export default NewProject;
