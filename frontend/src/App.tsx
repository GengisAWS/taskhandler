import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import TaskManager from './components/TaskManager';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <TaskManager />
      </Container>
    </ThemeProvider>
  );
}

export default App;