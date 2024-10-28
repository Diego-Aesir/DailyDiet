"use client";

import { useState } from "react";
import { putFood, deleteFood } from "@/app/lib/api";

import styles from "@/app/styles/food.module.css";

export default function Food({ food, dietId, onUpdate }) {
  const [newFood, setNewFood] = useState(food);
  const [editField, setEditField] = useState(null);

  const changeFoodItem = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    try {
      await putFood(
        user_id,
        dietId,
        newFood.meals_id,
        newFood.id,
        newFood.name,
        newFood.amount,
        parseFloat(newFood.protein),
        parseFloat(newFood.carbs),
        parseFloat(newFood.fat),
        token
      );
      onUpdate();
    } catch (error) {
      window.alert("Não foi possível modificar esse item: " + food.name);
    }
    setEditField(null);
  };

  const eraseFoodItem = async () => {
    const confirmDelete = window.confirm(`Você tem certeza que deseja deletar ${food.name}?`);
    if (confirmDelete) {
      try {
        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        await deleteFood(
          user_id,
          dietId,
          newFood.meals_id,
          newFood.id,
          token
        );
      } catch (error) {
        window.alert("Não foi possível deletar esse item: " + food.name);
      }
      onUpdate();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleBlur = async () => {
    await changeFoodItem();
  };

  return (
    <div className={styles.foodContainer}>
      <div className={styles.foodInformation}>
        <div className={styles.foodDisplay}>
          <div className={styles.foodRow}>
            {['amount', 'name', 'protein', 'carbs', 'fat'].map((field) => (
              <div className={styles.foodCell} key={field}>
                {editField === field ? (
                  <input
                    type="text"
                    name={field}
                    value={newFood[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.foodInput}
                    autoFocus
                  />
                ) : (
                  <h2 className={styles.foodText} onClick={() => handleEdit(field)}>
                    {newFood[field]}
                  </h2>
                )}
              </div>
            ))}
            <div className={styles.foodCell}>
              <button onClick={eraseFoodItem} className={styles.deleteButton}>Deletar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
