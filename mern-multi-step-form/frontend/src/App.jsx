import React from "react"; // ✅ React import (JSX support)
import Navbar from "./components/Navbar"; // ✅ Navbar component
import MultiStepForm from "./components/MultiStepForm"; // ✅ Main multi-step form
import Footer from "./components/Footer"; // ✅ Footer component

export default function App() {
  return (
    <>
      {/* ✅ Navbar at the top */}
      <Navbar />

      {/* ✅ Main content area */}
      <main>
        <div className="form-container">
          {/* ✅ Multi-step form component */}
          <MultiStepForm />
        </div>
      </main>

      {/* ✅ Footer at the bottom */}
      <Footer />
    </>
  );
}
