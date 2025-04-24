
import React from 'react';
import { Task } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-200 text-gray-700';
      case 'in-progress':
        return 'bg-blue-500 text-white';
      case 'review':
        return 'bg-purple-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-1">{task.title}</CardTitle>
          <Badge className={getStatusColor(task.status)}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        <div className="mt-2 text-xs text-muted-foreground">
          <p>Created: {formatDate(task.createdAt)}</p>
          {task.completedAt && (
            <p>Completed: {formatDate(task.completedAt)}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onEdit(task)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
