"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chart_js_1 = require("chart.js");
function getElement(selector) {
    const el = document.querySelector(selector);
    if (!el)
        throw new Error(`Element not found: ${selector}`);
    return el;
}
function parseInput(input, field) {
    const val = parseFloat(input);
    if (isNaN(val) || val <= 0)
        throw new Error(`Invalid ${field}. Enter a positive number.`);
    return val;
}
function getBMICategory(bmi) {
    if (bmi < 18.5)
        return 'Underweight';
    if (bmi < 24.9)
        return 'Normal weight';
    if (bmi < 29.9)
        return 'Overweight';
    return 'Obese';
}
const form = getElement("#bmi-form");
const result = getElement("#result");
const resetBtn = getElement("#reset");
const progress = getElement("#progress-container");
const bar = getElement("#progress-bar");
const chartCanvas = getElement("#bmiChart");
const tips = getElement("#tips");
let bmiHistory = JSON.parse(localStorage.getItem("bmiHistory") || "[]");
const ctx = chartCanvas.getContext("2d");
const bmiChart = new chart_js_1.Chart(ctx, {
    type: "line",
    data: {
        labels: bmiHistory.map((_, i) => `Check ${i + 1}`),
        datasets: [{
                label: "BMI",
                data: bmiHistory,
                borderColor: "blue",
                backgroundColor: "lightblue",
                fill: false
            }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
});
function updateChart(bmi) {
    bmiHistory.push(bmi);
    localStorage.setItem("bmiHistory", JSON.stringify(bmiHistory));
    bmiChart.data.labels.push(`Check ${bmiHistory.length}`);
    bmiChart.data.datasets[0].data = bmiHistory;
    bmiChart.update();
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const height = parseInput(getElement("#height").value, "Height") / 100;
        const weight = parseInput(getElement("#weight").value, "Weight");
        const bmi = weight / (height * height);
        const category = getBMICategory(bmi);
        result.innerHTML = `
      <div class="bg-green-100 text-green-800 p-4 rounded-md shadow-md fade-in">
        <p>Your BMI is <strong>${bmi.toFixed(2)}</strong></p>
        <p>Category: <strong>${category}</strong></p>
        <p class="text-sm text-gray-600 mt-1">(Hover categories below for explanations)</p>
      </div>
    `;
        result.classList.remove("hidden");
        let color = "bg-green-500";
        if (bmi < 18.5)
            color = "bg-yellow-400";
        else if (bmi >= 25 && bmi < 30)
            color = "bg-yellow-500";
        else if (bmi >= 30)
            color = "bg-red-500";
        const width = Math.min((bmi / 40) * 100, 100);
        bar.className = `h-4 rounded-full transition-all ${color}`;
        bar.style.width = `${width}%`;
        progress.classList.remove("hidden");
        updateChart(bmi);
        chartCanvas.classList.remove("hidden");
        tips.classList.remove("hidden");
    }
    catch (err) {
        result.innerHTML = `<div class="bg-red-100 text-red-800 p-4 rounded-md shadow-md fade-in">${err.message}</div>`;
        result.classList.remove("hidden");
        progress.classList.add("hidden");
    }
});
resetBtn.addEventListener("click", () => {
    getElement("#height").value = "";
    getElement("#weight").value = "";
    result.classList.add("hidden");
    progress.classList.add("hidden");
});
const clearBtn = document.getElementById("clear-history");
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("bmiHistory");
    bmiHistory = [];
    bmiChart.data.labels = [];
    bmiChart.data.datasets[0].data = [];
    bmiChart.update();
    alert("BMI history cleared!");
});
