import { useState, useEffect } from "react";
import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import Controls from "./Controls";
import "./App.css";

function App() {
  const [tasks, setTask] = useState([
    {
      id: 1,
      title: "Купить курс по Node",
      isDone: false,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.isDone;
    if (filter === "completed") return task.isDone;
    return true;
  });

  const isDoneChecked = (id) => {
    setTask((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const deleteTask = (id) => {
    setTask((tasks) => tasks.filter((item) => item.id !== id));
  };

  const editTitle = (id, newTitle) => {
    setTask((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
  };

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortOrder === "newest" ? b.id - a.id : a.id - b.id
  );

  const remaining = tasks.filter((task) => !task.isDone).length;

  const clearCompleted = () => {
    setTask((tasks) => tasks.filter((item) => !item.isDone));
  };
  console.log(sortOrder);
  return (
    <>
      <Header />
      <InputTask setTask={setTask} />
      <ToDoList
        filteredTasks={sortedTasks}
        deleteTask={deleteTask}
        isDoneChecked={isDoneChecked}
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
    </>
  );
}

export default App;
