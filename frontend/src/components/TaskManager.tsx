import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  Paper,
} from '@mui/material';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { TaskService } from '../services/TaskService';
import { Task } from '../types';

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await TaskService.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleCreateTask = async (task: Omit<Task, 'id'>) => {
    try {
      const newTask = await TaskService.createTask(task);
      setTasks([...tasks, newTask]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const task = await TaskService.updateTask(id, updatedTask);
      setTasks(tasks.map(t => t.id === id ? task : t));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await TaskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Task Manager
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsFormOpen(true)}
        sx={{ mb: 2 }}
      >
        Create New Task
      </Button>

      <TaskForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateTask}
      />

      {editingTask && (
        <TaskForm
          open={true}
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={(task) => handleUpdateTask(editingTask.id, task)}
        />
      )}

      <Paper elevation={2}>
        <List>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => setEditingTask(task)}
              onDelete={() => handleDeleteTask(task.id)}
              onStatusChange={(status) => handleUpdateTask(task.id, { status })}
            />
          ))}
        </List>
      </Paper>
    </Box>
  );
}