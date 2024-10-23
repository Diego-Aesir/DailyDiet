"use client";

import { useEffect, useState } from "react";
import { getAllDiets, getUserInfo, postDiets, deleteDiets } from "../lib/api";
import Image from "next/image";
import styles from "@/app/styles/userMainPage.module.css";
import { useRouter } from "next/navigation";

const UserMainPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [diets, setDiets] = useState([]);
  const [newDiet, setNewDiet] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getDiets = async () => {
    setIsLoading(true);
    try {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");
      const response = await getAllDiets(user_id, token);
      setDiets(response.diets);
    } catch (error) {
      window.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const getUser = async () => {
      setIsLoading(true);
      try {
        const response = await getUserInfo(user_id, token);
        setUser(response);
      } catch (error) {
        window.alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
    getDiets();
  }, []);

  const handleCreateDiet = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    try {
      await postDiets(user_id, newDiet.name, newDiet.description, token);
      setNewDiet({ name: "", description: "" });
      await getDiets();
      setIsDialogOpen(false);
    } catch (error) {
      window.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDiet((prev) => ({ ...prev, [name]: value }));
  };

  const openDiet = (diet_id) => {
    const user_id = localStorage.getItem("user_id");

    router.push(`/${user_id}/${diet_id}`);
  };

  const deleteDiet = async (diet_id) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja apagar esta dieta?"
    );
    if (!confirmDelete) return;

    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      await deleteDiets(user_id, diet_id, token);
      await getDiets();
      router.push(`/${user_id}`);
    } catch (error) {
      window.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {isLoading && <div className={styles.loading}>Carregando...</div>}
        <div className={styles.characterSide}>
          <h1 className={styles.charInfo}>Bem-vindo {user.username}</h1>
          <br/>
          <div className={styles.imageDiv}>
            <Image
              src="/manChar.png"
              alt="man character"
              width={270}
              height={270}
              className={styles.image}
            />
            <Image
              src="/womanChar.png"
              alt="woman character"
              width={270}
              height={270}
              className={styles.image}
            />
          </div>
          <div className={styles.userValues}>
            <h1 className={styles.charInfo}>Peso: {user.weight} Kg</h1>
            <h1 className={styles.charInfo}>Altura: {user.height} m</h1>
            <h1 className={styles.charInfo}>Idade: {user.age} anos</h1>
          </div>
        </div>
        <div className={styles.dietSide}>
          <h1 className={styles.dietH1}>Minhas Dietas</h1>
          <div className={styles.dietBox}>
            <div className={styles.createDietContainer}>
              <button
                onClick={() => setIsDialogOpen(true)}
                className={styles.createDietH2}
              >
                Criar nova Dieta
              </button>
            </div>

            {diets.length > 0 ? (
              diets.map((diet) => (
                <div
                  key={diet.id}
                  className={styles.dietDiv}
                  onClick={() => openDiet(diet.id)}
                >
                  <h1 className={styles.dietName}>{diet.name}</h1>
                  <h2 className={styles.dietDescription}>{diet.description}</h2>
                  <button
                    className={styles.deleteDiet}
                    onClick={() => deleteDiet(diet.id)}
                  >
                    Apagar dieta
                  </button>
                </div>
              ))
            ) : (
              <h2 className={styles.noneDiet}>Nenhuma dieta ainda...</h2>
            )}
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <dialog open className={styles.insertDiet}>
          <form onSubmit={handleCreateDiet}>
            <label htmlFor="diet_name">Nome da Dieta:</label>
            <input
              type="text"
              id="diet_name"
              name="name"
              value={newDiet.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="diet_description">Descrição da Dieta:</label>
            <input
              type="text"
              id="diet_description"
              name="description"
              value={newDiet.description}
              onChange={handleChange}
              required
            />

            <button type="submit">Criar Dieta</button>
            <button type="button" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default UserMainPage;
