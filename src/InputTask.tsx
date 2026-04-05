import { memo, useState, type ChangeEvent} from "react"
import type { TaskProps } from "./App";

type InputTaskProps = {
    setTask:(tasks: TaskProps[]) => void;
    tasks: TaskProps[]
}

const InputTask: React.FC<InputTaskProps> = ({ setTask, tasks}) => {
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string>('')

    type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>

    const handleClick = () => {
             if (text.trim() === '') {
            setError('Нельзя добавить пустую задачу');
            return
        }
        setError('')

        const newTasks: TaskProps = {
            id: crypto.randomUUID(),
            title: text,
            isDone: false
        }
        setTask([...tasks, newTasks]);

        setText('')
    }
    
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }
       

    return (
<div style={{ marginBottom: "10px" }}>
            
            <input className="search" placeholder="Введите задачу"
                type="text" value={text}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            onKeyDown={handleKeyDown}/>
            <button className="search-btn" onClick={handleClick}>
                Добавить
            </button>
            {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
</div>
    )
}

export default memo(InputTask);