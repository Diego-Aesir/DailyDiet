const API_URL = 'http://localhost:8000/';

export const getAllDiets = async (user_id, token) => {
    const response = await fetch(`${API_URL}/${user_id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if(!response.ok) {
        throw new Error('Failed to fetch diets');
    }

    return await response.json();
}

export const postDiet = async (user_id, token) => {
    const response = await fetch(`${API_URL}/${user_id}`, {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
    });

    if(!response.ok) {
        throw new Error('Failed to post this diet');
    }
}

export const putDiet = async (user_id, diet_id, diet_name, diet_description, token) => {}

export const deleteDiet = async(user_id, diet_id, token) => {}

export const getAllMeals = async (user_id, diet_id, token) => {}

export const postMeal = async (user_id, diet_id, meal_name, token) => {}

export const putMeal = async (user_id, diet_id, name, meal_id, token) => {}

export const deleteMeal = async (user_id, diet_id, meal_id, token) => {}

export const getAllFood = async (user_id, diet_id, meal_id, token) => {}

export const postFood = async (user_id, diet_id, meal_id, name, amount, protein, carbs, fat, token) => {}

export const putFood = async (user_id, diet_id, food_id, name, amount, protein, carbs, fat, token) => {}

export const deleteFood = async (user_id, diet_id, food_id, token) => {}

export const postRegister = async (username, password, weight, height, age) => {}

export const postLogin = async (username, password) => {}

export const getUserInfo = async (user_id) => {}

export const putUserName = async (user_id, newUsername, token) => {}

export const putUserPassword = async (user_id, newPassword, token) => {}

export const putUserWeight = async (user_id, newWeight, token) => {}

export const putUserHeight = async (user_id, newHeight, token) => {}

export const putUserAge = async (user_id, newAge, token) => {}

export const deleteUser = async (user_id, token) => {}