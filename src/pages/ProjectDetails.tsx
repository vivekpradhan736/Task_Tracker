
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Project, Task } from '@/types';
import { getProject } from '@/services/projectService';
import { createTask, getTasks, updateTask, deleteTask } from '@/services/taskService';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TaskCard from '@/components/tasks/TaskCard';
import TaskForm from '@/components/tasks/TaskForm';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Plus, Calendar } from 'lucide-react';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (projectId) {
        const projectData = await getProject(projectId);
        if (projectData) {
          setProject(projectData);
          
          // Load tasks
          const projectTasks = await getTasks(projectId);
          setTasks(projectTasks);
        } else {
          navigate('/dashboard');
        }
      }
    };
  
    fetchData(); // Call the async function
  }, [projectId, navigate]);

  const handleCreateTask = (taskData: Partial<Task>) => {
    if (!projectId) return;

    try {
      const newTask = createTask({
        title: taskData.title || '',
        description: taskData.description || '',
        status: taskData.status || 'todo',
        projectId: projectId,
      });
      
      setTasks([...tasks, newTask]);
      
      toast({
        title: "Task Created",
        description: "Your new task has been created successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem creating your task.",
        variant: "destructive",
      });
    }
  };

  const handleEditTask = (taskData: Partial<Task>) => {
    if (!taskData.id) return;
    
    try {
      const updatedTask = updateTask(taskData.id, {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
      });
      
      if (updatedTask) {
        setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
        
        toast({
          title: "Task Updated",
          description: "Your task has been updated successfully.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem updating your task.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = () => {
    if (!deleteTaskId) return;
    
    try {
      const success = deleteTask(deleteTaskId);
      
      if (success) {
        setTasks(tasks?.filter(t => t.id !== deleteTaskId));
        
        toast({
          title: "Task Deleted",
          description: "Your task has been deleted successfully.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem deleting your task.",
        variant: "destructive",
      });
    } finally {
      setDeleteTaskId(null);
    }
  };

  const openEditTaskForm = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const filteredTasks = tasks?.filter(task => {
    if (selectedTab === 'all') return true;
    return task?.status === selectedTab;
  });

  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  if (!project) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>Loading project details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Created on {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            {project.description && (
              <p className="mt-2 text-muted-foreground">{project.description}</p>
            )}
          </div>
          
          <Button onClick={() => setIsTaskFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="all" 
        value={selectedTab} 
        onValueChange={setSelectedTab} 
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All Tasks ({taskCounts.all})
          </TabsTrigger>
          <TabsTrigger value="todo">
            To Do ({taskCounts.todo})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({taskCounts['in-progress']})
          </TabsTrigger>
          <TabsTrigger value="review">
            Review ({taskCounts.review})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({taskCounts.completed})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onEdit={openEditTaskForm} 
                  onDelete={(taskId) => setDeleteTaskId(taskId)} 
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <h3 className="font-medium mb-2">No tasks found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedTab === 'all' 
                  ? "This project doesn't have any tasks yet." 
                  : `There are no tasks with the status "${selectedTab.replace('-', ' ')}".`}
              </p>
              <Button onClick={() => setIsTaskFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add a Task
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Task Form Dialog */}
      {projectId && (
        <TaskForm
          isOpen={isTaskFormOpen}
          onClose={() => {
            setIsTaskFormOpen(false);
            setEditingTask(undefined);
          }}
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
          projectId={projectId}
          editingTask={editingTask}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTaskId} onOpenChange={() => setDeleteTaskId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectDetails;
