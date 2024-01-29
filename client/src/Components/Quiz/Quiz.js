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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${FRONTEND_URL}/quizzes/${id}`);
        console.log(response);
        setData(response.data.quiz);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = () => {
    if (currentQuestionIndex + 1 < data.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <>
      {submitted === false ? (
        <div className={styles.outer_container}>
          <div className={styles.quiz}>
            <div className={styles.row_1}>
              <div className={styles.quiz_details}>
                <div className={styles.question_no}>{`0${
                  currentQuestionIndex + 1
                }/0${data && data.questions && data.questions.length}`}</div>
                <div className={styles.timer}>00:10s</div>
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
                        <div key={index} className={styles.option_text}>
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
                          className={styles.option_imageContainer}
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
                          className={styles.option_textImageContainer}
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
        <Completed />
      )}
    </>
  );
}

export default Quiz;
