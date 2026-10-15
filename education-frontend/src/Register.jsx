import { useState } from "react";
import api from "./api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "CSE",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setIsSuccess(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsSuccess(false);
    setIsLoading(true);

    try {
      const response = await api.post("/students/register", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        branch: formData.branch,
      });

      setMessage(response.data.message || "Registration successful!");
      setIsSuccess(true);

      setFormData({
        name: "",
        email: "",
        password: "",
        branch: "CSE",
      });
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage("This email is already registered. Please use another email.");
      } else if (error.response?.status === 400) {
        setMessage("Please check your details. Enter a valid email and a password of at least 8 characters.");
      } else if (!error.response) {
        setMessage("Cannot connect to the backend. Please check that it is running on port 8080.");
      } else {
        setMessage(
          error.response.data?.detail ||
          error.response.data?.message ||
          "Registration failed. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="register-section">
      <h2>Student Registration</h2>
      <p>Create your student account to begin your learning journey.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="register-name">Full Name</label>
        <input
          id="register-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          autoComplete="name"
          maxLength={100}
          required
        />

        <label htmlFor="register-email">Email Address</label>
        <input
          id="register-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          autoComplete="email"
          maxLength={254}
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          minLength={8}
          maxLength={72}
          autoComplete="new-password"
          required
        />

        <label htmlFor="register-branch">Branch</label>
        <select
          id="register-branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        >
          <option value="CSE">Computer Science (CSE)</option>
          <option value="IT">Information Technology (IT)</option>
          <option value="ECE">Electronics (ECE)</option>
          <option value="EEE">Electrical (EEE)</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        {message && (
          <p
            className="register-message"
            role="status"
            style={{
              color: isSuccess ? "#16803d" : "#c0392b",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

export default Register;