
import TaskList from './taskList';
import type { TaskType } from '../context/taskContext';

interface Props {
  tasks: TaskType[];
}

export function CompletedTasks({ tasks }: Props) {
  return <TaskList tasksName="Completed Tasks" tasks={tasks} showCompleted={true} />;
}
