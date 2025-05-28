const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const themeToggle = document.getElementById('themeToggle');

let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '=') {
      try {
        expression = eval(expression).toString();
      } catch {
        expression = 'Error';
      }
    } else {
      expression += value;
    }

    display.value = expression;
  });
});

clearBtn.addEventListener('click', () => {
  expression = '';
  display.value = '';
});

themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});
