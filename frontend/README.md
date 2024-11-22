# DevFlow Frontend

This is the frontend application for the DevFlow task management system. It's built with React and Material-UI, providing a clean and intuitive interface for managing tasks.

## Setup Instructions

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create a .env file in the frontend directory with your API endpoint:
\`\`\`
REACT_APP_API_URL=your-api-gateway-url
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

## Features

- View all tasks in a clean, organized list
- Create new tasks with title, description, and priority
- Edit existing tasks
- Delete tasks
- Update task status (Todo, In Progress, Done)
- Priority levels (Low, Medium, High) with color coding
- Status tracking with visual indicators

## Structure

- \`src/components/\`: React components
- \`src/services/\`: API integration
- \`src/types.ts\`: TypeScript type definitions