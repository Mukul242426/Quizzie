import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import image1 from "../../assets/edit_btn.png";
import image2 from "../../assets/delete_btn.png";
import image3 from "../../assets/share_btn.png";
import { Link } from "react-router-dom";
import axios from 'axios'
import { FRONTEND_URL } from "../../utils/utils";
import moment from 'moment'
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

function Analytics({isLoggedIn,setIsLoggedIn,quizLink,setEditId,popups,setPopups,setDeleteId,quizDeleted,setQuizId, setIsQuesAnalysis}) {
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
        setData({});
        console.log(error);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        toast.error(error.response.data.error.message)
      }
    };
    fetchData();

  }, [isLoggedIn,quizLink,quizDeleted]);

  const handleEdit=(id)=>{
    setEditId(id)
   setPopups({...popups,showWrapper:true,showQuestion:true})   
  }

  const handleDelete=(id)=>{
    setPopups({...popups,showWrapper:true,showDelete:true})
    setDeleteId(id)
  }

  const handleLinkCopy=()=>{
    toast.success('Link Copied to Clipboard')
  }

  return (
    <div className={styles.analytics}>
      <div className={styles.analysis_box}>
        <div className={styles.title}>Quiz Analysis</div>
        {/* <div className={styles.container}> */}
        <table className={styles.analysis_table}>
          <thead>
            <tr className={styles.table_heading}>
              <th>S.No</th>
              <th>Quiz Name</th>
              <th>Created On</th>
              <th>Impression</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data && data.quizzes && data.quizzes.map((quiz, index) => (
              <tr
                key={quiz._id}
                className={`${styles.quiz_analysis} ${
                  (index + 1) % 2 === 0 && `${styles.even_row}`
                }`}
              >
                <td>{index+1}</td>
                <td>{quiz && quiz.name && quiz.name}</td>
                <td>{quiz && quiz.createdOn && `${moment.utc(quiz.createdOn).format('DD/MM/YYYY')}`}</td>
                <td>{quiz && quiz.impressions && quiz.impressions}</td>
                <td className={styles.button_box}>
                  <img src={image1} alt="edit" className={styles.edit_quiz} onClick={()=>handleEdit(quiz._id)}/>
                  <img src={image2} alt="delete" className={styles.delete_quiz} onClick={()=>handleDelete(quiz._id)}/>
                  <CopyToClipboard text={`${window.location.origin}/quiz/${quiz._id}`} onCopy={handleLinkCopy}>
                  <img src={image3} alt="share" className={styles.share_quiz} />
                  </CopyToClipboard>
                </td>
                <td>
                  <Link onClick={() => {
                    console.log("quiz?.id: ", quiz._id)
                    setQuizId(quiz?._id)
                    setIsQuesAnalysis(true)
                    }}  className={styles.link_text}>
                    Question Wise Analysis
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Analytics;
