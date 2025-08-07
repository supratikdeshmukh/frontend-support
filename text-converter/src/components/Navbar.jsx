import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <header className="header">
      <div className="container header-inner">
        <div
          className="logo"
          onClick={scrollToTop}
          aria-label="TextConverter Home"
        >
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <span className="logo-text">TextConverter</span>
        </div>
        <div className="theme-toggle-wrapper">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
