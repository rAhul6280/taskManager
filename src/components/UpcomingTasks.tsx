import TaskList from './taskList';
import type { TaskType } from '../context/taskContext';

interface Props {
  tasks: TaskType[];
}

export function UpcomingTasks({ tasks }: Props) {
  return <TaskList tasksName="Upcoming Tasks" tasks={tasks} showCompleted={false} />;
}
