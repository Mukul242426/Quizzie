import React, { useState,useEffect } from "react";
import styles from "./Completed.module.css";
import image1 from "../../assets/trophy.png";

function Completed({ selectedOptions, data }) {

  const [score,setScore]=useState(0)

 useEffect(()=>{
  if(data.quizType==='Q/A'){
    let count=0;
     selectedOptions.forEach((option,index)=>{
      if(option===data.questions[index].correctOption){
        count+=1
      }
     })
     setScore(count)
  }
 },[])

  return (
    <>
      {data && data.quizType === "Q/A" ? (
        <div className={styles.outer_box}>
        <div className={styles.completed}>
          <div className={styles.congrats_msg}>Congrats Quiz is completed</div>
          <div className={styles.victory_container}>
            <img src={image1} alt="trophy" className={styles.trophy} />
          </div>
          <div className={styles.score_msg}>Your score is <span className={styles.marks}>{`0${score}/0${data.questions.length}`}</span></div>
        </div>
        </div>
      ) : (
        <div className={styles.poll}><div className={styles.msg}>Thank you for participating in the Poll</div></div>
      )}
    </>
  );
}

export default Completed;
