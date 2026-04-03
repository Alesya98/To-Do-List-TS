import { useContext, useState, type ChangeEvent } from "react";
import type { TaskProps } from "./App";
import { DeleteTaskContext } from "./DeleteTaskContext";

type TaskPropsList = {
    task: TaskProps
}

type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>

const Task = ({ task }:TaskPropsList) => {
    const context = useContext(DeleteTaskContext)
    const [editText, setEditText] = useState<string>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)
    

    const handleSend = (e:KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (editText.trim() === '') {
                setEditText(task.title)
                setIsEdit(isEdit => !isEdit)
                return
            }
            context?.editTitle(task.id, editText);
            setIsEdit(isEdit => !isEdit)
        }
    }

    return <div className="task">
        <input className="task-check" type="checkbox" checked={task.isDone}
            onChange={() => context?.checkedTask(task.id)} />
        {!isEdit ? (
            <p className={task.isDone ? 'check' : ''}> {task.title} </p>
        ) : (
            <input value={editText} onChange={(e:ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleSend} />      
        )}
      
        
        <div className="btn">
            <button className="btn-task"
            onClick={() => setIsEdit(isEdit => !isEdit)}>
                 ✏️
            </button>
            <button
            className="btn-task" onClick={()=> context?.deleteTask(task.id)}>
                 ❌
            </button>
        </div>
</div>
}

export default Task;