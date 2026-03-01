import { useState } from "react";
import type { TaskType } from "../context/taskContext";
import TaskItem from "./taskItem";
import {ChevronDown} from "lucide-react"

interface TaskListProps {
  tasksName: string;
  tasks: TaskType[];
  // "null" means no filtering, "true" only completed, "false" only unfinished
  showCompleted: null | boolean;
}
function TaskList({ tasksName, tasks, showCompleted }: TaskListProps) {
  const filteredTasks: TaskType[] = tasks.filter((task) => {
    if (showCompleted === null) return true;
    return task.isCompleted === showCompleted;
  });
  const [toggleArrow, setToggleArrow] = useState<boolean>(false);
  return (
    <> 
    <style>{`
      /* stagger fade-in/out of items when collapsing */
      .task-list .task-item { transform: translateY(0) scale(1); opacity: 1; transition: transform 320ms cubic-bezier(.2,.9,.3,1), opacity 300ms ease; }
      .task-list.is-closed .task-item { transform: translateY(-8px) scale(0.995); opacity: 0; }
      .task-list.is-closed .task-item:nth-child(1) { transition-delay: 0ms; }
      .task-list.is-closed .task-item:nth-child(2) { transition-delay: 20ms; }
      .task-list.is-closed .task-item:nth-child(3) { transition-delay: 40ms; }
      .task-list.is-closed .task-item:nth-child(4) { transition-delay: 60ms; }
      .task-list.is-closed .task-item:nth-child(5) { transition-delay: 80ms; }
      .task-list.is-closed .task-item:nth-child(6) { transition-delay: 100ms; }
      .task-list.is-closed .task-item:nth-child(7) { transition-delay: 120ms; }
      .task-list.is-closed .task-item:nth-child(8) { transition-delay: 140ms; }
      .task-list.is-open .task-item:nth-child(1) { transition-delay: 0ms; }
      .task-list.is-open .task-item:nth-child(2) { transition-delay: 30ms; }
      .task-list.is-open .task-item:nth-child(3) { transition-delay: 60ms; }
      .task-list.is-open .task-item:nth-child(4) { transition-delay: 90ms; }
      .task-list.is-open .task-item:nth-child(5) { transition-delay: 120ms; }
      .task-list.is-open .task-item:nth-child(6) { transition-delay: 150ms; }
      .task-list.is-open .task-item:nth-child(7) { transition-delay: 180ms; }
      .task-list.is-open .task-item:nth-child(8) { transition-delay: 210ms; }
    `}</style>

    <div className="px-6 py-8 w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
      
      <div className="flex justify-between items-center"> 
      <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow">{tasksName}</h2>
      <div className="flex items-center">
        <button 
          onClick={()=>setToggleArrow((prev)=>!prev)}
          className="p-2.5 rounded-full bg-white/20 hover:bg-blue-500/40 transition-all duration-200 hover:scale-110 active:scale-95"
        >
            <ChevronDown className={`w-6 h-6 transition-transform duration-300 transform text-blue-300 ${toggleArrow?"rotate-180":"text-gray-300"}`} />
        </button>
      </div>
      </div>
<div className={`task-list flex flex-col gap-3 transition-all duration-300 backdrop-blur-sm ${toggleArrow ? 'opacity-100 mt-4 is-open' : 'opacity-0 mt-0 is-closed'} ${toggleArrow ? '' : 'pointer-events-none'}`}>
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-400 py-4">
            {showCompleted === null
              ? 'No tasks yet'
              : showCompleted
              ? 'No completed tasks'
              : 'No upcoming tasks'}
          </p>
        )}
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
    </>
  );
}

export default TaskList;
