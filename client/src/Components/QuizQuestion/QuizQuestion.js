import React, { useEffect, useState } from "react";
import styles from "./QuizQuestion.module.css";
import image1 from "../../assets/material-symbols_delete.png";
import toast from "react-hot-toast";

function QuizQuestion({
  quiz,
  setQuiz,
  setShowWrapper,
  setShowPopup,
  setShowQuestion,
  initialQuiz,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  // useEffect(() => {
  //   console.log("currentQuestionIndex is", currentQuestionIndex);
  //   console.log("selected question index is", selectedQuestion);
  // }, [currentQuestionIndex, selectedQuestion]);

  useEffect(() => {
    console.log(quiz);
  }, [quiz]);

  const addQuestion = (questionIndex) => {
    const newQuestion = {
      questionName: "",
      optionType: "Text",
      options: [
        { text: "", imageUrl: "" },
        { text: "", imageUrl: "" },
      ],
      correctOption: -1,
    };

    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    });
    setCurrentQuestionIndex(questionIndex + 1);
    setSelectedQuestion(questionIndex + 1);
  };

  const changeOptionType = (e) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question, index) =>
        index === currentQuestionIndex
          ? { ...question, optionType: e.target.value }
          : question
      ),
    });
  };

  const addOption = () => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question, index) =>
        index === currentQuestionIndex
          ? {
              ...question,
              options: [...question.options, { text: "", imageUrl: "" }],
            }
          : question
      ),
    });
  };

  const handleQuestionInput = (e) => {
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
    const { name, value } = e.target;
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question, index) =>
        index === currentQuestionIndex
          ? {
              ...question,
              options: question.options.map((option, i) =>
                i === optionIndex ? { ...option, [name]: value } : option
              ),
            }
          : question
      ),
    });
  };

  const deleteQuestion = (questionIndex) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter(
        (question, index) => index !== questionIndex
      ),
    });
    // setCurrentQuestionIndex(questionIndex-1)
    // setSelectedQuestion(questionIndex-1)
    setCurrentQuestionIndex(quiz.questions.length - 2);
    setSelectedQuestion(quiz.questions.length - 2);
  };

  const deleteOption = (optionIndex) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question, index) =>
        index === currentQuestionIndex
          ? {
              ...question,
              options: question.options.filter(
                (option, i) => i !== optionIndex
              ),
            }
          : question
      ),
    });
  };

  const validateForm = () => {
    let success = true;

    if (!quiz.timer) {
      // toast.error("You need to provide a timer");
      success = false;
    }

    if (quiz.quizType === "Q/A" || quiz.quizType === "Poll") {
      quiz.questions.forEach((question, index) => {
        if (quiz.quizType === "Q/A" && question.correctOption === -1) {
          // toast.error(
          //   `Please mark the correct option in question ${index + 1}`
          // );
          success = false;
        }

        if (!question.questionName) {
          // toast.error(
          //   `Please provide a question name in question ${index + 1}`
          // );
          success = false;
        }

        question.options.forEach((option, i) => {
          if (
            (question.optionType === "Text" && !option.text) ||
            (question.optionType === "Image Url" && !option.imageUrl) ||
            (question.optionType === "Text & Image Url" &&
              (!option.text || !option.imageUrl))
          ) {
            // toast.error(
            //   `Please fill out option ${i + 1} in question ${index + 1}`
            // );
            success = false;
          }
        });
      });
    }
    return success;
  };

  const handleCreate = () => {
    const validated = validateForm();
    console.log("validated is ",validated)
    if (!validated) {
      toast.error("All Fields are required");
      return;
    }

    setShowQuestion(false);
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
              {index + 1 > 1 && (
                <button
                  className={styles.remove_question}
                  onClick={() => deleteQuestion(index)}
                >
                  X
                </button>
              )}

              {index + 1 === quiz.questions.length && index + 1 !== 5 && (
                <div
                  className={styles.add_btn}
                  onClick={() => addQuestion(index)}
                >
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
          onChange={handleQuestionInput}
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
              checked={
                quiz.questions[currentQuestionIndex].optionType === value
              }
              onChange={changeOptionType}
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
                    checked={
                      quiz.questions[currentQuestionIndex].correctOption ===
                      index
                    }
                    onChange={() => {
                      setQuiz({
                        ...quiz,
                        questions: quiz.questions.map((question, i) =>
                          i === currentQuestionIndex
                            ? { ...question, correctOption: index }
                            : question
                        ),
                      });
                    }}
                  />
                )}
                <input
                  type="text"
                  placeholder={
                    quiz.questions[currentQuestionIndex].optionType ===
                    "Text & Image Url"
                      ? "Text"
                      : quiz.questions[currentQuestionIndex].optionType
                  }
                  name={
                    quiz.questions[currentQuestionIndex].optionType ===
                    "Text & Image Url"
                      ? "text"
                      : quiz.questions[currentQuestionIndex].optionType ===
                        "Image Url"
                      ? "imageUrl"
                      : "text"
                  }
                  value={
                    quiz.questions[currentQuestionIndex].optionType ===
                    "Text & Image Url"
                      ? quiz.questions[currentQuestionIndex].options[index].text
                      : quiz.questions[currentQuestionIndex].optionType ===
                        "Image Url"
                      ? quiz.questions[currentQuestionIndex].options[index]
                          .imageUrl
                      : quiz.questions[currentQuestionIndex].options[index].text
                  }
                  onChange={(e) => handleOptionInput(e, index)}
                  className={`${styles.option_input} ${
                    quiz.questions[currentQuestionIndex].correctOption ===
                      index && `${styles.change_bg}`
                  }`}
                />
                {quiz.questions[currentQuestionIndex].optionType ===
                  "Text & Image Url" && (
                  <input
                    type="text"
                    placeholder="Image Url"
                    name="imageUrl"
                    value={
                      quiz.questions[currentQuestionIndex].options[index]
                        .imageUrl
                    }
                    onChange={(e) => handleOptionInput(e, index)}
                    className={`${styles.option_input} ${
                      quiz.questions[currentQuestionIndex].correctOption ===
                        index &&
                      quiz.quizType !== "Poll" &&
                      `${styles.change_bg}`
                    }`}
                  />
                )}
                {index + 1 > 2 && (
                  <div className={styles.remove_btn}>
                    <img
                      src={image1}
                      className={styles.delete_btn}
                      alt="delete_btn"
                      onClick={() => deleteOption(index)}
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
            setQuiz(initialQuiz);
          }}
        >
          Cancel
        </button>
        <button className={styles.continue} onClick={handleCreate}>
          Create Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizQuestion;
