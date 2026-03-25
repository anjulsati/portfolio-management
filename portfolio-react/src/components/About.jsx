function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-heading">
          About <span className="accent">Me</span>
        </h2>

        <div className="bento-grid">
          {/* Developer */}
          <div className="bento-item bio-box">
            <h3>The Developer</h3>
            <p>
              I am pursuing my <strong>B.Tech in Computer Science</strong>.
              I build scalable full-stack applications using the
              <strong> MERN Stack</strong> and <strong> Java Spring Boot</strong>,
              focusing on clean architecture and secure APIs.
            </p>
          </div>

          {/* Skills */}
          <div className="bento-item skills-box">
            <h3>Tech Stack</h3>
            <div className="tags">
              <span>MongoDB</span>
              <span>Express.js</span>
              <span>React.js</span>
              <span>Node.js</span>
              <span>Java</span>
              <span>Spring Boot</span>
              <span>MySQL</span>
              <span>Docker</span>
              <span>AWS</span>
              <span>Git & GitHub</span>
            </div>
          </div>

          {/* Education */}
          <div className="bento-item edu-box">
            <h3>Education</h3>
            <div className="edu-item">
              <strong>B.Tech Computer Science</strong>
              <span>2024 – 2028</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
