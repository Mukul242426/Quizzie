import React from "react";
import styles from "./QuizQuestion.module.css";

function QuizQuestion({ quiz, setQuiz }) {
  const handleUpdate = () => {
    const newQuestion = {
      question: "",
      optionType: "",
      options: [{ option1: "" }, { option2: "" }],
      timer: "",
    };

    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    });
  };

  return (
    <div className={styles.quiz_form}>
      <div className={styles.row_1}>
        <div className={styles.question}>
          {quiz.questions.map((question, index) => (
            <div key={index} className={styles.question_list}>
              <div className={styles.number}>{index+1}</div>

              {(index+1)===quiz.questions.length && (index+1)!==5 && (<div className={styles.add_btn} onClick={handleUpdate}>
               +
              </div>)}
            </div>
          ))}
        </div>

        <div className={styles.criteria}>Max 5 questions</div>
      </div>
      <div className={styles.row_2}></div>
      <div className={styles.row_3}></div>
      <div className={styles.options_container}>
        <div className={styles.col_1}></div>
        <div className={styles.col_2}></div>
      </div>
      <div className={styles.button_box}></div>
    </div>
  );
}

export default QuizQuestion;
