import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://todo-redev.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
            gender: form.gender,
            age: Number(form.age), // важно: число
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Ошибка регистрации");
      }

      alert("Регистрация успешна!");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Не удалось зарегистрироваться");
    }
  };

  return (
    <div className="auth-page">
      <h2>Регистрация</h2>

      <form onSubmit={handleRegister} className="auth-form">
        <input
          name="username"
          type="text"
          placeholder="Имя пользователя"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Выберите пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другое</option>
        </select>

        <input
          name="age"
          type="number"
          placeholder="Возраст"
          value={form.age}
          onChange={handleChange}
          min="1"
          required
        />

        <button type="submit">Зарегистрироваться</button>
      </form>

      <p onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
        Уже есть аккаунт? Войти
      </p>
    </div>
  );
}
