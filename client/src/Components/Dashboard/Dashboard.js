import React, { useContext, useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import DashboardInfo from "../DashboardInfo/DashboardInfo";
import Analytics from "../Analytics/Analytics";
import image1 from "../../assets/Vector 1 copy.png";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../contexts/UserContext";

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [clicked, setClicked] = useState(0);
  // const [showWrapper, setShowWrapper] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
  // const [showQuestion, setShowQuestion] = useState(false);
  const [quizLink, setQuizLink] = useState("");
  const [editId, setEditId] = useState("");
  // const [showDelete, setShowDelete] = useState(false);

  const initialPopup={
    showWrapper:false,
    showPopup:false,
    showQuestion:false,
    showDelete:false
  }

  const [popups,setPopups]=useState(initialPopup)

  const initialQuiz = {
    name: "",
    quizType: "",
    timer: "",
    questions: [
      {
        questionName: "",
        optionType: "Text",
        options: [
          { text: "", imageUrl: "" },
          { text: "", imageUrl: "" },
        ],
        correctOption: -1,
      },
    ],
  };
  const [quiz, setQuiz] = useState(initialQuiz);

  useEffect(() => {
    console.log(editId);
  }, [editId]);

  useEffect(() => {
    console.log({
     popups
    });
  }, [popups]);

  useEffect(() => {
    if (localStorage.getItem("clicked")) {
      setClicked(JSON.parse(localStorage.getItem("clicked")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clicked", JSON.stringify(clicked));
  }, [clicked]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({
      ...quiz,
      [name]: value,
    });
  };

  const handleContinue = () => {
    if (!quiz.name || !quiz.quizType) {
      toast.error("All fields are required");
    } else {
      // if (editId) {
      //   setEditId("");
      // }

     setPopups({...popups,showPopup:false,showQuestion:true})
    }
  };

  const handleClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      toast.success("Logged Out Successfully");
    } else {
      navigate("/");
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
                    if (!isLoggedIn) {
                      toast.error("You need to login first");
                    } else {
                      setPopups({
                        ...popups,
                        showWrapper:true,
                        showPopup:true
                      })
                    }
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
            <div className={styles.user_auth} onClick={handleClick}>
              {isLoggedIn ? "LOGOUT" : "LOGIN"}
            </div>
          </div>
        </div>
        {clicked === 0 ? (
          <DashboardInfo isLoggedIn={isLoggedIn} />
        ) : (
          <Analytics
            isLoggedIn={isLoggedIn}
            quizLink={quizLink}
            setEditId={setEditId}
            popups={popups}
            setPopups={setPopups}
          />
        )}
      </div>
      {popups.showWrapper && (
        <div
          className={styles.wrapper}
          onClick={() => {
            setPopups(initialPopup)
            setQuiz(initialQuiz);
            setEditId("")
          }}
        >
          {popups.showPopup ? (
            <div
              className={styles.popup}
              onClick={(event) => event.stopPropagation()}
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
                    
                    setQuiz(initialQuiz);
                    setPopups(initialPopup)
                  }}
                >
                  Cancel
                </button>
                <button className={styles.continue} onClick={handleContinue}>
                  Continue
                </button>
              </div>
            </div>
          ) : popups.showQuestion ? (
            <QuizQuestion
              quiz={quiz}
              setQuiz={setQuiz}
              initialQuiz={initialQuiz}
              popups={popups}
              setPopups={setPopups}
              initialPopup={initialPopup}
              setQuizLink={setQuizLink}
              editId={editId}
              setEditId={setEditId}
            />
          ) : popups.showDelete ? (
            <div className={styles.delete_container}>


            </div>
          ) : (
            <div
              className={styles.quiz_created}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.success_msg}>
                Congrats your Quiz is Published!
              </div>
              <div className={styles.shareable_link}>{quizLink}</div>
              <button className={styles.share_btn}>Share</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;
