import React, { useState } from "react";
import styles from "./Register.module.css";

function Register() {
  const [isSignup, setIsSignup] = useState(true);

  const handleSubmit = () => {};

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
          <form className={styles.form_container} onSubmit={handleSubmit}>
            {isSignup && (
              <div className={styles.form_row}>
                <label>Name</label>
                <input type="text" className={styles.input_box} />
              </div>
            )}
            <div className={styles.form_row}>
              <label>Email</label>
              <input type="text" className={styles.input_box}/>
            </div>
            <div className={styles.form_row}>
              <label>Password</label>
              <input type="text" className={styles.input_box}/>
            </div>
            {isSignup && (
              <div className={styles.form_row}>
                <label className={styles.label}>Confirm Password</label>
                <input type="text" className={styles.input_box}/>
              </div>
            )}
            <div className={styles.btn_box}>
            <button className={styles.register_btn}>{isSignup?'Signup':'Login'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
