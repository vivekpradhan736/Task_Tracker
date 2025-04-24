import axios from 'axios';
import { Task } from '@/types';

export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  const response = await axios.post('https://task-tracker-backend-scyc.onrender.com/api/tasks', task);
  return response.data;
};

export const getTasks = async (projectId: string): Promise<Task[]> => {
  const response = await axios.get(`https://task-tracker-backend-scyc.onrender.com/api/tasks/project/${projectId}`);
  return response.data;
};

export const getTask = async (id: string): Promise<Task | undefined> => {
  try {
    const response = await axios.get(`https://task-tracker-backend-scyc.onrender.com/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    return undefined;
  }
};

export const updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task | null> => {
  try {
    const response = await axios.put(`https://task-tracker-backend-scyc.onrender.com/api/tasks/${id}`, updates);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`https://task-tracker-backend-scyc.onrender.com/api/tasks/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};