import React, { useState } from "react";
import styles from "./QuizQuestion.module.css";

function QuizQuestion({ quiz, setQuiz, showQuestion, setShowQuestion }) {
  const [optionType, setOptionType] = useState("Text");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);

  const handleUpdate = () => {
    const newQuestion = {
      question: "",
      optionType: "",
      options: ["", ""],
      timer: "",
    };

    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    });
  };

  const handleChange = (e) => {
    setOptionType(e.target.value);
  };

  const handleNew = () => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question, index) =>
        index === currentIndex
          ? { ...question, options: [...question.options, ""] }
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
              <div className={styles.number}>{index + 1}</div>

              {index + 1 === quiz.questions.length && index + 1 !== 5 && (
                <div className={styles.add_btn} onClick={handleUpdate}>
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
          {quiz.questions[currentIndex].options.map((option, index) => (
            <div key={index} className={styles.quiz_part_1}>
              <div className={styles.option}>
                <input
                  type="radio"
                  className={styles.radio_btn}
                  checked={selectedOption === index + 1}
                  onChange={() => setSelectedOption(index + 1)}
                />
                <input
                  type="text"
                  placeholder={optionType==='Text & Image Url'?'Text':optionType}
                  className={`${styles.option_input} ${
                    selectedOption === index + 1 && `${styles.change_bg}`
                  }`}
                />
                {optionType==='Text & Image Url' && <input
                  type="text"
                  placeholder="Image Url"
                  className={`${styles.option_input} ${
                    selectedOption === index + 1 && `${styles.change_bg}`
                  }`}
                />}
              </div>
              {index + 1 === quiz.questions[currentIndex].options.length &&
                quiz.questions[currentIndex].options.length < 4 && (
                  <div className={styles.second_btn}>
                    <button className={styles.add_option} onClick={handleNew}>
                      Add Option
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
        <div className={styles.col_2}></div>
      </div>
      <div className={styles.button_box}>
        <button
          className={styles.cancel}
          onClick={() => setShowQuestion(!showQuestion)}
        >
          Cancel
        </button>
        <button className={styles.continue}>Create Quiz</button>
      </div>
    </div>
  );
}

export default QuizQuestion;
