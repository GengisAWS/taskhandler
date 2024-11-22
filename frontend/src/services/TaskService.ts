import axios from 'axios';
import { Task } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const TaskService = {
  async getTasks(): Promise<Task[]> {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  },

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const response = await axios.post(`${API_BASE_URL}/tasks`, task);
    return response.data;
  },

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  },
};