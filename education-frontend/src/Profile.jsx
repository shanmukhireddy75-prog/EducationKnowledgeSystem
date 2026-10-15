
import { useEffect, useState } from "react";

const defaultProfile = {
  name: "",
  email: "",
  college: "",
  branch: "CSE",
  year: "3rd Year",
  goal: "",
};

function Profile() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("educationStudentProfile");
      return saved
        ? { ...defaultProfile, ...JSON.parse(saved) }
        : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      localStorage.setItem(
        "educationStudentProfile",
        JSON.stringify(profile)
      );
      setMessage("Profile saved successfully!");
    } catch {
      setMessage("Unable to save profile in this browser.");
    }
  }

  return (
    <section className="profile-section">
      <div className="profile-heading">
        <span className="profile-tag">STUDENT ACCOUNT</span>
        <h2>My Profile</h2>
        <p>
          Manage your personal details, learning information, and
          future career goals.
        </p>
      </div>

      <div className="profile-layout">
        <div className="profile-summary">
          <div className="profile-avatar">
            {profile.name.trim()
              ? profile.name.trim().charAt(0).toUpperCase()
              : "S"}
          </div>

          <h3>{profile.name.trim() || "Student Name"}</h3>
          <p>{profile.email || "Your email address"}</p>

          <div className="profile-summary-divider" />

          <div className="profile-summary-detail">
            <span>College</span>
            <strong>{profile.college || "Not added yet"}</strong>
          </div>

          <div className="profile-summary-detail">
            <span>Branch</span>
            <strong>{profile.branch}</strong>
          </div>

          <div className="profile-summary-detail">
            <span>Year of Study</span>
            <strong>{profile.year}</strong>
          </div>

          <div className="profile-goal">
            <span>My Learning Goal</span>
            <p>{profile.goal || "Add your learning goal below."}</p>
          </div>
        </div>

        <form className="profile-form-card" onSubmit={handleSubmit}>
          <div className="profile-form-heading">
            <h3>Personal Information</h3>
            <p>Update your details using the form below.</p>
          </div>

          <div className="profile-form-grid">
            <div className="profile-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="college">College Name</label>
              <input
                id="college"
                name="college"
                value={profile.college}
                onChange={handleChange}
                placeholder="Enter your college name"
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="branch">Branch</label>
              <select
                id="branch"
                name="branch"
                value={profile.branch}
                onChange={handleChange}
              >
                <option value="CSE">Computer Science (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="ECE">Electronics (ECE)</option>
                <option value="EEE">Electrical (EEE)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="profile-field profile-field-full">
              <label htmlFor="year">Year of Study</label>
              <select
                id="year"
                name="year"
                value={profile.year}
                onChange={handleChange}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div className="profile-field profile-field-full">
              <label htmlFor="goal">Learning or Career Goal</label>
              <textarea
                id="goal"
                name="goal"
                value={profile.goal}
                onChange={handleChange}
                placeholder="Example: Improve Java and web development skills"
                rows={4}
              />
            </div>
          </div>

          <div className="profile-form-footer">
            <p className="profile-status" role="status">
              {message}
            </p>
            <button className="profile-save-button" type="submit">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
