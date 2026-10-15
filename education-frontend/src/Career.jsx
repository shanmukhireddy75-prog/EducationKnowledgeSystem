
import { useState } from "react";

const careerSections = [
  {
    title: "Resume Preparation",
    icon: "📄",
    description: "Build a resume that highlights your skills and projects.",
    tasks: [
      "Prepare a one-page resume",
      "Add technical skills and projects",
      "Include GitHub and LinkedIn links",
      "Check spelling and formatting",
    ],
  },
  {
    title: "Technical Interview",
    icon: "💻",
    description: "Strengthen your programming and computer science basics.",
    tasks: [
      "Practice Java or Python programs",
      "Revise data structures and algorithms",
      "Study DBMS and SQL",
      "Review OOP concepts",
    ],
  },
  {
    title: "Communication Skills",
    icon: "🎤",
    description: "Prepare to explain your knowledge with confidence.",
    tasks: [
      "Practice a self-introduction",
      "Explain one project clearly",
      "Practice common HR questions",
      "Improve speaking and listening",
    ],
  },
  {
    title: "Project Portfolio",
    icon: "🚀",
    description: "Show practical skills through projects and documentation.",
    tasks: [
      "Complete one practical project",
      "Upload code to GitHub",
      "Write a project README",
      "Prepare a project demonstration",
    ],
  },
];

const interviewQuestions = [
  {
    question: "Tell me about yourself.",
    tip: "Introduce your education, technical skills, projects, and career interests.",
  },
  {
    question: "Explain one project you developed.",
    tip: "Describe the problem, technologies used, your contribution, and the result.",
  },
  {
    question: "What is the difference between a class and an object?",
    tip: "A class defines properties and behavior. An object is an instance of that class.",
  },
  {
    question: "What is a database?",
    tip: "A database is an organized collection of data that can be stored, accessed, and managed.",
  },
  {
    question: "Why should we select you?",
    tip: "Explain your relevant skills, willingness to learn, teamwork, and practical experience.",
  },
];

function Career() {
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("educationCareerTasks") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [showAnswers, setShowAnswers] = useState(false);

  function toggleTask(task) {
    setCompletedTasks((previous) => {
      const updated = previous.includes(task)
        ? previous.filter((item) => item !== task)
        : [...previous, task];

      try {
        localStorage.setItem(
          "educationCareerTasks",
          JSON.stringify(updated)
        );
      } catch {
        // Progress remains available for the current session.
      }

      return updated;
    });
  }

  const totalTasks = careerSections.reduce(
    (total, section) => total + section.tasks.length,
    0
  );

  const percentage = Math.round(
    (completedTasks.length / totalTasks) * 100
  );

  return (
    <section className="career-page">
      <div className="career-hero">
        <span className="career-tag">YOUR FUTURE STARTS HERE</span>
        <h2>Career Preparation</h2>
        <p>
          Develop your skills, prepare for interviews, and take small
          steps toward your career goals.
        </p>

        <div className="career-progress-info">
          <div>
            <strong>{percentage}%</strong>
            <span>Career readiness checklist</span>
          </div>
          <span>
            {completedTasks.length} of {totalTasks} tasks completed
          </span>
        </div>

        <div
          className="career-progress-track"
          role="progressbar"
          aria-label="Career preparation progress"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="career-progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="career-section-heading">
        <div>
          <h3>Build Your Career Skills</h3>
          <p>Complete these activities at your own pace.</p>
        </div>
      </div>

      <div className="career-grid">
        {careerSections.map((section) => (
          <article className="career-card" key={section.title}>
            <div className="career-card-icon">{section.icon}</div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>

            <div className="career-task-list">
              {section.tasks.map((task) => (
                <label className="career-task" key={task}>
                  <input
                    type="checkbox"
                    checked={completedTasks.includes(task)}
                    onChange={() => toggleTask(task)}
                  />
                  <span>{task}</span>
                </label>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="career-interview-card">
        <div className="career-section-heading">
          <div>
            <h3>Practice Interview Questions</h3>
            <p>Review these common fresher interview questions.</p>
          </div>

          <button
            className="career-answer-button"
            type="button"
            onClick={() => setShowAnswers((previous) => !previous)}
          >
            {showAnswers ? "Hide Tips" : "Show Tips"}
          </button>
        </div>

        <div className="career-question-list">
          {interviewQuestions.map((item, index) => (
            <article className="career-question" key={item.question}>
              <h4>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.question}
              </h4>

              {showAnswers && <p>{item.tip}</p>}
            </article>
          ))}
        </div>
      </div>

      {percentage === 100 && (
        <div className="career-complete-message" role="status">
          🎉 Great progress! You have completed your career preparation
          checklist. Keep practising and building projects.
        </div>
      )}

      <button
        className="career-reset-button"
        type="button"
        onClick={() => {
          if (window.confirm("Reset all career checklist progress?")) {
            setCompletedTasks([]);
            localStorage.removeItem("educationCareerTasks");
          }
        }}
      >
        Reset Checklist
      </button>
    </section>
  );
}

export default Career;
