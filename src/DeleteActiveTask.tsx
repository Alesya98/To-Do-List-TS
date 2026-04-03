import { memo } from "react"

type DeleteActiveType = {
    taskLength: number;
    clearActive: () => void;
}

const DeleteActiveTask = ({taskLength, clearActive}:DeleteActiveType) => {
 return <div>
    <p>Осталось дел: {taskLength}</p>
    <button className="search-btn" onClick={clearActive}>Оистить выполненые</button>
</div>
}

export default memo(DeleteActiveTask)