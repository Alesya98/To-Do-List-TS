import type { TaskProps } from "./App";
import Task from "./Task";

type ToDoListProps = {
    tasks:TaskProps[]
}

const ToDoList:React.FC<ToDoListProps> = ({ tasks }) => {
    // console.log(tasks)
    return (
        <div className="tasks">
            {tasks.length === 0 && <h3>Добавь задачу, которую нужно выполнить</h3>} 
            {tasks.map(item => <Task key={item.id} task={item} />)}
            
       </div>
    )
}

export default ToDoList;