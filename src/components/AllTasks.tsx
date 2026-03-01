import React from 'react';
import TaskList from './taskList';
import type { TaskType } from '../context/taskContext';

interface Props {
  tasks: TaskType[];
}

export function AllTasks({ tasks }: Props) {
  return <TaskList tasksName="All Tasks" tasks={tasks} showCompleted={null} />;
}
