import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import DashboardInfo from "../DashboardInfo/DashboardInfo";
import Analytics from "../Analytics/Analytics";
import image1 from '../../assets/Vector 1 copy.png'

function Dashboard() {
  const [clicked, setClicked] = useState(0);

  return (
    <div className={styles.dashboard}>
      <div className={styles.left_area}>
        <div className={styles.box_1}>QUIZZIE</div>
        <div className={styles.box_2}>
          {["Dashboard", "Analytics", "Create Quiz"].map((title, index) => (
            <button
              className={`${styles.title} ${
                clicked === index && `${styles.clicked}`
              }`}
              key={index}
              onClick={() => setClicked(index)}
            >
              {title}
            </button>
          ))}
        </div>
        <div className={styles.box_3}>
          <div className={styles.line}>
          <img src={image1} className={styles.horizontal_line} alt="line" />
          </div>
          <div className={styles.user_auth}>LOGOUT</div>
          </div>
      </div>
      {clicked===0?(<DashboardInfo/>):(<Analytics/>)}
    </div>
  );
}

export default Dashboard;
