import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

function Register() {
  const [isSignup, setIsSignup] = useState(true);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const registerSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name should be minimum 3 characters long")
      .max(30, "Name should be less than or equal to 30 characters")
      .required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(8, "Weak Password")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf(
        [Yup.ref("password"), null],
        "Password and confirm password must be same"
      ),
  });

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
              <>
                <div className={styles.form_row}>
                  <label>Name</label>
                  <input
                    type="text"
                    className={styles.input_box}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name ? (
                  <div className={styles.error}>{errors.name}</div>
                ) : null}
              </>
            )}
            <div className={styles.form_row}>
              <label>Email</label>
              <input
                type="email"
                className={styles.input_box}
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            {errors.email ? (
              <div className={styles.error}>{errors.email}</div>
            ) : null}
            <div className={styles.form_row}>
              <label>Password</label>
              <input
                type="password"
                className={styles.input_box}
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            {errors.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}

            {isSignup && (
              <>
                <div className={styles.form_row}>
                  <label className={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    className={styles.input_box}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword ? (
                  <div className={styles.error}>{errors.confirmPassword}</div>
                ) : null}
              </>
            )}
            <div className={styles.btn_box}>
              <button className={styles.register_btn} onSubmit={handleSubmit}>
                {isSignup ? "Signup" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
