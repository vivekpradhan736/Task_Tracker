import axios from 'axios';
import { Project } from '@/types';

export const createProject = async (project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> => {
  const response = await axios.post('http://localhost:5000/api/projects', project);
  console.log("response",response)
  return response.data;
};

export const getProjects = async (userId: string): Promise<Project[]> => {
  const response = await axios.get('http://localhost:5000/api/projects');
  return response.data;
};

export const getProject = async (id: string): Promise<Project | undefined> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
    return response.data;
  } catch (error) {
    return undefined;
  }
};

export const updateProject = async (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> => {
  try {
    const response = await axios.put(`http://localhost:5000/api/projects/${id}`, updates);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`http://localhost:5000/api/projects/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};