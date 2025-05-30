// Utility function to get a typed DOM element by selector
function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Element not found: ${selector}`);
  return element;
}

// Utility function for input parsing with validation
function parseInput(input: string, fieldName: string): number {
  const value = parseFloat(input);
  if (isNaN(value) || value <= 0) {
    throw new Error(`Invalid ${fieldName}. Please enter a positive number.`);
  }
  return value;
}

// BMI Category Function (uses union type and narrowing)
function getBMICategory(bmi: number): 'Underweight' | 'Normal' | 'Overweight' | 'Obese' {
  if (bmi < 18.5) return 'Underweight';
  else if (bmi < 24.9) return 'Normal';
  else if (bmi < 29.9) return 'Overweight';
  else return 'Obese';
}

// Main DOM interactions
const form = getElement<HTMLFormElement>("#bmi-form");
const result = getElement<HTMLDivElement>("#result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const heightInput = getElement<HTMLInputElement>("#height");
    const weightInput = getElement<HTMLInputElement>("#weight");

    const height = parseInput(heightInput.value, "height (cm)") / 100;
    const weight = parseInput(weightInput.value, "weight (kg)");

    const bmi = weight / (height * height);
    const category = getBMICategory(bmi);

    result.textContent = `Your BMI is ${bmi.toFixed(2)} (${category}).`;
    result.style.color = "green";
  } catch (error) {
    result.textContent = (error as Error).message;
    result.style.color = "red";
  }
});
