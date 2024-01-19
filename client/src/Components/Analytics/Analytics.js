import React, { useState } from 'react'
import styles from './Analytics.module.css'
import image1 from '../../assets/edit_btn.png'
import image2 from '../../assets/delete_btn.png'
import image3 from '../../assets/share_btn.png'
import {Link} from 'react-router-dom'

function Analytics() {

  const [quizs,setQuizs]=useState([1,2,3,4,5,6])

  return (
    <div className={styles.analytics}>
      <div className={styles.analysis_box}>
       <div className={styles.title}>
        Quiz Analysis
       </div>
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
          {quizs.map((quiz,index)=>(
          <tr key={index} className={`${styles.quiz_analysis} ${(index+1)%2===0 && `${styles.even_row}`}`}>
            <td>{quiz}</td>
            <td>First Quiz</td>
            <td>16/01/2024</td>
            <td>3</td>
            <td className={styles.button_box}>
              <img src={image1} alt="edit"/>
              <img src={image2} alt="delete"/>
              <img src={image3} alt="share"/>
            </td>
            <td>
              <Link to="/quizAnalysis" className={styles.link_text}>Question Wise Analysis</Link>
            </td>
          </tr>))}
          </tbody>
        </table>
       {/* </div> */}
      </div>
    </div>
  )
}

export default Analytics
