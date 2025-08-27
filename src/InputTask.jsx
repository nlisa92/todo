import { useState } from "react";

const InputTask = ({ setTask }) => {
  const [text, setText] = useState("");
  const [warning, setWarning] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    setWarning("");
  };

  const handleClick = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setWarning("Введите непустую задачу");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: trimmed,
      isDone: false,
    };

    setTask((tasks) => [...tasks, newTask]);
    setText("");
  };

  return (
    <>
      <input
        placeholder="Введите текст задачи..."
        value={text}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Добавить</button>
      <p>{warning}</p>
    </>
  );
};

export default InputTask;
