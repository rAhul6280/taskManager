import { useRef, useState } from 'react'
import { useEffect } from 'react';
 import { useTask, type TaskType} from '../context/taskContext'

function TaskItem({task}:{task:TaskType}) {

   useEffect(() => {
    console.log("Mounted");

    return () => {
      console.log("Unmounted - cleanup here");
    };
  }, []);
    const [taskOut,SetTaskOut]=useState<string>(task.taskValue)
    const [isEditable,setIsEditable]=useState<boolean>(false)
    const {updateTask,toggleIscomplete,deleteTask}=useTask()
    const inputRef=useRef<HTMLInputElement>(null)
    const toggleComplete=()=>{
      toggleIscomplete(task.id)
    }
    const editTask=()=>{updateTask({...task,taskValue:taskOut},task.id)
            setIsEditable(false)
    }
  return (
    <>
    <div className={`flex text-white  ${task.isCompleted?'bg-linear-90 from-green-500 via-green-300 to-green-100':'bg-linear-90 from-red-500 via-red-300 to bg-red-100 focus-within:outline-red-700'} ${isEditable?'focus-within:outline-1':'focus-within:outline-none'} rounded-lg gap-x-2 px-5 py-4  items-center transition-all duration-300 ease-in-out `}>
            <input type="checkbox" 
             checked={task.isCompleted}
             onChange={toggleComplete}
             className='outline-none'
            />
            <input type="text" ref={inputRef} readOnly={!isEditable} value={taskOut} 
            onChange={(e)=>SetTaskOut(e.target.value) }
            className='outline-none w-lg text-xl'
            />
            <div>
            <button
              className={`${task.isCompleted?'invisible':'inline'}`}
              onClick={()=>{
                  if(task.isCompleted)return
                  if(isEditable){
                    
                    editTask()
                  }else {setIsEditable((prev)=>!prev)
                    inputRef.current?.focus()
                  }

              }}
            >{isEditable?'🗃️':'✏️'}</button>
            <button
            onClick={()=>deleteTask(task.id)}
            >❌</button>
             </div>

    </div>
    </>
  )
}

export default TaskItem