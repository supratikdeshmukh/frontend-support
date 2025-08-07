import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.body;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      title={`Switch to ${dark ? "light" : "dark"} mode`}
      className="theme-toggle-btn"
    >
      <i className={`fas ${dark ? "fa-moon" : "fa-sun"}`}></i>
    </button>
  );
}
