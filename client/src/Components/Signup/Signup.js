import React from "react";
import styles from "./Signup.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FRONTEND_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const signupSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name should be minimum 3 characters long")
      .max(30, "Name should be less than or equal to 30 characters")
      .required("Name is required"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{3,4}$/,
        "email must be valid email"
      )
      .required("Email is required"),
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

  const handleSignup = async (values) => {
    try {
      const response = await axios.post(`${FRONTEND_URL}/signup`, values);
      localStorage.setItem("token", JSON.stringify(response.data.jwtToken));
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast(error.response.data.error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSignup}
    >
      <Form className={styles.form_container}>
        <div className={styles.form_row}>
          <label>Name</label>
          <div className={styles.input_container}>
            <Field className={styles.input_box} name="name" />
            <ErrorMessage
              component="div"
              name="name"
              className={styles.error}
            />
          </div>
        </div>

        <div className={styles.form_row}>
          <label>Email</label>
          <div className={styles.input_container}>
            <Field type="email" className={styles.input_box} name="email" />
            <ErrorMessage
              component="div"
              name="email"
              type="email"
              className={styles.error}
            />
          </div>
        </div>
        <div className={styles.form_row}>
          <label>Password</label>
          <div className={styles.input_container}>
            <Field
              type="password"
              className={styles.input_box}
              name="password"
            />
            <ErrorMessage
              component="div"
              name="password"
              type="password"
              className={styles.error}
            />
          </div>
        </div>

        <div className={styles.form_row}>
          <label className={styles.label}>Confirm Password</label>
          <div className={styles.input_container}>
            <Field
              type="password"
              className={styles.input_box}
              name="confirmPassword"
            />
            <ErrorMessage
              component="div"
              name="confirmPassword"
              type="confirmPassword"
              className={styles.error}
            />
          </div>
        </div>

        <div className={styles.btn_box}>
          <button className={styles.signup_btn} type="submit">
            Signup
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default Signup;
