import React, { useContext, useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import DashboardInfo from "../DashboardInfo/DashboardInfo";
import Analytics from "../Analytics/Analytics";
import image1 from "../../assets/Vector 1 copy.png";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../contexts/UserContext";
import axios from 'axios'
import { FRONTEND_URL } from "../../utils/utils";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QuestionAnalysis from "../QuestionAnalysis/QuestionAnalysis";


function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [clicked, setClicked] = useState(0);
  const [quizLink, setQuizLink] = useState("");
  const [editId, setEditId] = useState("");
  const [quizDeleted,setQuizDeleted]=useState('')
  const [deleteId,setDeleteId]=useState('')
  const [quizId, setQuizId] = useState(null);
  const [isQuesAnalysis, setIsQuesAnalysis] = useState(false);

  useEffect(()=>{
   if(JSON.parse(localStorage.getItem('token'))){
    setIsLoggedIn(true)
   }
   else{
    navigate('/')
   }
  },[isLoggedIn])

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
    console.log({
     popups
    });
  }, [popups]);

  // useEffect(()=>{
  //   console.log("edit id is ",editId)

  // },[editId])

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
      localStorage.removeItem('clicked')
      setIsLoggedIn(false);
      setQuizId(null)
      setIsQuesAnalysis(false)
      toast.success("Logged Out Successfully");
    } else {
      navigate("/");
    }
  };

  const handleDelete=async()=>{

    const jwttoken=JSON.parse(localStorage.getItem('token'))
    try{
      const response=await axios.delete(`${FRONTEND_URL}/quizzes/${deleteId}`,{
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${jwttoken}`
        }
      })
      console.log(response)
      toast.success('quiz deleted successfully')
      setDeleteId('')
      setQuizDeleted(response.data.deletedQuizId)
      setPopups({...popups,showWrapper:false,showDelete:false})

    }catch(error){
      console.log(error)
      toast.error(error.response.data.error.message)
    }

  }

  const handleCancel=()=>{
    setPopups(initialPopup)
  }

  const handleLinkCopy=()=>{
    toast.success('Link Copied to Clipboard')
    setPopups({...popups,showWrapper:false})
  }

  return (
    <>
    
     {isLoggedIn ? <div className={styles.dashboard}>
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
                  setIsQuesAnalysis(false);
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
        {isQuesAnalysis === true ? <QuestionAnalysis quizId={quizId} /> : clicked === 0 ? (
          <DashboardInfo isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} quizLink={quizLink}/>
        ) : (
          <Analytics
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            quizLink={quizLink}
            setEditId={setEditId}
            popups={popups}
            setPopups={setPopups}
            setDeleteId={setDeleteId}
            quizDeleted={quizDeleted}
            setQuizId={setQuizId}
            setIsQuesAnalysis={setIsQuesAnalysis}
          />
        )}
      </div>:null}
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
            <div className={styles.heading}>
            Are you confirm you want to delete ?
            </div>
            <div className={styles.button_box}>
              <button className={styles.confirm_delete} onClick={handleDelete}>Confirm Delete</button>
              <button className={styles.drop_btn} onClick={handleCancel}>Cancel</button>
            </div>
            
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
              <CopyToClipboard text={quizLink} onCopy={handleLinkCopy}>
              <button className={styles.share_btn}>Share</button>
              </CopyToClipboard>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;
