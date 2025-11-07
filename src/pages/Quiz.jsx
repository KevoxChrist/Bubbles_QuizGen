// src/pages/QuizGenerator.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/quiz.css";

function Quiz() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "",
    questions: "5",
    questionStyle: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateQuiz = (e) => {
    e.preventDefault();

    if (!formData.topic.trim()) {
      setError("Please select or enter a topic.");
      return;
    }

    if (formData.questions < 1 || formData.questions > 15) {
      setError("Number of questions must be between 1 and 15.");
      return;
    }

    setError("");
    setIsGenerating(true);

    // Simulated quiz data — replace with Claude API later
    setTimeout(() => {
      const sampleQuiz = [
        {
          id: 1,
          question: "What is the capital of Bangladesh?",
          options: ["Feni", "Dhaka", "Khulna", "Chattogram"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What does JSON stand for?",
          options: [
            "JavaScript Oriented Network",
            "JavaScript Object Notation",
            "Java Syntax Object Naming",
            "Java Structured Output Node",
          ],
          correctAnswer: 1,
        },
      ];

      navigate("/take-quiz", {
        state: { quizData: formData, questions: sampleQuiz },
      });

      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="container">
      <div className="content">
        <header className="header">
          <h2 className="title">Generate Your Quiz</h2>
          <p className="subtitle">
            Choose from the list or type in your own custom preferences
          </p>
        </header>

        <form onSubmit={handleGenerateQuiz} className="form card">
          {/* Topic */}
          <div className="formGroup">
            <label htmlFor="topic" className="label">
              Quiz Topic
            </label>
            <input
              list="topicList"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Type or select a topic..."
              className="input"
              required
            />
            <datalist id="topicList">
              <option value="World History" />
              <option value="American History" />
              <option value="Ancient Civilizations" />
              <option value="Mathematics" />
              <option value="Algebra" />
              <option value="Calculus" />
              <option value="Biology" />
              <option value="Chemistry" />
              <option value="Physics" />
              <option value="JavaScript" />
              <option value="Python" />
              <option value="Web Development" />
              <option value="Grammar & Writing" />
              <option value="Economics" />
              <option value="Psychology" />
            </datalist>
          </div>

          {/* Question Style */}
          <div className="formGroup">
            <label htmlFor="questionStyle" className="label">
              Question Style
            </label>
            <input
              list="questionStyleList"
              id="questionStyle"
              name="questionStyle"
              value={formData.questionStyle}
              onChange={handleChange}
              placeholder="Type or select a style..."
              className="input"
            />
            <datalist id="questionStyleList">
              <option value="Cowboy" />
              <option value="Jedi" />
              <option value="5 year old" />
              <option value="Pirate" />
              <option value="Buzz Light-Year" />
            </datalist>
          </div>

          {/* Difficulty & Number of Questions */}
          <div className="gridRow">
            <div className="formGroup">
              <label htmlFor="difficulty" className="label">
                Difficulty Level
              </label>
              <input
                list="difficultyList"
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                placeholder="Type or select difficulty..."
                className="input"
              />
              <datalist id="difficultyList">
                <option value="Beginner" />
                <option value="Intermediate" />
                <option value="Advanced" />
              </datalist>
            </div>

            <div className="formGroup">
              <label htmlFor="questions" className="label">
                Number of Questions
              </label>
              <input
                type="number"
                id="questions"
                name="questions"
                value={formData.questions}
                onChange={handleChange}
                min="1"
                max="15"
                className="input"
                required
              />
              <p className="hint">Between 1 and 15 questions</p>
            </div>
          </div>

          {/* Error */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="submitButton"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Quiz ✨"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Quiz;
