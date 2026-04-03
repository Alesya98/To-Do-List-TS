
export type FilterType = 'active' | 'done' | 'all'

type ButtonCompType = {
    setFilter: (filter: FilterType) => void;
}


export const ButtonComp = ({ setFilter }:ButtonCompType) => {
    return <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
        <button className="search-btn"  onClick={() => setFilter('active')}>Активные</button>
<button className="search-btn" onClick={() => setFilter('done')}>Готовые</button>
<button className="search-btn" onClick={() => setFilter('all')}>Все</button>
    </div>
}
