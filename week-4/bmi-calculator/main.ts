const themeToggleBtn = document.getElementById("themeToggle") as HTMLButtonElement | null;
const bmiForm = document.getElementById("bmiForm") as HTMLFormElement | null;
const bmiResultEl = document.getElementById("result") as HTMLDivElement | null;
const successMsgEl = document.getElementById("success-msg") as HTMLDivElement | null;
const historyEl = document.getElementById("history") as HTMLUListElement | null;

let bmiHistory: string[] = JSON.parse(localStorage.getItem("bmiHistory") || "[]");

themeToggleBtn?.addEventListener("click", () => {
  const d = document.documentElement;
  d.classList.toggle("dark");
  localStorage.theme = d.classList.contains("dark") ? "dark" : "light";
});

if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
}

const lastBmi = localStorage.getItem("bmiLast");
if (lastBmi && bmiResultEl) {
  bmiResultEl.textContent = lastBmi;
  bmiResultEl.classList.add("opacity-100", "text-green-500");
}

bmiHistory.forEach(msg => {
  const li = document.createElement("li");
  li.textContent = msg;
  historyEl?.appendChild(li);
});

bmiForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const h = parseFloat((bmiForm.elements.namedItem("height") as HTMLInputElement).value);
  const w = parseFloat((bmiForm.elements.namedItem("weight") as HTMLInputElement).value);

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
  historyEl?.appendChild(li);
});

bmiForm?.addEventListener("reset", () => {
  if (bmiResultEl && successMsgEl) {
    bmiResultEl.textContent = "";
    bmiResultEl.classList.add("opacity-0");
    successMsgEl.classList.add("hidden");
  }
  localStorage.removeItem("bmiLast");
});

function showResult(msg: string, colorClass: string) {
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
    setTimeout(() => successMsgEl.classList.add("hidden"), 2500);
  }
}
