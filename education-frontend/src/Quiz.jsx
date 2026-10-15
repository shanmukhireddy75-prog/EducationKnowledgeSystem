
import { useState } from "react";

const questions = [
  {
    question: "Which language is mainly used to develop Spring Boot applications?",
    options: ["Python", "Java", "C", "HTML"],
    answer: "Java",
  },
  {
    question: "Which language is used to structure a web page?",
    options: ["HTML", "MySQL", "Java", "C++"],
    answer: "HTML",
  },
  {
    question: "Which of the following is a relational database?",
    options: ["React", "CSS", "MySQL", "JavaScript"],
    answer: "MySQL",
  },
  {
    question: "Which technology is used to build React user interfaces?",
    options: ["Components", "Tables only", "SQL queries", "JDBC only"],
    answer: "Components",
  },
  {
    question: "What does CSS control on a web page?",
    options: [
      "Database storage",
      "Visual styling",
      "Server connections",
      "Java compilation",
    ],
    answer: "Visual styling",
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function handleNext() {
    if (!selectedAnswer) return;

    const updatedScore =
      score + (selectedAnswer === questions[currentQuestion].answer ? 1 : 0);

    setScore(updatedScore);
    setSelectedAnswer("");

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion((previous) => previous + 1);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
  }

  const percentage = Math.round((score / questions.length) * 100);

  if (finished) {
    return (
      <section className="quiz-page">
        <div className="quiz-result-card">
          <div className="quiz-result-icon">
            {percentage >= 60 ? "🎉" : "📚"}
          </div>
          <p className="quiz-tag">ASSESSMENT COMPLETED</p>
          <h2>Quiz Completed!</h2>
          <p className="quiz-result-description">
            {percentage >= 60
              ? "Great work! Keep learning and improving your skills."
              : "Good effort! Review your topics and try again."}
          </p>

          <div className="quiz-score-circle">
            <strong>{percentage}%</strong>
            <span>Your Score</span>
          </div>

          <p className="quiz-score-text">
            You answered <strong>{score}</strong> out of{" "}
            <strong>{questions.length}</strong> questions correctly.
          </p>

          <button className="quiz-primary-button" onClick={restartQuiz}>
            ↻ Try Again
          </button>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className="quiz-page">
      <div className="quiz-heading">
        <span className="quiz-tag">TEST YOUR KNOWLEDGE</span>
        <h2>Knowledge Assessment</h2>
        <p>Challenge yourself and discover how much you know.</p>
      </div>

      <div className="quiz-card">
        <div className="quiz-card-top">
          <span className="quiz-question-count">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="quiz-question-badge">
            {questions.length - currentQuestion} left
          </span>
        </div>

        <div
          className="quiz-progress"
          role="progressbar"
          aria-valuenow={currentQuestion + 1}
          aria-valuemin={1}
          aria-valuemax={questions.length}
        >
          <div
            className="quiz-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h3 className="quiz-question">{question.question}</h3>
        <p className="quiz-select-hint">Choose one correct answer</p>

        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={option}
              type="button"
              className={
                selectedAnswer === option
                  ? "quiz-option selected"
                  : "quiz-option"
              }
              onClick={() => setSelectedAnswer(option)}
              aria-pressed={selectedAnswer === option}
            >
              <span className="quiz-option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
              {selectedAnswer === option && (
                <span className="quiz-selected-mark">✓</span>
              )}
            </button>
          ))}
        </div>

        <div className="quiz-card-footer">
          <span className="quiz-footer-note">
            Select an answer to continue
          </span>
          <button
            className="quiz-primary-button"
            type="button"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz ✓"
              : "Next Question →"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Quiz;
