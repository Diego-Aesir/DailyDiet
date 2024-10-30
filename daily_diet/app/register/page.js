"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postRegister } from "@/app/lib/api";
import styles from "../styles/register.module.css";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    weight: "",
    height: "",
    age: "",
  });
  const [error, setError] = useState("");

  const validate = () => {
    const { username, password, weight, height, age } = formData;
    setError("");

    if (username.length < 3 || username.length > 10) {
      setError("O nome de usuário deve ter entre 3 e 10 caracteres.");
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError(
        "O nome de usuário pode conter apenas letras, números e underscores."
      );
      return false;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    if (!/\d/.test(password)) {
      setError("A senha deve conter pelo menos um número.");
      return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("A senha deve conter pelo menos um caractere especial.");
      return false;
    }

    if (!/^\d+(\.\d+)?$/.test(weight) || weight <= 1 || weight > 300) {
      setError("O peso deve ser um número entre 1 e 300 kg.");
      return false;
    }

    const parsedHeight = parseFloat(height.replace(",", "."));
    if (parsedHeight < 0.3 || parsedHeight > 3.0) {
      setError("A altura deve estar entre 0,30 e 3,00 metros.");
      return false;
    }

    if (!/^\d+$/.test(age) || age < 0 || age > 120) {
      setError("A idade deve ser um número entre 0 e 120 anos.");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await postRegister(
        formData.username,
        formData.password,
        parseFloat(formData.weight),
        parseFloat(formData.height.replace(",", ".")),
        parseInt(formData.age)
      );

      const { User, Token } = response;
      localStorage.setItem("user_id", User.id);
      localStorage.setItem("token", Token);

      router.push(`/${User.id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.registerContainer}>
        <h1 className={styles.title}>Registrar-se</h1>
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
              placeholder="Ex: usuario123"
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
              placeholder="Ex: Senha!123"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="weight" className={styles.label}>
              Peso (kg):
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Ex: 70"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="height" className={styles.label}>
              Altura (m):
            </label>
            <input
              type="text"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Ex: 1.75"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="age" className={styles.label}>
              Idade (anos):
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ex: 25"
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
