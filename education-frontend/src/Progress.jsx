
import { useEffect, useState } from "react";

const lessons = [
  "HTML and CSS Basics",
  "JavaScript Fundamentals",
  "Java Programming",
  "Database Management",
  "React Fundamentals",
];

const projects = [
  "Student Management System",
  "Library Management System",
  "Online Learning Platform",
];

function loadProgress(key) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function Progress() {
  const [completedLessons, setCompletedLessons] = useState(() =>
    loadProgress("educationCompletedLessons")
  );

  const [completedProjects, setCompletedProjects] = useState(() =>
    loadProgress("educationCompletedProjects")
  );

  useEffect(() => {
    localStorage.setItem(
      "educationCompletedLessons",
      JSON.stringify(completedLessons)
    );
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem(
      "educationCompletedProjects",
      JSON.stringify(completedProjects)
    );
  }, [completedProjects]);

  const totalTasks = lessons.length + projects.length;
  const completedTasks =
    completedLessons.length + completedProjects.length;

  const progressPercentage = Math.round(
    (completedTasks / totalTasks) * 100
  );

  function toggleItem(item, list, setList) {
    if (list.includes(item)) {
      setList(list.filter((task) => task !== item));
    } else {
      setList([...list, item]);
    }
  }

  function resetProgress() {
    if (window.confirm("Are you sure you want to reset all your progress?")) {
      setCompletedLessons([]);
      setCompletedProjects([]);
    }
  }

  return (
    <section className="progress-section">
      <div className="progress-heading">
        <span className="progress-tag">YOUR LEARNING JOURNEY</span>
        <h2>My Learning Progress</h2>
        <p>
          Every lesson completed is a step towards your goals. Keep going!
        </p>
      </div>

      <div className="progress-overview">
        <div className="progress-overview-top">
          <div>
            <span className="progress-small-label">OVERALL COMPLETION</span>
            <h3>{progressPercentage}%</h3>
            <p>
              {completedTasks} of {totalTasks} activities completed
            </p>
          </div>
          <div className="progress-trophy">🏆</div>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="Overall learning progress"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p className="progress-encouragement">
          {progressPercentage === 100
            ? "Amazing! You completed every activity."
            : progressPercentage >= 50
            ? "Great progress! Keep up the momentum."
            : "Keep learning. Small steps make a big difference."}
        </p>
      </div>

      <div className="progress-stats">
        <div className="progress-stat-card">
          <div className="progress-stat-icon">📖</div>
          <div>
            <span>Lessons Completed</span>
            <h3>
              {completedLessons.length} / {lessons.length}
            </h3>
          </div>
        </div>

        <div className="progress-stat-card">
          <div className="progress-stat-icon">💻</div>
          <div>
            <span>Projects Completed</span>
            <h3>
              {completedProjects.length} / {projects.length}
            </h3>
          </div>
        </div>
      </div>

      <div className="progress-columns">
        <div className="progress-card">
          <div className="progress-card-heading">
            <div className="progress-card-icon">📚</div>
            <div>
              <h3>Learning Lessons</h3>
              <p>Build your foundation</p>
            </div>
          </div>

          <div className="progress-list">
            {lessons.map((lesson) => (
              <label
                className={
                  completedLessons.includes(lesson)
                    ? "progress-item completed"
                    : "progress-item"
                }
                key={lesson}
              >
                <input
                  type="checkbox"
                  checked={completedLessons.includes(lesson)}
                  onChange={() =>
                    toggleItem(lesson, completedLessons, setCompletedLessons)
                  }
                />
                <span>{lesson}</span>
              </label>
            ))}
          </div>

          <p className="progress-list-footer">
            {completedLessons.length} of {lessons.length} lessons completed
          </p>
        </div>

        <div className="progress-card">
          <div className="progress-card-heading">
            <div className="progress-card-icon">🚀</div>
            <div>
              <h3>Practical Projects</h3>
              <p>Apply what you've learned</p>
            </div>
          </div>

          <div className="progress-list">
            {projects.map((project) => (
              <label
                className={
                  completedProjects.includes(project)
                    ? "progress-item completed"
                    : "progress-item"
                }
                key={project}
              >
                <input
                  type="checkbox"
                  checked={completedProjects.includes(project)}
                  onChange={() =>
                    toggleItem(
                      project,
                      completedProjects,
                      setCompletedProjects
                    )
                  }
                />
                <span>{project}</span>
              </label>
            ))}
          </div>

          <p className="progress-list-footer">
            {completedProjects.length} of {projects.length} projects completed
          </p>
        </div>
      </div>

      {progressPercentage === 100 && (
        <div className="progress-message">
          🎉 Congratulations! You've completed all the activities listed here.
        </div>
      )}

      <button
        className="progress-reset-button"
        type="button"
        onClick={resetProgress}
      >
        Reset All Progress
      </button>
    </section>
  );
}

export default Progress;
