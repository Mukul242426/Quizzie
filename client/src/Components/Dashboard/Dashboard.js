import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import DashboardInfo from "../DashboardInfo/DashboardInfo";
import Analytics from "../Analytics/Analytics";
import image1 from "../../assets/Vector 1 copy.png";
import QuizQuestion from "../QuizQuestion/QuizQuestion";

function Dashboard() {
  const [clicked, setClicked] = useState(0);
  const [showWrapper, setShowWrapper] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [quiz, setQuiz] = useState({
    name: "",
    quizType: "",
    optionType: "Text",
    timer: "",
    questions: [
      {
        questionName: "",
        options: [{text:"",imageUrl:""},{text:"",imageUrl:""}],
        correctOption:-1
      },
    ],
  });

  // useEffect(() => {
  //   // console.log(clicked);
  //   // console.log(quiz);
  //   console.log("Wrapper is",showWrapper)
  //   console.log("popup is", showPopup);
  // }, [showWrapper,showPopup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({
      ...quiz,
      [name]: value,
    });
  };

  const handleContinue = () => {
    if (quiz.name && quiz.quizType) {
      setShowPopup(!showPopup)
    }
  };

  return (
    <>
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
                onClick={() => {
                  if (index !== 2) {
                    setClicked(index);
                  } else {
                    setShowWrapper(!showWrapper);
                    setShowPopup(!showPopup);
                  }
                }}
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
        {clicked === 0 ? <DashboardInfo /> : <Analytics />}
      </div>
      {showWrapper && (
        <div className={styles.wrapper}>
          {showPopup ? (
            <div
              className={styles.popup}
              // onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.upper_box}>
                <input
                  type="text"
                  className={styles.input_field}
                  placeholder="Quiz Name"
                  name="name"
                  value={quiz.name}
                  onChange={handleChange}
                />
                <div className={styles.quiz_type}>
                  <div className={styles.quiz_heading}>Quiz Type</div>
                  <button
                    className={`${styles.option} ${
                      quiz.quizType === "Q/A" && `${styles.selected}`
                    }`}
                    onClick={() => {
                      // setSelected(!selected)
                      setQuiz({ ...quiz, quizType: "Q/A" });
                    }}
                  >
                    Q & A
                  </button>
                  <button
                    className={`${styles.option} ${
                      quiz.quizType === "Poll" && `${styles.selected}`
                    }`}
                    onClick={() => {
                      setQuiz({ ...quiz, quizType: "Poll" });
                    }}
                  >
                    Poll Type
                  </button>
                </div>
              </div>
              <div className={styles.lower_box}>
                <button
                  className={styles.cancel}
                  onClick={() => {
                    setShowWrapper(!showWrapper)
                    setShowPopup(!showPopup);
                  }}
                >
                  Cancel
                </button>
                <button className={styles.continue} onClick={handleContinue}>
                  Continue
                </button>
              </div>
            </div>
          ) : (
            <QuizQuestion
              quiz={quiz}
              setQuiz={setQuiz}
              setShowWrapper={setShowWrapper}
              setShowPopup={setShowPopup}
              />
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;
