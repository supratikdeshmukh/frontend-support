import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ConverterForm from "./components/ConverterForm";
import StatsPanel from "./components/StatsPanel";
import Container from "./ui/Container";

export default function App() {
  const [text, setText] = useState(() => localStorage.getItem("text") || "");

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  return (
    <div className="layout-grid">
      <Navbar />
      <main>
        <Container>
          <ConverterForm text={text} setText={setText} />
          <StatsPanel text={text} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
