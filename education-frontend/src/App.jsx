
import { useState } from "react";
import "./App.css";

import Resources from "./Resources";
import AddResource from "./AddResource";
import Quiz from "./Quiz";
import Projects from "./Projects";
import Progress from "./Progress";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";
import Career from "./Career";

const navigation = [
  { name: "Home", icon: "🏠" },
  { name: "Student Registration", icon: "📝" },
  { name: "Student Login", icon: "🔐" },
  { name: "Student Profile", icon: "👤" },
  { name: "Learning Resources", icon: "📚" },
  { name: "Add Resource", icon: "➕" },
  { name: "Quizzes", icon: "🧠" },
  { name: "Projects", icon: "💻" },
  { name: "Progress Tracking", icon: "📊" },
  { name: "Career Preparation", icon: "🚀" },
];

function readArrayFromStorage(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [progressVersion, setProgressVersion] = useState(0);

  const [student, setStudent] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("educationLoggedInStudent")) || null
      );
    } catch {
      return null;
    }
  });

  const completedLessons = readArrayFromStorage(
    "educationCompletedLessons"
  );
  const completedProjects = readArrayFromStorage(
    "educationCompletedProjects"
  );

  const totalLessons = 5;
  const totalProjects = 5;

  const lessonProgress = Math.min(
    100,
    Math.round((completedLessons.length / totalLessons) * 100)
  );

  const projectProgress = Math.min(
    100,
    Math.round((completedProjects.length / totalProjects) * 100)
  );

  function openPage(page) {
    if (page === "Home") {
      setProgressVersion((version) => version + 1);
    }

    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLogin(studentData) {
    setStudent(studentData);
    localStorage.setItem(
      "educationLoggedInStudent",
      JSON.stringify(studentData)
    );
    openPage("Home");
  }

  function handleLogout() {
    setStudent(null);
    localStorage.removeItem("educationLoggedInStudent");
    openPage("Student Login");
  }

  function renderPage() {
    switch (activePage) {
      case "Student Registration":
        return <Register />;

      case "Student Login":
        return (
          <Login
            onLogin={handleLogin}
            onRegister={() => openPage("Student Registration")}
          />
        );

      case "Student Profile":
        return <Profile />;

      case "Learning Resources":
        return <Resources />;

      case "Add Resource":
        return <AddResource />;

      case "Quizzes":
        return <Quiz />;

      case "Projects":
        return <Projects />;

      case "Progress Tracking":
        return <Progress />;

      case "Career Preparation":
        return <Career />;

      default:
        return (
          <div className="dashboard">
            <section className="dashboard-welcome">
              <span className="dashboard-tag">YOUR LEARNING SPACE</span>

              <h2>
                {student
                  ? `Welcome, ${student.name}! ✨`
                  : "Learn Today, Lead Tomorrow! ✨"}
              </h2>

              <p>
                Build practical skills, test your knowledge, work on
                projects, and prepare for your future career.
              </p>

              <button
                className="dashboard-primary-button"
                onClick={() => openPage("Learning Resources")}
              >
                Explore Learning Resources
              </button>

              {!student && (
                <button
                  className="dashboard-secondary-button"
                  onClick={() => openPage("Student Login")}
                >
                  Student Login
                </button>
              )}
            </section>

            <section className="dashboard-stats">
              <div className="dashboard-stat-card">
                <span>📚</span>
                <h3>
                  {completedLessons.length}/{totalLessons}
                </h3>
                <p>Lessons Completed</p>

                <div className="dashboard-progress-track">
                  <div
                    className="dashboard-progress-fill"
                    style={{ width: `${lessonProgress}%` }}
                  />
                </div>
                <small>{lessonProgress}% complete</small>
              </div>

              <div className="dashboard-stat-card">
                <span>💻</span>
                <h3>
                  {completedProjects.length}/{totalProjects}
                </h3>
                <p>Projects Completed</p>

                <div className="dashboard-progress-track">
                  <div
                    className="dashboard-progress-fill"
                    style={{ width: `${projectProgress}%` }}
                  />
                </div>
                <small>{projectProgress}% complete</small>
              </div>

              <div className="dashboard-stat-card">
                <span>🎯</span>
                <h3>{lessonProgress}%</h3>
                <p>Learning Progress</p>

                <div className="dashboard-progress-track">
                  <div
                    className="dashboard-progress-fill"
                    style={{ width: `${lessonProgress}%` }}
                  />
                </div>
                <small>Keep learning!</small>
              </div>
            </section>

            <section className="dashboard-section">
              <div className="dashboard-section-heading">
                <h3>Explore Your Learning Journey</h3>
                <p>Everything you need to learn and grow in one place.</p>
              </div>

              <div className="dashboard-grid">
                <button
                  className="dashboard-card"
                  onClick={() => openPage("Learning Resources")}
                >
                  <span className="dashboard-card-icon">📚</span>
                  <h3>Learning Resources</h3>
                  <p>Explore useful study materials and learning links.</p>
                  <span className="dashboard-card-link">
                    Start learning →
                  </span>
                </button>

                <button
                  className="dashboard-card"
                  onClick={() => openPage("Quizzes")}
                >
                  <span className="dashboard-card-icon">🧠</span>
                  <h3>Quizzes & Assessments</h3>
                  <p>Test your understanding with knowledge quizzes.</p>
                  <span className="dashboard-card-link">Take a quiz →</span>
                </button>

                <button
                  className="dashboard-card"
                  onClick={() => openPage("Projects")}
                >
                  <span className="dashboard-card-icon">💻</span>
                  <h3>Practical Projects</h3>
                  <p>Discover projects that help develop practical skills.</p>
                  <span className="dashboard-card-link">
                    Explore projects →
                  </span>
                </button>

                <button
                  className="dashboard-card"
                  onClick={() => openPage("Progress Tracking")}
                >
                  <span className="dashboard-card-icon">📊</span>
                  <h3>Progress Tracking</h3>
                  <p>Track completed lessons and project activities.</p>
                  <span className="dashboard-card-link">
                    View progress →
                  </span>
                </button>

                <button
                  className="dashboard-card"
                  onClick={() => openPage("Career Preparation")}
                >
                  <span className="dashboard-card-icon">🚀</span>
                  <h3>Career Preparation</h3>
                  <p>Practise interview questions and prepare for jobs.</p>
                  <span className="dashboard-card-link">
                    Prepare for your career →
                  </span>
                </button>

                <button
                  className="dashboard-card"
                  onClick={() => openPage("Student Profile")}
                >
                  <span className="dashboard-card-icon">👤</span>
                  <h3>Student Profile</h3>
                  <p>Manage your student details and learning goals.</p>
                  <span className="dashboard-card-link">View profile →</span>
                </button>
              </div>
            </section>

            <section className="dashboard-bottom-banner">
              <div>
                <h3>Small steps lead to big achievements! 🌟</h3>
                <p>
                  Keep learning, practise regularly, and build your skills
                  one day at a time.
                </p>
              </div>

              <button
                className="dashboard-secondary-button"
                onClick={() => openPage("Progress Tracking")}
              >
                Check My Progress
              </button>
            </section>
          </div>
        );
    }
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">EK</div>
          <div>
            <h1>EduKnowledge</h1>
            <p>Learn • Practise • Grow</p>
          </div>
        </div>

        <div className="sidebar-menu-heading">MAIN MENU</div>

        <nav className="sidebar-navigation">
          {navigation.map((item) => (
            <button
              key={item.name}
              type="button"
              className={`sidebar-link ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => openPage(item.name)}
              aria-current={
                activePage === item.name ? "page" : undefined
              }
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span>🎓</span>
          <p>Keep learning. Keep growing.</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>{activePage}</h2>
            <p>Education and Knowledge System</p>
          </div>

          {student ? (
            <div className="topbar-profile">
              <span className="topbar-avatar">👤</span>
              <span>{student.name}</span>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="topbar-profile"
              onClick={() => openPage("Student Login")}
            >
              <span className="topbar-avatar">👤</span>
              <span>Student Login</span>
            </button>
          )}
        </header>

        <div className="page-content" key={`${activePage}-${progressVersion}`}>
          {renderPage()}
        </div>

        <footer className="app-footer">
          Education and Knowledge System © {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}

export default App;
