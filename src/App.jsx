import { useState, useEffect } from "react";
import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import Controls from "./Controls";
import "./App.css";

function App() {
  const [tasks, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pcmFAbWFpbC5jb20iLCJpZCI6MTc4OCwiaWF0IjoxNzU2NDgzMjA3fQ.MQNFfi825WOrQrk2IKXonp_IFsvFTI4PlEt_oFvCuR8",
          },
        }
      );
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleDone = async (id, isDone) => {
    try {
      await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pcmFAbWFpbC5jb20iLCJpZCI6MTc4OCwiaWF0IjoxNzU2NDgzMjA3fQ.MQNFfi825WOrQrk2IKXonp_IFsvFTI4PlEt_oFvCuR8",
          },
          body: JSON.stringify({ isDone: !isDone }),
        }
      );
      setTask((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isDone: !task.isDone } : task
        )
      );
    } catch (error) {
      setError("Не удалось загрузить задачи");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.isDone;
    if (filter === "completed") return task.isDone;
    return true;
  });
  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pcmFAbWFpbC5jb20iLCJpZCI6MTc4OCwiaWF0IjoxNzU2NDgzMjA3fQ.MQNFfi825WOrQrk2IKXonp_IFsvFTI4PlEt_oFvCuR8",
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);

      setTask((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
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
    </>
  );
}

export default App;
