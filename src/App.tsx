import React, { useEffect, useState } from "react";
import TaskContext from "./context/taskContext";
import type { TaskType } from "./context/taskContext";
import TaskList from "./components/taskList";


function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  // state removed - showing all lists at once
  const addTask = (task: TaskType) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask.id !== id));
  };
  const updateTask = (task: TaskType, id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) => (prevTask.id === id ? task : prevTask)),
    );
  };
  const toggleIscomplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === id
          ? { ...prevTask, isCompleted: !prevTask.isCompleted }
          : prevTask,
      ),
    );
  };
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskInput) return;
    addTask({ id: Date.now(), taskValue: taskInput, isCompleted: false });
    setTaskInput("");
  };

  useEffect(() => {
    const localTasks: TaskType[] = JSON.parse(
      localStorage.getItem("tasks") || "[]",
    );
    // console.log(localTasks);
    // if(localTasks && localTasks.length>0)
    setTasks(localTasks);
    // console.log(tasks);
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // console.log("working");
  }, [tasks]);

  return (
    <>
      <TaskContext
        value={{ tasks, addTask, deleteTask, updateTask, toggleIscomplete }}
      >
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .heading-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
        <div className="flex flex-col items-center w-full min-h-screen">
          <h1
            className={`heading-float text-center text-8xl font-black text-transparent bg-linear-120 from-blue-300 via-purple-400 to-pink-500 bg-clip-text my-14 leading-relaxed drop-shadow-2xl tracking-tight`}
          >
            Task Manager
          </h1>
          <form
            id="taskInput"
            onSubmit={handleSubmit}
            className="w-4xl flex justify-center gap-3"
          >
            <input
              type="text"
              placeholder="add a new task..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTaskInput(e.target.value)
              }
              className="px-4 py-3 w-lg bg-white/10 border border-white/20 text-lg text-white rounded-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 placeholder-white/40 backdrop-blur-sm"
              value={taskInput}
            />
            <button
              className="px-6 py-3 rounded-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-95 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              type="submit"
            >
              Add Task
            </button>
          </form>

          {/* {!showCompTasks && (
            <div className="flex flex-col gap-3 my-4">
              {tasks?.map(
                (task) =>
                  !task.isCompleted && <TaskItem key={task.id} task={task} />,
              )}
            </div>
          )}
          {showCompTasks && (
            <div className="flex flex-col gap-3 my-4">
              {tasks?.map(
                (task) =>
                  task.isCompleted && <TaskItem key={task.id} task={task} />,
              )}
            </div>
          )}
          {tasks?.length > 0 && (
            <button
              onClick={() => setShowCompTasks((prev) => !prev)}
              className="text-white font-bold hover:underline hover:text-blue-500"
            >
              {showCompTasks ? "Show upcomming task" : "Show Completed Task"}
            </button>
          )} */}

          <div className="w-full px-4 pb-12">
            <div className="flex flex-col gap-8 my-6">
              <TaskList tasksName="All Tasks" tasks={tasks} showCompleted={null} />
              <TaskList tasksName="Upcoming Tasks" tasks={tasks} showCompleted={false} />
              <TaskList tasksName="Completed Tasks" tasks={tasks} showCompleted={true} />
            </div>
          </div>
        </div>
      </TaskContext>
    </>
  );
}

export default App;
