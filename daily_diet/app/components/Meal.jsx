"use client";

import { useEffect, useState } from "react";
import { putMeal, deleteMeal, getAllFoods, postFood } from "../lib/api";
import Food from "@/app/components/Food";

import styles from "@/app/styles/Meal.module.css";

export default function Meal({ meal, onUpdate, onDelete }) {
  const [food, setFood] = useState([]);
  const [newMeal, setNewMeal] = useState({
    name: meal.name,
  });
  const [edit, setEdit] = useState(false);
  const [openFoodDialog, setOpenFoodDialog] = useState(false);
  const [newFood, setNewFood] = useState({
    name: "",
    amount: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  useEffect(() => {
    getFood();
  }, []);

  const getFood = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");
      const response = await getAllFoods(user_id, meal.diet_id, meal.id, token);
      setFood(response.allFoods);
      onUpdate();
    } catch (error) {
      window.alert(
        "Erro ao coletar as comidas presente nessa refeicao: " + meal.name
      );
    }
  };

  const updateMeal = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");
      await putMeal(user_id, meal.diet_id, newMeal.name, meal.id, token);
    } catch (error) {
      window.alert("Não foi possível atualizar esta refeição: " + meal.name);
    }

    setEdit(false);
  };

  const eraseMeal = async () => {
    if (window.confirm("Você realmente deseja deletar esta refeição?")) {
      try {
        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        await deleteMeal(user_id, meal.diet_id, meal.id, token);
        onDelete(meal.id);
      } catch (error) {
        window.alert("Não foi possível deletar esta refeição: " + meal.name);
      }
    }
  };

  const createNewFood = async (e) => {
    e.preventDefault();
    try {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");
      await postFood(
        user_id,
        meal.diet_id,
        meal.id,
        newFood.name,
        newFood.amount,
        parseFloat(newFood.protein),
        parseFloat(newFood.carbs),
        parseFloat(newFood.fat),
        token
      );
      await getFood();
      setOpenFoodDialog(false);
    } catch (error) {
      window.alert("Nao foi possivel criar essa comida: ");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFoodChange = (e) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateFoodDisplay = () => {
    getFood();
  };

  return (
    <div className={styles.container}>
      <div className={styles.mealHeader}>
        {edit ? (
          <input
            autoFocus
            type="text"
            className={styles.input}
            name="name"
            placeholder={meal.name}
            value={newMeal.name}
            onChange={handleChange}
            onBlur={updateMeal}
          ></input>
        ) : (
          <h1 onClick={() => setEdit(true)}>{newMeal.name}</h1>
        )}
        <div className={styles.mealHeaderButtons}>
          <button
            className={styles.button}
            onClick={() => setOpenFoodDialog(true)}
          >
            {" "}
            Nova comida
          </button>
          <button className={styles.cancelButton} onClick={eraseMeal}>
            {" "}
            Apagar
          </button>
        </div>
      </div>
      <div className={styles.foodSide}>
        <div className={styles.foodClass}>
          <div className={styles.foodRow}>
            <div className={styles.foodCell}>
              <h2 className={styles.foodClassH}>Quantidade</h2>
            </div>
            <div className={styles.foodCell}>
              <h2 className={styles.foodClassH}>Nome</h2>
            </div>
            <div className={styles.foodCell}>
              <h2 className={styles.foodClassH}>Proteína</h2>
            </div>
            <div className={styles.foodCell}>
              <h2 className={styles.foodClassH}>Carboidratos</h2>
            </div>
            <div className={styles.foodCell}>
              <h2 className={styles.foodClassH}>Gordura</h2>
            </div>
          </div>
        </div>
        {food.map((item) => (
          <Food
            key={item.id}
            food={item}
            dietId={meal.diet_id}
            onUpdate={handleUpdateFoodDisplay}
          ></Food>
        ))}
      </div>
      <div className={styles.mealInformationContainer}>
        <h4 className={styles.mealInformation}>
          {" "}
          Proteina: {parseFloat(meal.protein).toFixed(2)}{" "}
        </h4>
        <h4 className={styles.mealInformation}>
          {" "}
          Carboidratos: {parseFloat(meal.carbs).toFixed(2)}{" "}
        </h4>
        <h4 className={styles.mealInformation}>
          {" "}
          Gordura: {parseFloat(meal.fat).toFixed(2)}{" "}
        </h4>
        <h4 className={styles.mealInformation}>
          {" "}
          Calorias: {parseFloat(meal.calories).toFixed(2)}{" "}
        </h4>
      </div>
      {openFoodDialog && (
        <dialog open className={styles.foodDialog}>
          <form className={styles.foodForm} onSubmit={createNewFood}>
            <div className={styles.foodInputContainer}>
              <h4 className={styles.foodInputH4}>Quantidade: </h4>
              <input
                autoFocus
                type="text"
                className={styles.input}
                name="amount"
                placeholder="20g"
                value={newFood.amount}
                onChange={handleFoodChange}
              ></input>
            </div>
            <div className={styles.foodInputContainer}>
              <h4 className={styles.foodInputH4}>Nome: </h4>
              <input
                type="text"
                className={styles.input}
                name="name"
                placeholder="Queijo"
                value={newFood.name}
                onChange={handleFoodChange}
              ></input>
            </div>
            <div className={styles.foodInputContainer}>
              <h4 className={styles.foodInputH4}>Proteina: </h4>
              <input
                type="number"
                className={styles.input}
                name="protein"
                placeholder="20"
                value={newFood.protein}
                onChange={handleFoodChange}
              ></input>
              <p>g</p>
            </div>
            <div className={styles.foodInputContainer}>
              <h4 className={styles.foodInputH4}>Carboidrato: </h4>
              <input
                type="number"
                className={styles.input}
                name="carbs"
                placeholder="12"
                value={newFood.carbs}
                onChange={handleFoodChange}
              ></input>
              <p>g</p>
            </div>
            <div className={styles.foodInputContainer}>
              <h4 className={styles.foodInputH4}>Gordura: </h4>
              <input
                type="number"
                className={styles.input}
                name="fat"
                placeholder="2"
                value={newFood.fat}
                onChange={handleFoodChange}
              ></input>
              <p>g</p>
            </div>
            <button className={styles.button} type="submit">
              Salvar
            </button>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={() => setOpenFoodDialog(false)}
            >
              Cancelar
            </button>
          </form>
        </dialog>
      )}
    </div>
  );
}
