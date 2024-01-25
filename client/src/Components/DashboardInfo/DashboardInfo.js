import React, { useState, useEffect } from "react";
import styles from "./DashboardInfo.module.css";
import image1 from "../../assets/eye.png";
import axios from "axios";
import { FRONTEND_URL } from "../../utils/utils";

function DashboardInfo() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const jwttoken = JSON.parse(localStorage.getItem("token"));

      try {
        const response = await axios.get(`${FRONTEND_URL}/quizzes`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwttoken}`,
          },
        });
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const demo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className={styles.dashboardInfo}>
      <div className={styles.upper_part}>
        <div className={styles.box_1}>
          <div>
            {data && data.quizCreated && data.quizCreated} <span className={styles.title}>Quiz</span>
          </div>
          <div className={styles.title}>Created</div>
        </div>
        <div className={styles.box_2}>
          <div>
            {data && data.questionsCreated && data.questionsCreated} <span className={styles.title}>questions</span>
          </div>
          <div className={styles.title}>Created</div>
        </div>
        <div className={styles.box_3}>
          <div>
            100 <span className={styles.title}>Total</span>
          </div>
          <div className={styles.title}>Impressions</div>
        </div>
      </div>
      <div className={styles.lower_part}>
        <div className={styles.heading}>Trending Quizs</div>
        <div className={styles.trending_quiz}>
          {demo.map((value, index) => (
            <div key={value} className={styles.quiz}>
              <div className={styles.row_1}>
                <div className={styles.quiz_name}>First Quiz</div>
                <div className={styles.impressions}>
                  <div className={styles.count}>200</div>
                  <div className={styles.eye_pic}>
                    <img src={image1} alt="eye" />
                  </div>
                </div>
              </div>
              <div className={styles.row_2}>Created on Jan 16, 2024</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
