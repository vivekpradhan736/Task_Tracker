import axios from 'axios';
import { Task } from '@/types';

export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  const response = await axios.post('http://localhost:5000/api/tasks', task);
  return response.data;
};

export const getTasks = async (projectId: string): Promise<Task[]> => {
  const response = await axios.get(`http://localhost:5000/api/tasks/project/${projectId}`);
  return response.data;
};

export const getTask = async (id: string): Promise<Task | undefined> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    return undefined;
  }
};

export const updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task | null> => {
  try {
    const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, updates);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};