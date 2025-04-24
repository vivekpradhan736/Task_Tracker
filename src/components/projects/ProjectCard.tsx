
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const createdDate = new Date(project.createdAt).toLocaleDateString();

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Calendar className="h-4 w-4" /> Created on {createdDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{project.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-between"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          View Project
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
