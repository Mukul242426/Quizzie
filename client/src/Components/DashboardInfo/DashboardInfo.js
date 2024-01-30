import React, { useState, useEffect } from "react";
import styles from "./DashboardInfo.module.css";
import image1 from "../../assets/eye.png";
import axios from "axios";
import { FRONTEND_URL } from "../../utils/utils";
import moment from "moment";

function DashboardInfo({ isLoggedIn, quizLink }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const jwttoken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(`${FRONTEND_URL}/quizzes?sort=desc`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwttoken}`,
          },
        });
        console.log(response);
        setData(response.data);
      } catch (error) {
        setData({});
        // console.log(error);
      }
    };
    fetchData();
  }, [isLoggedIn, quizLink]);

  return (
    <div className={styles.dashboardInfo}>
      <div className={styles.upper_part}>
        <div className={styles.box_1}>
          <div>
            {data && data.quizCreated ? data.quizCreated : 0}{" "}
            <span className={styles.title}>Quiz</span>
          </div>
          <div className={styles.title}>Created</div>
        </div>
        <div className={styles.box_2}>
          <div>
            {data && data.questionsCreated ? data.questionsCreated : 0}{" "}
            <span className={styles.title}>questions</span>
          </div>
          <div className={styles.title}>Created</div>
        </div>
        <div className={styles.box_3}>
          <div>
            {data && data.impressions ? data.impressions : 0}{" "}
            <span className={styles.title}>Total</span>
          </div>
          <div className={styles.title}>Impressions</div>
        </div>
      </div>
      <div className={styles.lower_part}>
        <div className={styles.heading}>Trending Quizs</div>
        <div className={styles.trending_quiz}>
          {data && data.quizzes && data.quizzes.length > 0 ? (
            data.quizzes.map((quiz, index) => (
              <div key={quiz._id} className={styles.quiz}>
                <div className={styles.row_1}>
                  <div className={styles.quiz_name}>
                    {quiz && quiz.name && quiz.name}
                  </div>
                  <div className={styles.impressions}>
                    <div className={styles.count}>
                      {quiz && quiz.impressions && quiz.impressions}
                    </div>
                    <div className={styles.eye_pic}>
                      <img src={image1} alt="eye" />
                    </div>
                  </div>
                </div>
                <div className={styles.row_2}>
                  {quiz &&
                    quiz.createdOn &&
                    `Created On ${moment
                      .utc(quiz.createdOn)
                      .format("DD MMM, YYYY")}`}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.no_quiz}>
              You haven't created any Quiz, Click on Create Quiz to create your
              first Quiz
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
