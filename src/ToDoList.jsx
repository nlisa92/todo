import Task from "./Task";

const ToDoList = ({ filteredTasks, deleteTask, isDoneChecked, editTitle }) => {
  return (
    <div>
      {filteredTasks.length === 0 && <h1>Пусто</h1>}
      {filteredTasks.map((item) => (
        <Task
          key={item.id}
          task={item}
          deleteTask={deleteTask}
          isDoneChecked={isDoneChecked}
          editTitle={editTitle}
        />
      ))}
    </div>
  );
};

export default ToDoList;
