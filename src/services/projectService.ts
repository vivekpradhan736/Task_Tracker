import axios from 'axios';
import { Project } from '@/types';

export const createProject = async (project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> => {
  const response = await axios.post('https://task-tracker-backend-scyc.onrender.com/api/projects', project);
  console.log("response",response)
  return response.data;
};

export const getProjects = async (userId: string): Promise<Project[]> => {
  const response = await axios.get('https://task-tracker-backend-scyc.onrender.com/api/projects');
  return response.data;
};

export const getProject = async (id: string): Promise<Project | undefined> => {
  try {
    const response = await axios.get(`https://task-tracker-backend-scyc.onrender.com/api/projects/${id}`);
    return response.data;
  } catch (error) {
    return undefined;
  }
};

export const updateProject = async (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> => {
  try {
    const response = await axios.put(`https://task-tracker-backend-scyc.onrender.com/api/projects/${id}`, updates);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`https://task-tracker-backend-scyc.onrender.com/api/projects/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};