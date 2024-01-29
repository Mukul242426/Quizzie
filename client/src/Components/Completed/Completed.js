import React from 'react'
import styles from './Completed.module.css'
import image1 from '../../assets/trophy.png'

function Completed() {
  return (
    <div className={styles.completed}>
        <div className={styles.congrats_msg}>
        Congrats Quiz is completed
        </div>
        <div className={styles.victory_container}>
        <img src={image1} alt="trophy" className={styles.trophy}/>
        </div>
        <div className={styles.score_msg}>

        </div>
    </div>
  )
}

export default Completed
