import { useState } from "react";

const InputTask = ({ setTask }) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [warning, setWarning] = useState("");

  const addNewTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pcmFAbWFpbC5jb20iLCJpZCI6MTc4OCwiaWF0IjoxNzU2NDgzMjA3fQ.MQNFfi825WOrQrk2IKXonp_IFsvFTI4PlEt_oFvCuR8",
          },
          body: JSON.stringify({
            title: text,
          }),
        }
      );
      const data = await response.json();
      setTask((prev) => [...prev, data]);
    } catch (error) {
      setWarning("Ошибка при добавлении задачи");
    } finally {
      setLoading(false);
    }
  };

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

    addNewTasks();
    setWarning("");
    setText("");
  };

  return (
    <>
      <input
        placeholder="Введите текст задачи..."
        value={text}
        onChange={handleChange}
      />
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Добавление..." : "Добавить"}
      </button>
      <p>{warning}</p>
    </>
  );
};

export default InputTask;
