import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://todo-redev.herokuapp.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Ошибка входа");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/todo");
    } catch (error) {
      alert("Неверные данные");
    }
  };

  return (
    <div className="auth-page">
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Войти</button>
      </form>
      <p onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
        Нет аккаунта? Зарегистрироваться
      </p>
    </div>
  );
}
