function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-flex">
        <a href="#" className="logo">
          &lt;Anjul<span className="accent">/</span>&gt;
        </a>

        <ul className="nav-links">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact" className="btn-cta">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
