import React, { useEffect, useState } from "react";
import TaskContext from "./context/taskContext";
import type { TaskType } from "./context/taskContext";
import TaskItem from "./components/taskItem";

function App() {
        const [tasks,setTasks]=useState<TaskType[]>([])
        const [taskInput,setTaskInput]=useState<string>("")
        const [showCompTasks,setShowCompTasks]=useState<boolean>(false)
        const addTask=(task:TaskType)=>{
            
              setTasks((prevTasks)=>[...prevTasks,task])
            }
        const deleteTask=(id:number)=>{
          setTasks((prevTasks)=>prevTasks.filter((prevTask)=>prevTask.id!==id))
        }
        const updateTask=(task:TaskType,id:number)=>{
            setTasks((prevTasks)=>prevTasks.map((prevTask)=>prevTask.id===id?task:prevTask))
        }
        const toggleIscomplete=(id:number)=>{
          setTasks((prevTasks)=>prevTasks.map((prevTask)=>(prevTask.id===id?{...prevTask,isCompleted:!prevTask.isCompleted}:prevTask)))
        }
        const handleSubmit=(e:React.SubmitEvent<HTMLFormElement>)=>{
            e.preventDefault()
            if(!taskInput)return ;
            addTask({id:Date.now(),taskValue:taskInput,isCompleted:false})
            setTaskInput("")
        }
        
        useEffect(()=>{
            const localTasks:TaskType[]=JSON.parse(localStorage.getItem("tasks")||"[]")
            // console.log(localTasks);
            // if(localTasks && localTasks.length>0)
           setTasks(localTasks)
            // console.log(tasks);
            
        },[])
        useEffect(()=>{
          localStorage.setItem("tasks",JSON.stringify(tasks))
          // console.log("working");
          
        },[tasks])
       
  return (
    <>
    <TaskContext value={{tasks,addTask,deleteTask,updateTask,toggleIscomplete}}>
        <div className="flex flex-col items-center  w-full  h-screen">

           <h1 className={ `text-center text-8xl text-transparent bg-linear-120 ${showCompTasks?'from-white via bg-green-300 to-green-600':'from-white via-red-200 to-red-600'} bg-clip-text my-14 leading-['1.3'] `}>Task Manager</h1>
          <form 
          id="taskInput"
          onSubmit={handleSubmit}
          className="w-4xl flex justify-center"> 
         
          <input
          type="text" 
          placeholder="add Task..." 
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTaskInput(e.target.value)}
          className="border border-white px-3.5 py-2 w-lg bg-slate-950 text-lg text-white rounded-full focus:outline focus:outline-white"
          value={taskInput}
          />
          <button 
          className="px-3.5 py-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white text-lg mx-3 "
          type="submit"
          >Add Task</button>
          </form>

          { !showCompTasks&&<div className="flex flex-col gap-3 my-4">
            {
              tasks?.map((task)=>(
                !task.isCompleted&&
               <TaskItem key={task.id} task={task} />
              ))
            }
           
          </div>
          }
          { showCompTasks&&<div className="flex flex-col gap-3 my-4">
            {
              tasks?.map((task)=>(
                task.isCompleted&&
               <TaskItem key={task.id} task={task} />
              ))
            }
           
          </div>
          }
           { tasks?.length>0 &&<button 
           onClick={()=>setShowCompTasks((prev)=>!prev)}
           className="text-white font-bold hover:underline hover:text-blue-500">{ showCompTasks ?'Show upcomming task':'Show Completed Task'}</button>}
        </div>
     </TaskContext>
    </>
  );
}

export default App;
