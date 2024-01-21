import React, { useEffect, useState } from "react";
import styles from "./QuizQuestion.module.css";
import image1 from "../../assets/material-symbols_delete.png";

function QuizQuestion({ quiz, setQuiz, setShowWrapper, setShowPopup }) {
  const [optionType, setOptionType] = useState("Text");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(-1);

  useEffect(() => {
    console.log("currentQuestionIndex is", currentQuestionIndex);
    console.log("quiz is", quiz);
  }, [currentQuestionIndex, quiz]);

  const addQuestion = () => {
    const newQuestion = {
      questionName: "",
      optionType: "",
      options: ["", ""],
    };

    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    });
  };

  const handleChange = (e) => {
    setOptionType(e.target.value);
  };

  const addOption = () => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question, index) =>
        index === currentQuestionIndex
          ? { ...question, options: [...question.options, ""] }
          : question
      ),
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question, index) =>
        index === currentQuestionIndex
          ? { ...question, [name]: value }
          : question
      ),
    });
  };

  const handleOptionInput = (e, optionIndex) => {
    console.log(e.target.value);
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question, index) =>
        index === currentQuestionIndex
          ? {
              ...question,
              options: question.options.map((option, i) =>
                i === optionIndex ? e.target.value : option
              ),
            }
          : question
      ),
    });
  };

  return (
    <div className={styles.quiz_form}>
      <div className={styles.row_1}>
        <div className={styles.question}>
          {quiz.questions.map((question, index) => (
            <div key={index} className={styles.question_list}>
              <div
                className={`${styles.number} ${
                  index === selectedQuestion && `${styles.selected_question}`
                }`}
                onClick={() => {
                  setSelectedQuestion(index);
                  setCurrentQuestionIndex(index);
                }}
              >
                {index + 1}
              </div>
              {index+1>1 && (<button className={styles.remove_question}>X</button>)}


              {index + 1 === quiz.questions.length && index + 1 !== 5 && (
                <div className={styles.add_btn} onClick={addQuestion}>
                  +
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.criteria}>Max 5 questions</div>
      </div>
      <div className={styles.row_2}>
        <input
          type="text"
          className={styles.input_field}
          placeholder="Poll Question"
          name="questionName"
          value={quiz.questions[currentQuestionIndex].questionName}
          onChange={handleInput}
        />
      </div>
      <div className={styles.row_3}>
        <div>Option Type</div>
        {["Text", "Image Url", "Text & Image Url"].map((value, index) => (
          <div key={index} className={styles.option_type}>
            <input
              type="radio"
              className={styles.radio_btn}
              value={value}
              checked={optionType === value}
              onChange={handleChange}
            />
            <div>{value}</div>
          </div>
        ))}
      </div>
      <div className={styles.options_container}>
        <div className={styles.col_1}>
          {quiz.questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index} className={styles.quiz_part_1}>
              <div className={styles.option}>
                {quiz.quizType !== "Poll" && (
                  <input
                    type="radio"
                    className={styles.radio_btn}
                    checked={selectedOption === index + 1}
                    onChange={() => setSelectedOption(index + 1)}
                  />
                )}
                <input
                  type="text"
                  placeholder={
                    optionType === "Text & Image Url" ? "Text" : optionType
                  }
                  value={quiz.questions[currentQuestionIndex].options[index]}
                  onChange={(e) => handleOptionInput(e, index)}
                  className={`${styles.option_input} ${
                    selectedOption === index + 1 && `${styles.change_bg}`
                  }`}
                />
                {optionType === "Text & Image Url" && (
                  <input
                    type="text"
                    placeholder="Image Url"
                    className={`${styles.option_input} ${
                      selectedOption === index + 1 && `${styles.change_bg}`
                    }`}
                  />
                )}
                {index + 1 > 2 && (
                  <div className={styles.remove_btn}>
                    <img
                      src={image1}
                      className={styles.delete_btn}
                      alt="delete_btn"
                    />
                  </div>
                )}
              </div>
              {index + 1 ===
                quiz.questions[currentQuestionIndex].options.length &&
                quiz.questions[currentQuestionIndex].options.length < 4 && (
                  <div className={styles.second_btn}>
                    <button className={styles.add_option} onClick={addOption}>
                      Add Option
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
        {quiz.quizType === "Q/A" && (
          <div className={styles.col_2}>
            <div className={styles.timer}>Timer</div>
            {["OFF", "5 sec", "10 sec"].map((time, index) => (
              <div
                key={index}
                className={`${styles.timer_duration} ${
                  quiz.timer === time && `${styles.add_bg}`
                }`}
                onClick={() => {
                  setQuiz({ ...quiz, timer: time });
                }}
              >
                {time}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.button_box}>
        <button
          className={styles.cancel}
          onClick={() => {
            setShowWrapper(false);
            setShowPopup(false);
          }}
        >
          Cancel
        </button>
        <button className={styles.continue}>Create Quiz</button>
      </div>
    </div>
  );
}

export default QuizQuestion;
