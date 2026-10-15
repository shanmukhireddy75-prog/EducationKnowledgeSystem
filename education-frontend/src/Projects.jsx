
import { useState } from "react";

const projectList = [
  {
    title: "Student Management System",
    subject: "Java",
    level: "Beginner",
    description:
      "Create an application to store student details, marks, and attendance.",
    skills: "Java, OOP, MySQL",
    icon: "🎓",
  },
  {
    title: "Online Learning Platform",
    subject: "Web Development",
    level: "Intermediate",
    description:
      "Build a website where students can access learning materials and quizzes.",
    skills: "HTML, CSS, JavaScript, React",
    icon: "💻",
  },
  {
    title: "Student Performance Prediction",
    subject: "Machine Learning",
    level: "Advanced",
    description:
      "Analyze student academic data and predict performance using machine learning.",
    skills: "Python, Pandas, Machine Learning",
    icon: "🤖",
  },
  {
    title: "Library Management System",
    subject: "Database",
    level: "Beginner",
    description:
      "Develop a system to manage books, student records, and book borrowing.",
    skills: "Java, MySQL, JDBC",
    icon: "📚",
  },
];

function Projects() {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const filteredProjects = projectList.filter((project) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      project.title.toLowerCase().includes(searchText) ||
      project.description.toLowerCase().includes(searchText) ||
      project.skills.toLowerCase().includes(searchText);

    const matchesSubject =
      selectedSubject === "All" || project.subject === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  return (
    <section className="projects-section">
      <div className="projects-heading">
        <span className="projects-tag">LEARN BY BUILDING</span>
        <h2>Practical Projects</h2>
        <p>
          Turn your knowledge into practical skills by building real-world
          projects.
        </p>
      </div>

      <div className="projects-toolbar">
        <div className="projects-search">
          <span>⌕</span>
          <input
            type="search"
            aria-label="Search projects"
            placeholder="Search by project, description or skill..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          aria-label="Filter projects by subject"
          value={selectedSubject}
          onChange={(event) => setSelectedSubject(event.target.value)}
        >
          <option value="All">All Subjects</option>
          <option value="Java">Java</option>
          <option value="Web Development">Web Development</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Database">Database</option>
        </select>
      </div>

      <div className="projects-results">
        Showing {filteredProjects.length}{" "}
        {filteredProjects.length === 1 ? "project" : "projects"}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-card-top">
              <div className="project-icon">{project.icon}</div>
              <span
                className={`project-level ${project.level.toLowerCase()}`}
              >
                {project.level}
              </span>
            </div>

            <span className="project-subject">{project.subject}</span>

            <h3>{project.title}</h3>
            <p className="project-description">{project.description}</p>

            <div className="project-skills">
              <span className="project-skills-label">TECHNOLOGIES</span>
              <p>{project.skills}</p>
            </div>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="projects-empty">
          <span>🔎</span>
          <h3>No projects found</h3>
          <p>Try a different search term or choose another subject.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedSubject("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}

export default Projects;
