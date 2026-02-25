import { createContext, useContext } from "react";
export interface TaskType{
    id:number
    taskValue:string
    isCompleted:boolean
}
 export interface TaskContextType{
    tasks:TaskType[];
    addTask:(task:TaskType)=>void;
    updateTask:(task:TaskType,id:number)=>void;
    deleteTask:(id:number)=>void
    toggleIscomplete:(id:number)=>void

}
const TaskContext= createContext<TaskContextType>({
      tasks:[],
      addTask:()=>{},
      updateTask:()=>{},
      deleteTask:()=>{},
      toggleIscomplete:()=>{}
})

export const useTask=()=>useContext(TaskContext) 
export default TaskContext