import React, { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FRONTEND_URL } from "../../utils/utils";
import Completed from "../Completed/Completed";

function Quiz() {
  const { id } = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timer, setTimer] = useState(null);
  const [initialTime,setInitialTime]=useState(null)

  useEffect(() => {
    fetchData();
    updateImpressions();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${FRONTEND_URL}/quizzes/${id}`);

      if (response?.data?.quiz) {
        setData(response.data.quiz);
        const quizData = response.data.quiz;
        if (quizData?.quizType == "Q/A") {
          const timerValue = quizData?.timer !== "OFF" ? parseInt(quizData?.timer) : null;
          if (timerValue !== null) {
            setTimer(timerValue);
            setInitialTime(timerValue);
          }
        } else {
          setTimer(null);
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  const updateImpressions = async () => {
    try {

      const response = await axios.get(`${FRONTEND_URL}/quizzes/${id}`);
      if (response.status === 200) {
        const currentCount = response.data.quiz.impressions;
        const updatedCount = currentCount + 1;

        const updatedResponse = await axios.patch(`${FRONTEND_URL}/quizzes/impressions/${id}`, { impressions: updatedCount });
        console.log(updatedResponse)
      }

    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const updateImpressions = async () => {
  //     try {
  //       const response = await axios.get(`${FRONTEND_URL}/quizzes/${id}`);
  //       if (response.status === 200) {
  //         const currentCount = response.data.quiz.impressions;
  //         const updatedCount = currentCount + 1;

  //         const updatedResponse = await axios.patch(
  //           `${FRONTEND_URL}/quizzes/submit/${id}`,
  //           { impressions: updatedCount }
  //         );
  //         console.log(updatedResponse);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   updateImpressions();
  // }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimer(initialTime);
  };

  const handleSubmit = () => {
    let newArray=[...selectedOptions]
    if (selectedOptions[currentQuestionIndex] === undefined) {
      // const newArray = [...selectedOptions];
      newArray[currentQuestionIndex] = -1;
      setSelectedOptions(newArray);
    }

    if (currentQuestionIndex + 1 < data.questions.length) {
      handleNext();
    } else {
      setSubmitted(true);
      if (data.quizType === "Q/A") {
        setData({
          ...data,
          questions: data.questions.map((question, questionIndex) => {
            const selectedOption = newArray[questionIndex];
            // console.log("---77--",selectedOption)
            const isUnattempted = selectedOption === -1;
            // console.log("---79---",isUnattempted)

            return {
              ...question,
              attempts: isUnattempted
                ? question.attempts
                : question.attempts + 1,
              correctAttempts: isUnattempted
                ? question.correctAttempts
                : selectedOption === question.correctOption
                ? question.correctAttempts + 1
                : question.correctAttempts,
              incorrectAttempts: isUnattempted
                ? question.incorrectAttempts
                : selectedOption !== question.correctOption
                ? question.incorrectAttempts + 1
                : question.incorrectAttempts,
            };
          }),
        });
      } else {
        setData({
          ...data,
          questions: data.questions.map((question, questionIndex) => ({
            ...question,
            options: question.options.map((option, optionIndex) => ({
              ...option,
              count:
                newArray[questionIndex] === optionIndex
                  ? option.count + 1
                  : option.count,
            })),
          })),
        });
      }
    }
  };

  useEffect(() => {
    if (submitted) {
      console.log("data is ", data);
      console.log("selected option is ", selectedOptions);

      const updateUserRespone = async () => {
        try {
          const response = await axios.patch(
            `${FRONTEND_URL}/quizzes/submit/${id}`,
            data
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      updateUserRespone();
    }
  }, [submitted]);

  const handleClick = (index) => {
    const newArray = [...selectedOptions];
    newArray[currentQuestionIndex] = index;
    setSelectedOptions(newArray);
  };

  useEffect(() => {
    if (timer === null) return;

    const timerId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          handleSubmit();
          clearInterval(timerId);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer]);

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

  return (
    <>
      {submitted === false ? (
        <div className={styles.outer_container}>
          <div className={styles.quiz}>
            <div className={styles.row_1}>
              <div className={styles.quiz_details}>
                <div className={styles.question_no}>{`0${currentQuestionIndex + 1}/0${data?.questions?.length ? data?.questions?.length : ""}`}</div>
                {data && data.quizType === "Q/A" && data.timer !== "OFF" && (
                  <div className={styles.timer}>
                    {`00:${timer < 10 ? `0${timer}` : `${timer}`}`}
                  </div>
                )}
              </div>
              <div className={styles.question}>
                {data.questions &&
                  data.questions[currentQuestionIndex].questionName &&
                  data.questions[currentQuestionIndex].questionName}
              </div>
            </div>

            {data &&
              data.questions &&
              data.questions[currentQuestionIndex].optionType === "Text" && (
                <div className={styles.row_text}>
                  {data &&
                    data.questions &&
                    data.questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <div
                          key={index}
                          className={`${styles.option_text} ${
                            selectedOptions[currentQuestionIndex] === index &&
                            `${styles.change_outline}`
                          }`}
                          onClick={() => handleClick(index)}
                        >
                          {option.text}
                        </div>
                      )
                    )}
                </div>
              )}

            {data &&
              data.questions &&
              data.questions[currentQuestionIndex].optionType ===
                "Image Url" && (
                <div className={styles.row_image}>
                  {data &&
                    data.questions &&
                    data.questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <div
                          key={index}
                          className={`${styles.option_imageContainer} ${
                            selectedOptions[currentQuestionIndex] === index &&
                            `${styles.change_outline}`
                          }`}
                          onClick={() => handleClick(index)}
                        >
                          <img
                            src={option.imageUrl}
                            alt="sample"
                            className={styles.option_image}
                          />
                        </div>
                      )
                    )}
                </div>
              )}
            {data &&
              data.questions &&
              data.questions[currentQuestionIndex].optionType ===
                "Text & Image Url" && (
                <div className={styles.row_textImage}>
                  {data &&
                    data.questions &&
                    data.questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <div
                          key={index}
                          className={`${styles.option_textImageContainer} ${
                            selectedOptions[currentQuestionIndex] === index &&
                            `${styles.change_outline}`
                          }`}
                          onClick={() => handleClick(index)}
                        >
                          <div className={styles.col_1}>{option.text}</div>
                          <div className={styles.col_2}>
                            <img
                              src={option.imageUrl}
                              className={styles.col_2_option}
                              alt=""
                            />
                          </div>
                        </div>
                      )
                    )}
                </div>
              )}
            <div className={styles.last_row}>
              <button className={styles.row_3} onClick={handleSubmit}>
                {currentQuestionIndex + 1 <
                (data && data.questions && data.questions.length)
                  ? "NEXT"
                  : "Submit"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Completed selectedOptions={selectedOptions} data={data} />
      )}
    </>
  );
}

export default Quiz;
