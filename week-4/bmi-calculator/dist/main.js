"use strict";
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element)
        throw new Error(`Element not found: ${selector}`);
    return element;
}
function parseInput(input, fieldName) {
    const value = parseFloat(input);
    if (isNaN(value) || value <= 0) {
        throw new Error(`Invalid ${fieldName}. Please enter a positive number.`);
    }
    return value;
}
function getBMICategory(bmi) {
    if (bmi < 18.5)
        return 'Underweight';
    else if (bmi < 24.9)
        return 'Normal';
    else if (bmi < 29.9)
        return 'Overweight';
    else
        return 'Obese';
}
const form = getElement("#bmi-form");
const result = getElement("#result");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const heightInput = getElement("#height");
        const weightInput = getElement("#weight");
        const height = parseInput(heightInput.value, "height (cm)") / 100;
        const weight = parseInput(weightInput.value, "weight (kg)");
        const bmi = weight / (height * height);
        const category = getBMICategory(bmi);
        result.textContent = `Your BMI is ${bmi.toFixed(2)} (${category}).`;
        result.style.color = "green";

    catch (error) {
        result.textContent = error.message;
        result.style.color = "red";
    }
});
