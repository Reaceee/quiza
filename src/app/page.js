"use client";
import React, { useState, useEffect } from "react";
import questionsData from "./questions.json";
import logo from "../logo.svg";

const QuizApp = () => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [percent, setPercent] = useState(null);

  useEffect(() => {
    if (quizStarted && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [quizStarted, timer]);

  const startQuiz = () => {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, numQuestions));
    setUserAnswers({});
    setQuizStarted(true);
    setTimer(timeLimit * 60);
    setScore(null);
    setPercent(null);
  };

  const handleAnswer = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const submitQuiz = () => {
    let correctAnswers = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correct) correctAnswers++;
    });
    const calculatedScore = correctAnswers;
    const calculatedPercent = (correctAnswers / questions.length) * 100;
    setScore(calculatedScore);
    setPercent(calculatedPercent.toFixed(2));
    setQuizStarted(false);
  };

  const retryQuiz = () => {
    setQuizStarted(false);
    setNumQuestions(30);
    setTimeLimit(10);
    setScore(null);
    setPercent(null);
  };

  return (
    <>
      <div className="p-5  min-h-screen flex flex-col max-w-2xl mx-auto text-center">
        {score !== null && (
          <div className="mt-4 text-center items-center py-20 flex flex-col gap-2">
            <h2 className=" font-bold text-3xl pb-4">Your result</h2>
            <p>
              Score: {score} / {questions.length}
            </p>
            <p>Percentage: {Math.round(percent)}%</p>

            <p className="text-lg text-[#999999] py-4">
              {" "}
              {percent < 1
                ? "Did you even try?!"
                : percent >= 100
                ? "Go ace that exam!"
                : percent > 70
                ? "Little more practice to perfection "
                : percent > 50
                ? "You just might be ready "
                : "You definitely can do better"}
            </p>

            <button
              className="mt-4 w-max bg-gray-900 text-white px-6 py-3 rounded-xl hover:brightness-105 hover:shadow-xl duration-150"
              onClick={retryQuiz}
            >
              Hide result
            </button>
          </div>
        )}

        {!quizStarted ? (
          <div className="SETTINGS  h-full w-full my-auto flex flex-col items-center gap-4  ">
            <h1 className="text-2xl font-bold">Quiz settings</h1>
            <div className="mt-4 grid gap-2  w-full text-left max-w-[300px] ">
              <label className="block  text-[#999999]">
                Number of Questions:
              </label>
              <select
                className="bg-[#99999920] p-4 rounded-xl cursor-pointer hover:bg-[#99999940] duration-150 px-4 w-full"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
              >
                {[10, 20, 30, 60, 85].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 grid gap-2  w-full text-left max-w-[300px] ">
              <label className="block  text-[#999999]">Time Limit:</label>
              <select
                className="bg-[#99999920] p-4 rounded-xl cursor-pointer hover:bg-[#99999940] duration-150 px-4 w-full"
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
              >
                {[10, 20, 30, 40].map((time) => (
                  <option key={time} value={time}>
                    {time} minutes
                  </option>
                ))}
              </select>
            </div>
            <button
              className="mt-4 bg-blue-500 hover:brightness-105 active:bg-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-xl duration-150 mb-8"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className="Header w-full flex flex-col items-start bg-[#f9f9f9] sticky top-0">
              <h1 className="text-2xl  font-bold">Quiza</h1>
           
              <div className="my-3 w-full text-sm text-[#999999] text-start">
                Time Left: {Math.floor(timer / 60)}:{timer % 60}
              </div>
              <div className="w-full bg-gray-300 h-2 rounded">
                <div
                  className="bg-green-500 w-full h-2 rounded"
                  style={{ width: `${(timer / (timeLimit * 60)) * 100}%` }}
                ></div>
              </div>
            </div>

            {questions.map((q, index) => (
              <div
                key={q.id}
                className="my-4 bg-white p-4 border-gray-500 rounded"
              >
                <p className="font-bold py-4  text-left">
                  {index + 1}. {q.question}
                </p>
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className="py-2 items-center max-w-[400px] flex gap-2 text-left"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={userAnswers[q.id] === opt}
                      onChange={() => handleAnswer(q.id, opt)}
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
            ))}

            <button
              className="mt-4 my-8 bg-green-500 active:bg-green-600 text-white px-6 py-3 rounded-xl hover:shadow-xl duration-150 hover:brightness-105"
              onClick={submitQuiz}
            >
              Submit Quiz
            </button>
            </div>
            


          )}
          <p className="text-sm text-[#999999]">&copy; 2025. Crafted by David Austin</p>
      </div>

      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
      </style>
    </>
  );
};

export default QuizApp;
