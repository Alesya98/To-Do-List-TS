import { useCallback, useEffect, useMemo, useState} from 'react';
import './App.css'
import Header from './Header'
import InputTask from './InputTask'
import ToDoList from './ToDoLIst';
import { DeleteTaskContext, type DeleteTaskContextType } from './DeleteTaskContext';
import { ButtonComp, type FilterType } from './ButtonComp';
import DeleteActiveTask from './DeleteActiveTask';

export type TaskProps = {
  id: string;
  title: string;
  isDone: boolean;
}

function App() {

  const [tasks, setTask] = useState<TaskProps[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

    useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
  
  const [filter, setFilter] = useState<FilterType>('all')
  
  const filteredTask = useMemo(() => {
    return tasks.filter(item => {
      if (filter === 'active') return !item.isDone;
      if (filter === 'done') return item.isDone;
      return true;
    })
  }, [filter, tasks])
  
  const taskLength = useMemo(
    () => filteredTask.filter(item => !item.isDone).length,
    [filteredTask]
  )

  const clearActive = useCallback(() => {
    setTask(tasks => tasks.filter(item => !item.isDone))
  },[])

  const deleteTask = useCallback((id:string) => {
    setTask(tasks =>
      tasks.filter(item => 
        item.id !== id
      )
    )
  }, [])

    const checkedTask = useCallback((id:string) => {
    setTask(tasks =>
      tasks.map(item => 
        item.id === id ? {...item, isDone: !item.isDone} : item
      )
    )
    }, [])
  
  const editTitle = useCallback((id:string, newTitle:string) => {
    setTask(tasks => 
      tasks.map(item => 
        item.id === id ? {...item, title: newTitle } : item
      )
    )
  }, [])

  const valueContext: DeleteTaskContextType = {
    deleteTask,
    checkedTask,
    editTitle
 }

  return (
    <>
      <Header />
      <InputTask setTask={setTask} tasks={tasks} />
      <DeleteTaskContext value={valueContext}>
      <ToDoList tasks={filteredTask} />
      </DeleteTaskContext>
      <ButtonComp setFilter={setFilter} />
      <DeleteActiveTask taskLength={taskLength} clearActive={clearActive}/>
    </>
  )
}

export default App
