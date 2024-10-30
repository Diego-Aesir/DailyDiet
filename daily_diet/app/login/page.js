"use client";

import { useState } from "react";
import styles from "../styles/register.module.css";
import { postLogin } from "../lib/api";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postLogin(formData.username, formData.password);
      const { user_id, token } = response;

      localStorage.setItem("user_id", user_id);
      localStorage.setItem("token", token);

      router.push(`/${user_id}`);
    } catch (error) {
      setError("Parece que sua senha ou seu nome de usuário estão incorretos.");
    }
  };

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.registerContainer}>
        <h1 className={styles.title}>Entrar</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Nome de usuário:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
