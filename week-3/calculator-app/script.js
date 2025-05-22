// ========== SELECTORS ==========
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const sciToggleBtn = document.getElementById("toggle-scientific");
const sciButtons = document.getElementById("scientific-buttons");
const themeToggleBtn = document.getElementById("toggle-theme");
const clickSound = document.getElementById("click-sound");

// ========== GLOBAL STATE ==========
let expression = "";
let isScientific = false;

// ========== FUNCTIONS ==========

// Play sound
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Update display
function updateDisplay(value) {
  display.value = value;
}

// Evaluate expression
function calculate() {
  try {
    let result = eval(expression);
    updateDisplay(result);
    expression = result.toString(); // allow chaining
  } catch (err) {
    updateDisplay("Error");
    expression = "";
  }
}

// Clear all
function clear() {
  expression = "";
  updateDisplay("");
}

// Handle button input
function handleInput(input) {
  playClickSound();

  if (input === "=") {
    calculate();
  } else if (input === "C") {
    clear();
  } else {
    expression += input;
    updateDisplay(expression);
  }
}

// Handle scientific input
function handleScientific(fn) {
  playClickSound();

  try {
    let result;
    let x = parseFloat(display.value || "0");

    switch (fn) {
      case "sin": result = Math.sin(toRadians(x)); break;
      case "cos": result = Math.cos(toRadians(x)); break;
      case "tan": result = Math.tan(toRadians(x)); break;
      case "√": result = Math.sqrt(x); break;
      case "^": expression += "**"; return; // exponentiation operator
      case "log": result = Math.log10(x); break;
      case "π": expression += Math.PI.toString(); updateDisplay(expression); return;
      case "e": expression += Math.E.toString(); updateDisplay(expression); return;
      default: return;
    }

    updateDisplay(result);
    expression = result.toString();
  } catch {
    updateDisplay("Error");
    expression = "";
  }
}

// Degrees to radians
function toRadians(deg) {
  return deg * (Math.PI / 180);
}

// Toggle dark mode
themeToggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Toggle scientific calculator mode
sciToggleBtn.addEventListener("click", () => {
  isScientific = !isScientific;
  sciButtons.classList.toggle("hidden");
});

// ========== EVENT LISTENERS ==========

// Basic buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.textContent;
    if (btn.classList.contains("operator") || btn.classList.contains("equals")) {
      handleInput(val);
    } else {
      handleInput(val);
    }
  });
});

// Scientific buttons
document.querySelectorAll(".sci-fn").forEach((btn) => {
  btn.addEventListener("click", () => {
    handleScientific(btn.textContent);
  });
});

// Keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ("0123456789+-*/.".includes(key)) {
    expression += key;
    updateDisplay(expression);
    playClickSound();
  }

  if (key === "Enter") {
    calculate();
    playClickSound();
  }

  if (key === "Backspace") {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
    playClickSound();
  }

  if (key === "Escape") {
    clear();
    playClickSound();
  }
});
