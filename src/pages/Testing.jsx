import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/testing.css";


const checkAnswer = async (id, question, userAnswer, correctAnswer) => {
  const response = await fetch("/api/generate-feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, question, userAnswer, correctAnswer }),
  });

  if (!response.ok) {
    throw new Error("Failed to check answer");
  }

  return response.json();
};

/**
 * Calculate final quiz score based on first attempts only
 * Users can retry questions, but only their first attempt counts toward the score
 * @param {Object} firstAttempts - Object mapping question index to first attempt result
 * @returns {number} - Number of correct first attempts
 */
const calculateScore = (firstAttempts) => {
  return Object.values(firstAttempts).filter(
    (attempt) => attempt.isCorrect === "correct"
  ).length;
};

function QuizTaking() {
  // Get quiz data passed from the quiz generation page
  const location = useLocation();
  const navigate = useNavigate();
  const { quizData, questions } = location.state || {};

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0); // Current question index (0-based)
  const [currentInput, setCurrentInput] = useState(""); // User's current answer text
  const [showResults, setShowResults] = useState(false); // Whether to show final results screen
  const [feedback, setFeedback] = useState(null); // Feedback text when answer is incorrect
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false); // Loading state during API call
  const [firstAttempts, setFirstAttempts] = useState({}); // Stores first attempt result for each question (for scoring)

  // Get current question data
  const question = questions[currentQuestion];
  const questionText = question?.question || "Question not found";
  const questionHint = question?.hint;

  /**
   * Updates the input field as user types their answer
   */
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  /**
   * Handles answer submission and "Try Again" button
   * This function:
   * 1. Calls the API to check if the answer is correct
   * 2. Stores the result if it's the first attempt (for scoring)
   * 3. Shows feedback if incorrect, or moves to next question if correct
   */
  const handleNext = async () => {
    if (!currentInput.trim()) return;

    setIsCheckingAnswer(true);
    setFeedback(null);

    try {
      const question = questions[currentQuestion];
      const correctAnswer = question.answer || question.correctAnswer;

      // Call the backend API to check the answer
      const result = await checkAnswer(
        question.id,
        question.question,
        currentInput,
        correctAnswer
      );

      // Store first attempt result for final scoring
      // Repeated attempts won't overwrite this, so the score stays based on first try which is goooodddd :)
      if (!firstAttempts[currentQuestion]) {
        setFirstAttempts((prev) => ({
          ...prev,
          [currentQuestion]: result,
        }));
      }

      // If incorrect then we will show feedback and keep user on same question
      if (result.isCorrect === "incorrect") {
        setFeedback(result.feedback);
        setIsCheckingAnswer(false);
        return;
      }

      // If correct: move to next question or show final results
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentInput("");
        setFeedback(null);
      } else {
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error checking answer:", error);
      setFeedback("Error checking answer. Please try again.");
    } finally {
      setIsCheckingAnswer(false);
    }
  };

  /**
   * Restarts the quiz from the beginning
   * Clears all answers, feedback, and resets to first question
   */
  const handleRestart = () => {
    setCurrentInput("");
    setCurrentQuestion(0);
    setShowResults(false);
    setFeedback(null);
    setFirstAttempts({});
  };

  // Calculate score based only on first attempts
  const score = calculateScore(firstAttempts);

  return (
    <div className="container">
      <div className="content card">
        <h2 className="title">{quizData.topic} Quiz</h2>

        {/* Quiz Taking Screen */}
        {!showResults ? (
          <>
            {/* Question Counter */}
            <h3 className="subtitle">
              Question {currentQuestion + 1} of {questions.length}
            </h3>

            {/* Question Text */}
            <p className="label">{questionText}</p>

            {/* Optional Hint */}
            {questionHint && (
              <p className="hint" style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                💡 Hint: {questionHint}
              </p>
            )}

            {/* Answer Input Field */}
            <input
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              placeholder="Type your answer here..."
              className="input"
              autoFocus
              disabled={isCheckingAnswer}
            />

            {/* Feedback Box (only shown when answer is incorrect) */}
            {feedback && (
              <div className="feedback-box feedback-incorrect">
                <p className="feedback-text">{feedback}</p>
                <p className="feedback-hint">Try again or move to the next question. Your first answer has been recorded.</p>
              </div>
            )}

            {/* Button Logic:
                 No feedback = Show "Submit Answer" button
                 Has feedback =  Show "Try Again" and "Next Question" buttons
            */}
            {!feedback ? (
              <button
                onClick={handleNext}
                className="submitButton"
                disabled={!currentInput.trim() || isCheckingAnswer}
              >
                {isCheckingAnswer ? "Checking..." : "Submit Answer"}
              </button>
            ) : (
              <div style={{ display: "flex", gap: "1rem" }}>
                {/* Try Again - Calls handleNext to re-check answer */}
                <button
                  onClick={handleNext}
                  className="submitButton"
                  disabled={!currentInput.trim() || isCheckingAnswer}
                >
                  {isCheckingAnswer ? "Checking..." : "Try Again"}
                </button>

                {/* Next Question - Skips to next question without checking which is what we want =3= */}
                <button
                  onClick={() => {
                    if (currentQuestion < questions.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                      setCurrentInput("");
                      setFeedback(null);
                    } else {
                      setShowResults(true);
                    }
                  }}
                  className="submitButton"
                  style={{ background: "linear-gradient(to right, #64748b, #475569)" }}
                >
                  {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </button>
              </div>
            )}
          </>
        ) : (
          /* Results Screen */
          <>
            <h3 className="subtitle">Results</h3>
            <p>
              You scored {score} out of {questions.length}
            </p>

            {/* Restart same quiz */}
            <button className="submitButton" onClick={handleRestart}>
              Restart Quiz
            </button>

            {/* Go back to generate new quiz */}
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




