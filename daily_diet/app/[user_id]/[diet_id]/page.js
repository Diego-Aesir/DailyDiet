"use client";

import { useEffect, useState } from "react";
import { getDietFromId, getAllMeals, postMeal } from "@/app/lib/api";
import Meal from "@/app/components/Meal";

import styles from "@/app/styles/dietPage.module.css";

const DietPage = () => {
  const [user_id, setUserId] = useState();
  const [token, setToken] = useState();
  const [diet_id, setDietId] = useState();
  const [diet, setDiet] = useState(null);
  const [meals, setMeals] = useState([]);
  const [createNewMeal, setCreateNewMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: "",
  });

  const getDiet = async () => {
    try {
      const response = await getDietFromId(user_id, diet_id, token);
      setDiet(response.diet);
      await getMeals();
    } catch (error) {
      window.alert("Não foi possível obter sua dieta.");
    }
  };

  const getMeals = async () => {
    try {
      const response = await getAllMeals(user_id, diet_id, token);
      setMeals(response.allMeals);
      console.log(response.allMeals);
    } catch (error) {
      window.alert("Não foi possível obter suas refeições.");
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    setUserId(localStorage.getItem("user_id"));
    setToken(localStorage.getItem("token"));
    const currentUrl = window.location.href;
    const segments = currentUrl.split("/");
    const id = segments.pop() || segments.pop();
    setDietId(id);
  }, []);

  useEffect(() => {
    if (diet_id) {
      getDiet();
    }
  }, [diet_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeal((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateMeal = async (e) => {
    e.preventDefault();

    try {
      await postMeal(user_id, diet_id, newMeal.name, token);
      setNewMeal({ name: "" });
      await getMeals();
      setCreateNewMeal(false);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleUpdateValues = async () => {
    await getDiet();
  };

  const handleDeleteMeal = async (id) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
    await getDiet();
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.mealsContainer}>
          <button
            className={styles.createNewMealButton}
            onClick={() => setCreateNewMeal(true)}
          >
            Criar nova refeição
          </button>
          <div className={styles.mealsDisplay}>
            {meals.length > 0 ? (
              meals.map((item) => (
                <Meal
                  key={item.id}
                  meal={item}
                  onUpdate={handleUpdateValues}
                  onDelete={handleDeleteMeal}
                ></Meal>
              ))
            ) : (
              <h1>Parece que ainda não há refeições criadas...</h1>
            )}
          </div>
        </div>
        {diet !== null ? (
          <div className={styles.dietMacroContainer}>
            <h3 className={styles.dietMacroItem}>
              <span className={styles.macroLabel}>Proteína:</span>{" "}
              {parseFloat(diet.protein).toFixed(2)}g
            </h3>
            <h3 className={styles.dietMacroItem}>
              <span className={styles.macroLabel}>Carboidratos:</span>{" "}
              {parseFloat(diet.carbs).toFixed(2)}g
            </h3>
            <h3 className={styles.dietMacroItem}>
              <span className={styles.macroLabel}>Gordura:</span>{" "}
              {parseFloat(diet.fat).toFixed(2)}g
            </h3>
            <h3 className={styles.dietMacroItem}>
              <span className={styles.macroLabel}>Calorias:</span>{" "}
              {parseFloat(diet.calories).toFixed(2)}
            </h3>
          </div>
        ) : (
          console.log("")
        )}
      </div>
      {createNewMeal && (
        <dialog open className={styles.dialog}>
          <form onSubmit={handleCreateMeal}>
            <div className={styles.inputGroup}>
              <div className={styles.label}>Nome da Refeição:</div>
              <input
                type="text"
                className={styles.input}
                name="name"
                value={newMeal.name}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Criar Refeição
              </button>
              <button
                type="button"
                onClick={() => setCreateNewMeal(false)}
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

export default DietPage;
