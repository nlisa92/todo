import { useState, useEffect } from "react";
import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import Controls from "./Controls";

function TodoPage() {
  const [tasks, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const token = localStorage.getItem("token");

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://todo-redev.herokuapp.com/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTask(data);
    } catch (error) {
      setError("Ошибка загрузки задач");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleDone = async (id, isDone) => {
    try {
      await fetch(`https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isDone: !isDone }),
      });
      setTask((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isDone: !task.isDone } : task
        )
      );
    } catch {
      setError("Ошибка при обновлении задачи");
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`https://todo-redev.herokuapp.com/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTask((prev) => prev.filter((task) => task.id !== id));
    } catch {
      setError("Ошибка при удалении задачи");
    }
  };

  const editTitle = (id, newTitle) => {
    setTask((tasks) =>
      tasks.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.isDone;
    if (filter === "completed") return task.isDone;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortOrder === "newest" ? b.id - a.id : a.id - b.id
  );

  const remaining = tasks.filter((task) => !task.isDone).length;

  const clearCompleted = () => {
    setTask((tasks) => tasks.filter((item) => !item.isDone));
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <Header />

      {loading && (
        <div className="spinner-wrapper">
          <div className="spinner" />
        </div>
      )}

      {error && <p className="error">{error}</p>}
      <InputTask setTask={setTask} />
      <ToDoList
        filteredTasks={sortedTasks}
        deleteTask={deleteTask}
        isDoneChecked={toggleDone}
        editTitle={editTitle}
      />
      <Controls
        filter={filter}
        setFilter={setFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        remaining={remaining}
        clearCompleted={clearCompleted}
      />
      <button onClick={logout} className="logout-btn">Выйти</button>
    </>
  );
}

export default TodoPage;
