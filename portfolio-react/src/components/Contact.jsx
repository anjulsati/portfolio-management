import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("https://formspree.io/f/mpqozkqj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ email: "", message: "" });
        setTimeout(() => setStatus(""), 5000); // Clear message after 5 seconds
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="cta-banner hidden">
          <h2>Let's build something <span className="gradient-text">great</span></h2>
          <p>Open to internships, freelance work, and collaborations.</p>

          <form onSubmit={handleSubmit} className="contact-form">
            <label>
              Your email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>
            <label>
              Your message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
              ></textarea>
            </label>

            {status === "success" && (
              <div className="form-message success">
                <i className="fas fa-check-circle"></i> Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="form-message error">
                <i className="fas fa-exclamation-circle"></i> Something went wrong. Please try again.
              </div>
            )}

            <button type="submit" className="btn btn-primary big-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
