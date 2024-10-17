function sumProtein(oldProteinValue, addedProteinValue) {
  return oldProteinValue + addedProteinValue;
}

function sumCarbs(oldCarbsValue, addedCarbsValue) {
  return oldCarbsValue + addedCarbsValue;
}

function sumFat(oldFatValue, addedFatValue) {
  return oldFatValue + addedFatValue;
}

function decreaseProtein(oldProteinValue, deletedProteinValue) {
  return oldProteinValue - deletedProteinValue;
}

function decreaseCarbs(oldCarbsValue, deletedCarbsValue) {
  return oldCarbsValue - deletedCarbsValue;
}

function decreaseFat(oldFatValue, deletedFatValue) {
  return oldFatValue - deletedFatValue;
}

function calculateCalories(protein, carbs, fat) {
  return protein * 4 + carbs * 4 + fat * 9;
}

module.exports = {
  calculateCalories,
  sumProtein,
  sumCarbs,
  sumFat,
  decreaseProtein,
  decreaseCarbs,
  decreaseFat,
};
