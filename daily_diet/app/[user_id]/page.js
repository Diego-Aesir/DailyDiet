"use client";

import { useEffect, useState } from "react";
import {
  getAllDiets,
  getUserInfo,
  postDiets,
  putDiets,
  deleteDiets,
} from "../lib/api";
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
  const [alterDiet, setAlterDiet] = useState(false);
  const [dietId, setDietId] = useState(null);

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

  const changeDiet = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    try {
      await putDiets(user_id, dietId, newDiet.name, newDiet.description, token);
      setNewDiet({ name: "", description: "" });
      await getDiets();
      setAlterDiet(false);
      setDietId();
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
          <div className={styles.userValues}>
            <h1 className={styles.charInfo}>Peso: {user.weight} Kg</h1>
            <h1 className={styles.charInfo}>Altura: {user.height} m</h1>
            <h1 className={styles.charInfo}>Idade: {user.age} anos</h1>
          </div>
          <div className={styles.imageDiv}>
            <Image
              src="/noddle.png"
              alt="noddle"
              width={270}
              height={270}
              className={styles.image}
            />
            <Image
              src="/meat.png"
              alt="meat"
              width={270}
              height={270}
              className={styles.image}
            />
            <Image
              src="/avocado.png"
              alt="avocado"
              width={270}
              height={270}
              className={styles.image}
            />
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
                <div key={diet.id} className={styles.dietContainer}>
                  <div
                    className={styles.dietDiv}
                    onClick={() => openDiet(diet.id)}
                  >
                    <h1 className={styles.dietName}>{diet.name}</h1>
                    <h2 className={styles.dietDescription}>
                      {diet.description}
                    </h2>
                  </div>

                  <div className={styles.buttonDietContainer}>
                    <button
                      className={styles.changeDiet}
                      onClick={() => {
                        setAlterDiet(true);
                        setDietId(diet.id);
                      }}
                    >
                      Alterar Dieta
                    </button>
                    <button
                      className={styles.deleteDiet}
                      onClick={() => deleteDiet(diet.id)}
                    >
                      Apagar Dieta
                    </button>
                  </div>
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
            <div className={styles.inputGroup}>
              <div className={styles.label}>Nome da Dieta:</div>
              <input
                type="text"
                className={styles.input}
                name="name"
                value={newDiet.name}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.label}>Descrição da Dieta:</div>
              <input
                type="text"
                className={styles.input}
                name="description"
                value={newDiet.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Criar Dieta
              </button>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}

      {alterDiet && (
        <dialog open className={styles.insertDiet}>
          <form onSubmit={changeDiet}>
            <div className={styles.inputGroup}>
              <div className={styles.label}>Novo Nome da Dieta:</div>
              <input
                type="text"
                className={styles.input}
                name="name"
                value={newDiet.name}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.label}>Nova Descrição:</div>
              <input
                type="text"
                className={styles.input}
                name="description"
                value={newDiet.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Alterar Dieta
              </button>
              <button
                type="button"
                onClick={() => setAlterDiet(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default UserMainPage;
