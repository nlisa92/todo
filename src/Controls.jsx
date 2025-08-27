const Controls = ({
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  remaining,
  clearCompleted,
}) => {
  return (
    <div className="controls">
      <div>
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active-filter" : ""}
        >
          Все
        </button>
        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active-filter" : ""}
        >
          Активные
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active-filter" : ""}
        >
          Завершённые
        </button>
      </div>

      <div>
        <button
          onClick={() => setSortOrder("newest")}
          className={sortOrder === "newest" ? "active-filter" : ""}
        >
          Новые сверху
        </button>
        <button
          onClick={() => setSortOrder("oldest")}
          className={sortOrder === "oldest" ? "active-filter" : ""}
        >
          Старые сверху
        </button>
      </div>

      <p>Осталось задач: {remaining}</p>
      <button onClick={clearCompleted}>Очистить выполненные</button>
    </div>
  );
};

export default Controls;
