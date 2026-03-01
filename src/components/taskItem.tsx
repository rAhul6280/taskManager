import { useRef, useState } from 'react'
import { useEffect } from 'react';
import { Edit2, Trash2, Save, Check } from 'lucide-react'
 import { useTask, type TaskType} from '../context/taskContext'

function TaskItem({task}:{task:TaskType}) {

   useEffect(() => {
    // component mounted
    return () => {
      // cleanup
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
    <style>{`
      .task-item-btn { transition: all 150ms cubic-bezier(0.34, 1.56, 0.64, 1); }
      .task-item-btn:hover { transform: scale(1.15) !important; }
      .task-item-btn:active { transform: scale(0.95) !important; }
    `}</style>
    <div className={`task-item flex items-center gap-3 px-5 py-4 transition-all duration-200 ease-out rounded-xl backdrop-blur-md text-white \
              ${task.isCompleted 
                ? 'bg-green-500/10 border border-green-400/30 shadow-lg opacity-70 line-through' 
                : 'bg-white/10 border border-white/20 shadow-lg'
              } \
              ${isEditable ? 'ring-2 ring-offset-1 ring-blue-400' : ''}`}>
            <button
              onClick={toggleComplete}
              className={`task-item-btn shrink-0 p-2 rounded-lg transition-all duration-150 ${
                task.isCompleted
                  ? 'bg-green-500/40 text-green-200 hover:bg-green-500/70 hover:text-green-100'
                  : 'bg-white/20 text-gray-300 hover:bg-blue-500/60 hover:text-blue-100'
              }`}
            >
              <Check size={20} />
            </button>
            <input type="text" ref={inputRef} readOnly={!isEditable} value={taskOut} 
            onChange={(e)=>SetTaskOut(e.target.value) }
            className={`outline-none flex-1 text-lg bg-transparent text-white placeholder-white/50 transition-all duration-200 ${
              isEditable ? 'bg-white/10 px-2 py-1 rounded' : ''
            }`}
            />
            <div className="flex gap-1.5">
            <button
              className={`task-item-btn shrink-0 p-2 rounded-lg transition-all duration-150 ${
                task.isCompleted
                  ? 'invisible'
                  : 'bg-white/20 text-gray-300 hover:bg-blue-500/60 hover:text-blue-100'
              }`}
              onClick={()=>{
                  if(task.isCompleted)return
                  if(isEditable){
                    editTask()
                  }else {
                    setIsEditable((prev)=>!prev)
                    inputRef.current?.focus()
                  }
              }}
            >
              {isEditable ? <Save size={18} /> : <Edit2 size={18} />}
            </button>
            <button
              className="task-item-btn shrink-0 p-2 rounded-lg bg-white/20 text-gray-300 hover:bg-red-500/60 hover:text-red-100 transition-all duration-150"
              onClick={()=>deleteTask(task.id)}
            >
              <Trash2 size={18} />
            </button>
             </div>

    </div>
    </>
  )
}

export default TaskItem