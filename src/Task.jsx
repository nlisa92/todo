import { useState } from "react";

const Task = ({ task, deleteTask, isDoneChecked, editTitle }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleDownEnter = (e) => {
    if (e.key === "Enter") {
      editTitle(task.id, editText);
      setEditText("");
      setIsEdit((isEdit) => !isEdit);
    }
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => isDoneChecked(task.id)}
      />
      {!isEdit ? (
        <p className={task.isDone ? "active" : ""}>{task.title}</p>
      ) : (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleDownEnter}
        />
      )}

      <button onClick={() => setIsEdit((isEdit) => !isEdit)}>✍</button>
      <button onClick={() => deleteTask(task.id)}>❌</button>
    </div>
  );
};
export default Task;
