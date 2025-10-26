// src/pages/QuizTaking.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/testing.css";

function QuizTaking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizData, questions } = location.state || {};

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!questions) {
    return (
      <div className="container">
        <h2>No quiz data found 😕</h2>
        <button className="submitButton" onClick={() => navigate("/quiz")}>
          Go Back
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const handleSelect = (index) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: index,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const score = Object.keys(selectedAnswers).reduce((acc, key) => {
    const qIndex = parseInt(key);
    if (questions[qIndex].correctAnswer === selectedAnswers[qIndex]) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="container">
      <div className="content card">
        <h2 className="title">{quizData.topic} Quiz</h2>

        {!showResults ? (
          <>
            <h3 className="subtitle">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="label">{question.question}</p>

            <div className="optionsList">
              {question.options.map((opt, index) => (
                <button
                  key={index}
                  className={`optionButton ${
                    selectedAnswers[currentQuestion] === index
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSelect(index)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button onClick={handleNext} className="submitButton">
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
            </button>
          </>
        ) : (
          <>
            <h3 className="subtitle">Results</h3>
            <p>
              You scored {score} out of {questions.length}
            </p>
            <button className="submitButton" onClick={handleRestart}>
              Restart Quiz
            </button>
            <button
              className="submitButton"
              onClick={() => navigate("/quiz")}
              style={{ marginTop: "1rem" }}
            >
              Generate Another Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizTaking;




