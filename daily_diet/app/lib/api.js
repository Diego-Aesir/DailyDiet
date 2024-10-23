const API_URL = "http://localhost:8000";

export const getAllDiets = async (user_id, token) => {
  const response = await fetch(`${API_URL}/diets/${user_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch diets");
  }

  return await response.json();
};

export const postDiets = async (user_id, diet_name, diet_description, token) => {
  const response = await fetch(`${API_URL}/diets/${user_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: diet_name,
      description: diet_description,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to post this diet");
  }

  return await response.json();
};

export const putDiets = async (
  user_id,
  diet_id,
  diet_name,
  diet_description,
  token
) => {
  const response = await fetch(`${API_URL}/diets/${user_id}/${diet_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: diet_name,
      description: diet_description,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to put this diet");
  }

  return await response.json();
};

export const deleteDiets = async (user_id, diet_id, token) => {
  const response = await fetch(`${API_URL}/diets/${user_id}/${diet_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete this diet");
  }

  return await response.json();
};

export const getAllMeals = async (user_id, diet_id, token) => {
  const response = await fetch(`${API_URL}/diets/${user_id}/${diet_id}/meals`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get all meals");
  }

  return await response.json();
};

export const postMeal = async (user_id, diet_id, meal_name, token) => {
  const response = await fetch(`${API_URL}/diets/${user_id}/${diet_id}/meals`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: meal_name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to post this meal");
  }

  return await response.json();
};

export const putMeal = async (user_id, diet_id, name, meal_id, token) => {
  const response = await fetch(`${API_URL}/diets/${user_id}/${diet_id}/meals`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      meals_id: meal_id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to put this meal");
  }

  return await response.json();
};

export const deleteMeal = async (user_id, diet_id, meal_id, token) => {
  const response = await fetch(`${API_URL}/diets/${user_id}/${diet_id}/meals`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meals_id: meal_id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete this meal");
  }

  return await response.json();
};

export const getAllFood = async (user_id, diet_id, meal_id, token) => {
  const response = await fetch(`${API_URL}/diets/${user_id}/${diet_id}/meals/food`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meals_id: meal_id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get all foods");
  }

  return await response.json();
};

export const postFood = async (
  user_id,
  diet_id,
  meal_id,
  food_name,
  food_amount,
  food_protein,
  food_carbs,
  food_fat,
  token
) => {
  const response = await fetch(`${API_URL}/diets/${user_id}/${diet_id}/meals/food`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: food_name,
      amount: food_amount,
      protein: food_protein,
      carbs: food_carbs,
      fat: food_fat,
      meals_id: meal_id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to post this food");
  }

  return await response.json();
};

export const putFood = async (
  user_id,
  diet_id,
  food_Id,
  food_name,
  food_amount,
  food_protein,
  food_carbs,
  food_fat,
  token
) => {
  const response = await fetch(`${API_URL}/diets/${user_id}/${diet_id}/meals/food`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      food_id: food_Id,
      name: food_name,
      amount: food_amount,
      protein: food_protein,
      carbs: food_carbs,
      fat: food_fat,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to put this food");
  }

  return await response.json();
};

export const deleteFood = async (user_id, diet_id, food_Id, token) => {
  const response = await fetch(`${API_URL}/diets/${user_id}/${diet_id}/meals/food`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      food_id: food_Id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete this food");
  }

  return await response.json();
};

export const postRegister = async (
  user_username,
  user_password,
  user_weight,
  user_height,
  user_age
) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user_username,
      password: user_password,
      weight: user_weight,
      height: user_height,
      age: user_age,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to register this user");
  }

  return await response.json();
};

export const postLogin = async (user_username, user_password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user_username,
      password: user_password,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to login this user");
  }

  return await response.json();
};

export const getUserInfo = async (user_id, token) => {
  const response = await fetch(`${API_URL}/user/${user_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get User info");
  }

  return await response.json();
};

export const putUserName = async (user_id, user_newUsername, token) => {
  const response = await fetch(`${API_URL}/user/${user_id}/username`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newUsername: user_newUsername,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update Username");
  }

  return await response.json();
};

export const putUserPassword = async (user_id, user_newPassword, token) => {
  const response = await fetch(`${API_URL}/user/${user_id}/password`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newPassword: user_newPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update Password");
  }

  return await response.json();
};

export const putUserWeight = async (user_id, user_newWeight, token) => {
  const response = await fetch(`${API_URL}/user/${user_id}/weight`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newWeight: user_newWeight,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update Weight");
  }

  return await response.json();
};

export const putUserHeight = async (user_id, user_newHeight, token) => {
  const response = await fetch(`${API_URL}/user/${user_id}/height`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newHeight: user_newHeight,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update Height");
  }

  return await response.json();
};

export const putUserAge = async (user_id, user_newAge, token) => {
  const response = await fetch(`${API_URL}/user/${user_id}/age`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newAge: user_newAge,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update Age");
  }

  return await response.json();
};

export const deleteUser = async (user_id, token) => {
  const response = await fetch(`${API_URL}/user/${user_id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete User");
  }

  return await response.json();
};