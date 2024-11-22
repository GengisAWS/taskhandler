import React from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Stack,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Task, TaskStatus } from '../types';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: TaskStatus) => void;
}

export default function TaskItem({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'error';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO':
        return 'default';
      case 'IN_PROGRESS':
        return 'primary';
      case 'DONE':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); onEdit(); }}>
              <EditIcon sx={{ mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); onDelete(); }}>
              <DeleteIcon sx={{ mr: 1 }} /> Delete
            </MenuItem>
            <MenuItem disabled>Status</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); onStatusChange('TODO'); }}>
              • To Do
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); onStatusChange('IN_PROGRESS'); }}>
              • In Progress
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); onStatusChange('DONE'); }}>
              • Done
            </MenuItem>
          </Menu>
        </>
      }
    >
      <ListItemText
        primary={task.title}
        secondary={
          <>
            {task.description}
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip
                label={task.priority.toLowerCase()}
                size="small"
                color={getPriorityColor(task.priority)}
              />
              <Chip
                label={task.status.toLowerCase().replace('_', ' ')}
                size="small"
                color={getStatusColor(task.status)}
              />
            </Stack>
          </>
        }
      />
    </ListItem>
  );
}