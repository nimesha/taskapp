import { render, screen } from '@testing-library/react';
import Card from './Card';
import { TaskContextProvider } from '../../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';

test('renders learn react link', () => {
  const task = {
    id: uuidv4(),
    title: 'New task',
    description: 'ToDo',
    state: 'Done',
  };

  render(
    <TaskContextProvider>
      <Card task={task} />
    </TaskContextProvider>
  );
  const titleElement = screen.getByText(/New task/i);
  expect(titleElement).toBeInTheDocument();
  const descriptionElement = screen.getByText(/ToDo/i);
  expect(descriptionElement).toBeInTheDocument();
});
