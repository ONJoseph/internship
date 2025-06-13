"use strict";
const themeToggleBtn = document.getElementById("themeToggle");
const bmiForm = document.getElementById("bmiForm");
const bmiResultEl = document.getElementById("result");
const successMsgEl = document.getElementById("success-msg");
const historyEl = document.getElementById("history");
let bmiHistory = JSON.parse(localStorage.getItem("bmiHistory") || "[]");
// Apply saved theme on load
if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
    if (themeToggleBtn)
        themeToggleBtn.textContent = "☀️";
}
themeToggleBtn === null || themeToggleBtn === void 0 ? void 0 : themeToggleBtn.addEventListener("click", () => {
    const htmlEl = document.documentElement;
    const isDark = htmlEl.classList.toggle("dark");
    localStorage.theme = isDark ? "dark" : "light";
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
});
// Load last BMI result
const lastBmi = localStorage.getItem("bmiLast");
if (lastBmi && bmiResultEl) {
    bmiResultEl.textContent = lastBmi;
    bmiResultEl.classList.add("opacity-100", "text-green-500");
}
// Load history
bmiHistory.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = msg;
    historyEl === null || historyEl === void 0 ? void 0 : historyEl.appendChild(li);
});
bmiForm === null || bmiForm === void 0 ? void 0 : bmiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const h = parseFloat(bmiForm.elements.namedItem("height").value);
    const w = parseFloat(bmiForm.elements.namedItem("weight").value);
    if (!h || !w || h <= 0 || w <= 0) {
        showResult("Enter valid height & weight", "text-red-500");
        return;
    }
    const bmi = w / (h * h);
    const status = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
    const msg = `Your BMI is ${bmi.toFixed(2)} (${status})`;
    showResult(msg, "text-green-600");
    showSuccess();
    localStorage.setItem("bmiLast", msg);
    bmiHistory.push(msg);
    localStorage.setItem("bmiHistory", JSON.stringify(bmiHistory));
    const li = document.createElement("li");
    li.textContent = msg;
    historyEl === null || historyEl === void 0 ? void 0 : historyEl.appendChild(li);
});
bmiForm === null || bmiForm === void 0 ? void 0 : bmiForm.addEventListener("reset", () => {
    if (bmiResultEl && successMsgEl) {
        bmiResultEl.textContent = "";
        bmiResultEl.classList.add("opacity-0");
        successMsgEl.classList.add("hidden");
    }
    localStorage.removeItem("bmiLast");
});
function showResult(msg, colorClass) {
    if (bmiResultEl) {
        bmiResultEl.textContent = msg;
        bmiResultEl.className = `mt-6 text-lg font-semibold text-center ${colorClass} opacity-0 animate__animated animate__fadeIn`;
        bmiResultEl.classList.remove("opacity-0");
    }
}
function showSuccess() {
    if (successMsgEl) {
        successMsgEl.textContent = "BMI Calculated!";
        successMsgEl.className = "mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded animate__animated animate__fadeIn";
        successMsgEl.classList.remove("hidden");
        setTimeout(() => successMsgEl === null || successMsgEl === void 0 ? void 0 : successMsgEl.classList.add("hidden"), 2500);
    }
}
