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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${FRONTEND_URL}/quizzes/${id}`);
        console.log(response);
        setData(response.data.quiz);
        const timerValue = parseInt(response.data.quiz.timer);
        if (!isNaN(timerValue)) {
          setTimer(timerValue);
        } else {
          setTimer(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(()=>{
    const updateImpressions=async()=>{
      try{
        
        const response=await axios.get(`${FRONTEND_URL}/quizzes/${id}`)
        if(response.status===200){
          const currentCount=response.data.quiz.impressions;
          const updatedCount=currentCount+1;

          const updatedResponse=await axios.patch(`${FRONTEND_URL}/quizzes/submit/${id}`,{impressions:updatedCount})
          console.log(updatedResponse)
        }

      }catch(error){
        console.log(error)
      }
    }
    updateImpressions();

  },[])

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (data.quiz && !isNaN(parseInt(data.quiz.timer))) {
      setTimer(parseInt(data.quiz.timer));
    }
  };

  const handleSubmit = () => {
    if (selectedOptions[currentQuestionIndex] === undefined) {
      const newArray = [...selectedOptions];
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
          questions: data.questions.map((question, questionIndex) => ({
            ...question,
            attempts:
              selectedOptions[questionIndex] !== -1
                ? question.attempts + 1
                : question.attempts,
            correctAttempts:
              selectedOptions[questionIndex] !== -1 &&
              selectedOptions[questionIndex] === question.correctOption
                ? question.correctAttempts + 1
                : question.correctAttempts,
            incorrectAttempts:
              selectedOptions[questionIndex] !== -1 &&
              selectedOptions[questionIndex] !== question.correctOption
                ? question.incorrectAttempts + 1
                : question.incorrectAttempts,
          })),
        });
      } else {
        setData({
          ...data,
          questions:data.questions.map((question,questionIndex)=>({
            ...question,
            options:question.options.map((option,optionIndex)=>({
              ...option,
              count:selectedOptions[optionIndex]===optionIndex?question.count+1:question.count
            }))
          }))
        })
      }
    }
  };

  useEffect(() => {
    if (submitted) {
     const updateUserRespone=async()=>{
      try{
       const response= await axios.patch(`${FRONTEND_URL}/quizzes/submit/${id}`,{questions:data})
       console.log(response)

      }catch(error){
        console.log(error)
      }

     }
     updateUserRespone()
    }
  }, [submitted]);

  // useEffect(() => {
    
  //     const timerId = setInterval(() => {
  //       if (timer === 0) {
  //         handleSubmit();
  //         clearInterval(timerId);
  //       } else {
  //         setTimer(timer - 1);
  //       }
  //     }, 1000);
  
  //     return () => clearInterval(timerId);

  // }, [timer]);

  useEffect(() => {
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
  

  const handleClick = (index) => {
    const newArray = [...selectedOptions];
    newArray[currentQuestionIndex] = index;
    setSelectedOptions(newArray);
  };

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
                <div className={styles.question_no}>{`0${
                  currentQuestionIndex + 1
                }/0${data && data.questions && data.questions.length}`}</div>
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
