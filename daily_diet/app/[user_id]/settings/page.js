"use client";

import styles from "@/app/styles/settings.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getUserInfo,
  putUserName,
  putUserPassword,
  putUserWeight,
  putUserHeight,
  putUserAge,
  deleteUser,
} from "@/app/lib/api";

const Settings = () => {
  const route = useRouter();
  const [askUserName, setAskUserName] = useState(false);
  const [askPassword, setAskPassword] = useState(false);
  const [askWeight, setAskWeight] = useState(false);
  const [askHeight, setAskHeight] = useState(false);
  const [askAge, setAskAge] = useState(false);
  const [userNewValue, setUserNewValue] = useState({
    username: "",
    password: "",
    weight: null,
    height: null,
    age: null,
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    try {
      const response = await getUserInfo(user_id, token);
      setUserNewValue(response);
    } catch (error) {
      window.alert(
        "Não foi possível encontrar esse usuário, Erro: " + error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserNewValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeUsername = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (userNewValue.username.length < 3 || userNewValue.username.length > 10) {
      window.alert("O nome de usuário deve ter entre 3 e 10 caracteres.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(userNewValue.username)) {
      window.alert(
        "O nome de usuário pode conter apenas letras, números e underscores."
      );
      return;
    }

    try {
      await putUserName(user_id, userNewValue.username, token);
      window.alert("Nome de usuário alterado com sucesso");
    } catch (error) {
      window.alert(
        "Erro ao tentar alterar o nome de usuário: " + error.message
      );
    } finally {
      setAskUserName(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (userNewValue.password.length < 6) {
      window.alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!/\d/.test(userNewValue.password)) {
      window.alert("A senha deve conter pelo menos um número.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(userNewValue.password)) {
      window.alert("A senha deve conter pelo menos um caractere especial.");
      return;
    }

    try {
      await putUserPassword(user_id, userNewValue.password, token);
      window.alert("Senha alterada com sucesso");
    } catch (error) {
      window.alert("Erro ao tentar alterar a senha: " + error.message);
    } finally {
      setAskPassword(false);
    }
  };

  const handleChangeWeight = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (
      !/^\d+(\.\d+)?$/.test(userNewValue.weight) ||
      userNewValue.weight <= 1 ||
      userNewValue.weight > 300
    ) {
      window.alert("O peso deve ser um número entre 1 e 300 kg.");
      return;
    }

    try {
      await putUserWeight(user_id, userNewValue.weight, token);
      window.alert("Peso alterado com sucesso");
    } catch (error) {
      window.alert("Erro ao tentar alterar o peso: " + error.message);
    } finally {
      setAskWeight(false);
    }
  };

  const handleChangeHeight = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const parsedHeight = parseFloat(userNewValue.height.replace(",", "."));
    if (parsedHeight < 0.3 || parsedHeight > 3.0) {
      window.alert("A altura deve estar entre 0,30 e 3,00 metros.");
      return;
    }

    try {
      await putUserHeight(user_id, userNewValue.height, token);
      window.alert("Altura alterada com sucesso");
    } catch (error) {
      window.alert("Erro ao tentar alterar a altura: " + error.message);
    } finally {
      setAskHeight(false);
    }
  };

  const handleChangeAge = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (
      !/^\d+$/.test(userNewValue.age) ||
      userNewValue.age < 0 ||
      userNewValue.age > 120
    ) {
      window.alert("A idade deve ser um número entre 0 e 120 anos.");
      return;
    }

    try {
      await putUserAge(user_id, userNewValue.age, token);
      window.alert("Idade alterada com sucesso");
    } catch (error) {
      window.alert("Erro ao tentar alterar idade: " + error.message);
    } finally {
      setAskAge(false);
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm("Você tem certeza que deseja deletar esse usuário?")) {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");
      try {
        await deleteUser(user_id, token);
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        route.push("/");
      } catch (error) {
        window.alert("Erro ao deletar usuário: " + error.message);
      }
    }
  };

  return (
    <div className={styles.background}>
      <h1 className={styles.title} onClick={() => setAskUserName(true)}>
        Nome de usuário: {userNewValue.username}
      </h1>
      <h1
        className={styles.title}
        onClick={() => {
          setAskPassword(true);
          setUserNewValue((prev) => ({ ...prev, password: "" }));
        }}
      >
        Senha: *****
      </h1>
      <h1 className={styles.title} onClick={() => setAskWeight(true)}>
        Peso: {userNewValue.weight} kg
      </h1>
      <h1 className={styles.title} onClick={() => setAskHeight(true)}>
        Altura: {userNewValue.height} m
      </h1>
      <h1 className={styles.title} onClick={() => setAskAge(true)}>
        Idade: {userNewValue.age} anos
      </h1>

      {askUserName && (
        <dialog open className={styles.dialog}>
          <form onSubmit={handleChangeUsername}>
            <div className={styles.inputGroup}>
              <div className={styles.label}>Novo Nome de Usuário:</div>
              <input
                type="text"
                className={styles.input}
                name="username"
                value={userNewValue.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Alterar Nome de Usuário
              </button>
              <button
                type="button"
                onClick={() => setAskUserName(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}

      {askPassword && (
        <dialog open className={styles.dialog}>
          <form onSubmit={handleChangePassword}>
            <div className={styles.inputGroup}>
              <div className={styles.label}>Nova Senha:</div>
              <input
                type="text"
                className={styles.input}
                name="password"
                value={userNewValue.password}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Alterar Senha
              </button>
              <button
                type="button"
                onClick={() => setAskPassword(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}

      {askWeight && (
        <dialog open className={styles.dialog}>
          <form onSubmit={handleChangeWeight}>
            <div className={styles.inputGroup}>
              <div className={styles.label}>Novo Peso (kg):</div>
              <input
                type="number"
                className={styles.input}
                name="weight"
                value={userNewValue.weight}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Alterar Peso
              </button>
              <button
                type="button"
                onClick={() => setAskWeight(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}

      {askHeight && (
        <dialog open className={styles.dialog}>
          <form onSubmit={handleChangeHeight}>
            <div className={styles.inputGroup}>
              <div className={styles.label}>Nova Altura (m):</div>
              <input
                type="text"
                className={styles.input}
                name="height"
                value={userNewValue.height}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Alterar Altura
              </button>
              <button
                type="button"
                onClick={() => setAskHeight(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}

      {askAge && (
        <dialog open className={styles.dialog}>
          <form onSubmit={handleChangeAge}>
            <div className={styles.inputGroup}>
              <div className={styles.label}>Nova Idade:</div>
              <input
                type="number"
                className={styles.input}
                name="age"
                value={userNewValue.age}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Alterar Idade
              </button>
              <button
                type="button"
                onClick={() => setAskAge(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}

      <button onClick={handleDeleteUser} className={styles.deleteButton}>
        Deletar Usuário
      </button>
    </div>
  );
};

export default Settings;
