import React, { useState } from "react";
import styles from "./Register.module.css";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";

function Register() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className={styles.register}>
      <div className={styles.register_box}>
        <div className={styles.title}>QUIZZIE</div>
        <div className={styles.toggle_container}>
          <button
            className={`${styles.signup_btn} ${
              isSignup && `${styles.clicked}`
            }`}
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </button>
          <button
            className={`${styles.login_btn} ${
              !isSignup && `${styles.clicked}`
            }`}
            onClick={() => setIsSignup(false)}
          >
            Login
          </button>
        </div>
        <div className={styles.register_form}>
          {isSignup ? <Signup /> : <Login />}
        </div>
      </div>
    </div>
  );
}

export default Register;
