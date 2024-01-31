import React, { useState, useEffect } from "react";
import styles from "./QuestionAnalysis.module.css";
import axios from "axios";
import { FRONTEND_URL } from "../../utils/utils";
import moment from "moment";

const QuestionAnalysis = ({ quizId }) => {
  const [quizData, setQuizData] = useState({});

  console.log("quizData: ", quizData);

  useEffect(() => {
    if (quizId !== null);
    getQuiz();
  }, [quizId]);

  const getQuiz = async () => {
    try {
      const res = await axios.get(`${FRONTEND_URL}/quizzes/${quizId}`);
      if (res?.data?.success) {
        setQuizData(res.data.quiz);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.question_analysis_container}>
      <div className={styles.quiz_header_container}>
        <h1 className={styles.quizTitle}>Quiz {quizData.name} Question Analysis</h1>
        <div className={styles.quizDetails}>
          <span className={styles.quizSpan}>Created on: {moment.utc(quizData.createdOn).format('DD/MM/YYYY')}</span>
          <span className={styles.quizSpan}>Impressions: {quizData.impressions}</span>
        </div>
      </div>

      <div className={styles.questions_body}>
        {quizData?.questions?.map((question, index) => {
          return (
            <div key={question._id} className={styles.question_body}>
              <h1 className={styles.question_title}>Q.{index + 1} {question?.questionName} </h1>
              {quizData?.quizType == "Q/A"
                ?
                <div className={styles.qa_data_container}>
                  <div className={styles.qa_data_box}>
                    <h3 className={styles.qa_number}>{question.attempts}</h3>
                    <span className={styles.qa_description}>people Attempted the question</span>
                  </div>
                  <div className={styles.qa_data_box}>
                    <h3 className={styles.qa_number}>{question.correctAttempts}</h3>
                    <span className={styles.qa_description}>people Answered Correctly</span>
                  </div>
                  <div className={styles.qa_data_box}>
                    <h3 className={styles.qa_number}>{question.incorrectAttempts}</h3>
                    <span className={styles.qa_description}>people Answered Incorrectly</span>
                  </div>
                </div>
                :
                <div className={styles.poll_data_container}>
                  {question?.options?.map((option, optionIndex) => {
                    return (
                      <div key={optionIndex} className={styles.poll_data_box}>
                        <h3 className={styles.poll_number}>{option.count}</h3>
                        <span className={styles.poll_description}>Option {optionIndex + 1}</span>
                      </div>
                    );
                  })}
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );

};

export default QuestionAnalysis;