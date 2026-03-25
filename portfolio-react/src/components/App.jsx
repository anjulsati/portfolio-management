import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import "./styles/portfolio.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />

      <section id="services" className="section"></section>
      <section id="projects" className="section"></section>
      <section id="contact" className="section"></section>
    </>
  );
}

export default App;
