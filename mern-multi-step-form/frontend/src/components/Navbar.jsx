import React, { useState } from "react"; // ✅ React + useState for menu toggle

export default function Navbar() {
  // ✅ State to control mobile menu visibility
  const [show, setShow] = useState(false);

  return (
    <nav className="navbar">
      {/* ✅ Logo section */}
      <div className="logo">Logo</div>

      {/* ✅ Navigation links */}
      <ul className={"nav-links" + (show ? " show" : "")} id="navLinks">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      {/* ✅ Hamburger / close icon for mobile menu */}
      <div
        className="menu-icon"
        id="menuIcon"
        onClick={() => setShow(!show)}
        aria-expanded={show} // ✅ accessibility: indicates menu state
        tabIndex="0" // ✅ keyboard accessibility
        onKeyDown={(e) => e.key === "Enter" && setShow(!show)} // ✅ open/close menu via Enter
      >
        <i className={show ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </nav>
  );
}
