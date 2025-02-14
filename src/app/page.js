"use client";
import React, { useState, useEffect, useId } from "react";
// import questionsData from "./questions.json";
// import questionsData from "./characterQuestions.json";
import questionsData from "./entQuestions.json";
const logo = "../logo.svg";

const QuizApp = () => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [percent, setPercent] = useState(null);
  const [allFailed, setAllFailed] = useState([]);
  const [course, setCourse] = useState("Enterpreneurship and Innovation");
  const [courseCode, setCourseCode] = useState("ENT 211");
  useEffect(() => {
    if (quizStarted && timer >= 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      // console.log("Time left: " +timer)
      if (timer < 1) {
        submitQuiz();
      }
      return () => clearInterval(interval);
    }

    //ADD A FUNCTION TO REMIND USER THAT 5  MINS LEFT
  }, [quizStarted, timer]);

  const startQuiz = () => {
    setAllFailed([]);

    window.scrollTo({ top: 0, behavior: "smooth" });
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
    setAllFailed([]);
    window.scrollTo({ top: 0, behavior: "smooth" });

    let correctAnswers = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correct) {
        correctAnswers++;
      } else {
        setAllFailed(allFailed.concat(q))
      }
    });
    const calculatedScore = correctAnswers;
    const calculatedPercent = (correctAnswers / questions.length) * 100;
    setScore(calculatedScore);
    setPercent(calculatedPercent.toFixed(2));
    setQuizStarted(false);
  };

  const retryQuiz = () => {
    setAllFailed([])
    setQuizStarted(false);
    setNumQuestions(30);

    setTimeLimit(10);
    setScore(null);
    setPercent(null);
  };

  const [loading, setLoading] = useState(true);
  let waitTime = Math.round(Math.random() * 3) + 2;

  useEffect(() => {
    console.log(waitTime);
    setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, waitTime * 1000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="LoaderOverlay scale-105 z-[80] fixed top-0 left-0 w-full h-full bg-[#191919] p-4 flex items-center justify-center">
          <img
            src={logo}
            alt="Quiza"
            className="w-[80%] max-w-[250px] logo text-2xl duration-200 animate-pulse  font-bold"
          />

          {/* {loading.toString()} */}
        </div>
      ) : (
        <></>
      )}

      <div className="p-5  min-h-screen flex flex-col max-w-2xl mx-auto text-center">
        {score !== null && (
          <>
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
              className="mt-4 w-max bg-[#f9f9f9] text-[#191919] px-6 py-3 rounded-xl hover:brightness-105 hover:shadow-xl hover:shadow-[#99999920] duration-150"
              onClick={retryQuiz}
            >
              Hide result
            </button>
          </div>


            {/* {allFailed.map(x => (
              <>
                <div key={useId()}>
                jdjdj
                </div></>
          ))} */}
          </>
        )}

        {!quizStarted ? (
          <div className="SETTINGS  h-full w-full my-auto flex flex-col items-center gap-4  ">
            <h1 className="text-2xl font-bold">Quiz settings</h1>
            <div className="mt-4 grid gap-2  w-full text-left max-w-[300px] ">
              <label className="block  text-[#999999]">Course Title</label>
              <div
                disabled
                className="bg-[#99999920] p-4 rounded-xl cursor-not-allowed  duration-150 px-4 w-full"
                value={course}
              >
                {course}
              </div>
            </div>
            <div className="mt-4 grid gap-2  w-full text-left max-w-[300px] ">
              <label className="block  text-[#999999]">
                Number of Questions:
              </label>
              <select
                className="bg-[#99999920] p-4 rounded-xl cursor-pointer hover:bg-[#99999940] duration-150 px-4 w-full"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
              >
                {/* MAPPING NUMBER OF QUESTIONS */}
                {/* [ 10, 20, 30, 60, 85] */}
                {/* [10, 20, 30, 55] */}
                {[10, 30, 60, 100, 130].map((num) => (
                  <option
                    className="text-white bg-[#0e0e0e]"
                    key={num}
                    value={num}
                  >
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
                {/* Add 0.2s for 12s */}
                {[10, 20, 30, 60, 90].map((time) => (
                  <option
                    className="text-white bg-[#0e0e0e]"
                    key={time}
                    value={time}
                  >
                    {time} minutes
                  </option>
                ))}
              </select>
            </div>
            <button
              className="mt-4 bg-blue-500 hover:brightness-105 active:bg-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-[#99999920] duration-150 mb-8"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className="Header z-[20] w-full flex flex-col items-start bg-[#191919] shadow-2xl shadow-[#191919] py-4 md:scale-105 sticky top-0">
              <img
                src={logo}
                alt="Quiza"
                className="w-[120px] mt-4 logo text-2xl duration-200  font-bold"
              />

              <div className="my-4  w-full text-sm text-[#999999] text-start">
                Time Left: {Math.floor(timer / 60)}:{timer % 60}
              </div>
              <div className="METER-BAR w-full bg-[#99999930] h-max p-1 rounded-full">
                <div
                  className="meter bg-green-500 duration-1000 w-full h-2 rounded"
                  style={{ width: `${(timer / (timeLimit * 60)) * 100}%` }}
                ></div>
              </div>
              <h1 className=" text-left text-2xl duration-200 my-4   font-bold">
                <span className="text-green-500 text-xs font-normal bg-[#64dd6428] p-1.5 px-3 rounded-full whitespace-nowrap">
                  {courseCode}
                </span>{" "}
                {course}
              </h1>
            </div>

            {questions.map((q, index) => (
              <div
                key={q.id}
                className="questionCard stickytop-0 bgwhite bg-[#99999915]  p-2 backdrop-blur-sm   border-spacing-9  rounded-xl  my-4  "
              >
                <p className="font-bold p-4  text-left">
                  {index + 1}. {q.question}
                </p>
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className="option hover:bg-[#99999910] duration-150 py-2 rounded-lg cursor-pointer px-4 items-center flex gap-2 text-left"
                  >
                    <input
                      type="radio"
                      hidden={true}
                      className="invisible hidden opacity-0"
                      name={q.id}
                      value={opt}
                      checked={userAnswers[q.id] === opt}
                      onChange={() => handleAnswer(q.id, opt)}
                    />{" "}
                    <div className="radio flex items-center justify-center min-h-2 min-w-2 shrink-0 w-4 h-4 border-2 border-gray-300 rounded">
                      <div className="ticked radio-check grow-0 w-2 h-2 min-w-2 min-h-2 bg-green-500 rounded-sm shrink-0"></div>
                    </div>
                    {opt}
                  </label>
                ))}
              </div>
            ))}

            <button
              className="mt-4 my-8 bg-green-500 active:bg-green-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-[#99999920] duration-150 hover:brightness-105"
              onClick={submitQuiz}
            >
              Submit Quiz
            </button>
          </div>
        )}
        <p className="text-sm text-[#999999]">
          &copy; 2025. Crafted by David Austin
        </p>
      </div>

      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
      </style>
    </>
  );
};

export default QuizApp;
