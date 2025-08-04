import { useTheme } from "../components/context/ThemeContext";

export default function ThemeToggle() {
  const { toggleTheme, state } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded border text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {state.darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
