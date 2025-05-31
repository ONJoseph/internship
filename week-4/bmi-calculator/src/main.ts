import { Chart } from "chart.js";

// Helper function to get an element and assert type, or throw error if not found
function getElement<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
}

// Validate and parse input as a positive number
function parseInput(input: string, field: string): number {
  const val = parseFloat(input);
  if (isNaN(val) || val <= 0) throw new Error(`Invalid ${field}. Enter a positive number.`);
  return val;
}

// Determine BMI category based on BMI value
function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

const form = getElement<HTMLFormElement>("#bmi-form");
const result = getElement<HTMLDivElement>("#result");
const resetBtn = getElement<HTMLButtonElement>("#reset");
const progress = getElement<HTMLDivElement>("#progress-container");
const bar = getElement<HTMLDivElement>("#progress-bar");
const chartCanvas = getElement<HTMLCanvasElement>("#bmiChart");
const tips = getElement<HTMLDivElement>("#tips");
const clearBtn = getElement<HTMLButtonElement>("#clear-history");

let bmiHistory: number[] = JSON.parse(localStorage.getItem("bmiHistory") || "[]");

const ctx = chartCanvas.getContext("2d")!;
const bmiChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: bmiHistory.map((_, i) => `Check ${i + 1}`),
    datasets: [
      {
        label: "BMI",
        data: bmiHistory,
        borderColor: "blue",
        backgroundColor: "lightblue",
        fill: false,
        tension: 0.2,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
      },
    },
  },
});

function updateChart(bmi: number) {
  bmiHistory.push(bmi);
  localStorage.setItem("bmiHistory", JSON.stringify(bmiHistory));
  bmiChart.data.labels!.push(`Check ${bmiHistory.length}`);
  bmiChart.data.datasets[0].data = bmiHistory;
  bmiChart.update();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const heightInput = getElement<HTMLInputElement>("#height").value.trim();
    const weightInput = getElement<HTMLInputElement>("#weight").value.trim();

    const heightCm = parseInput(heightInput, "height");
    const weightKg = parseInput(weightInput, "weight");

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiRounded = parseFloat(bmi.toFixed(2));
    const category = getBMICategory(bmiRounded);

    result.textContent = `Your BMI is ${bmiRounded} (${category}).`;
    result.classList.remove("hidden");

    progress.classList.remove("hidden");
    tips.classList.remove("hidden");

    // Update progress bar width and color based on BMI category
    const maxBMI = 50;
    const progressPercent = Math.min((bmiRounded / maxBMI) * 100, 100);
    bar.style.width = `${progressPercent}%`;

    // Color coding
    if (bmiRounded < 18.5) bar.style.backgroundColor = "#3b82f6"; // Blue
    else if (bmiRounded < 25) bar.style.backgroundColor = "#10b981"; // Green
    else if (bmiRounded < 30) bar.style.backgroundColor = "#f59e0b"; // Amber
    else bar.style.backgroundColor = "#ef4444"; // Red

    updateChart(bmiRounded);
  } catch (err) {
    alert((err as Error).message);
  }
});

resetBtn.addEventListener("click", () => {
  form.reset();
  result.classList.add("hidden");
  progress.classList.add("hidden");
  tips.classList.add("hidden");
  bar.style.width = "0%";
});

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear BMI history?")) {
    bmiHistory = [];
    localStorage.removeItem("bmiHistory");
    bmiChart.data.labels = [];
    bmiChart.data.datasets[0].data = [];
    bmiChart.update();
  }
});
