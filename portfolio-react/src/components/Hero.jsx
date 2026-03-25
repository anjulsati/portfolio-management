function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="badge-pill">🚀 MERN & Java Full Stack Developer</div>

          <h1>
            Engineering <span className="gradient-text">Scalable</span>
            <br />
            MERN & Java Solutions.
          </h1>

          <p className="description">
            Hi, I’m <strong>Anjul Sati</strong>. A Computer Science student and
            Full Stack Developer specializing in the{" "}
            <strong>MERN Stack</strong> and{" "}
            <strong>Java Spring Boot</strong>.
          </p>

          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Hire Me
            </a>
          </div>
        </div>
      </div>

      <div className="glow-bg"></div>
    </section>
  );
}

export default Hero;


