import React, { useContext } from "react";
import styles from "./Login.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FRONTEND_URL } from "../../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../contexts/UserContext";

function Login() {
  const navigate = useNavigate();
  const {setIsLoggedIn}=useContext(UserContext)

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{3,4}$/,
        "email must be valid email"
      )
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(`${FRONTEND_URL}/login`, values);
      localStorage.setItem("token", JSON.stringify(response.data.jwtToken));
      toast.success(response.data.message);
      setIsLoggedIn(true)
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      <Form className={styles.form_container}>
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
        <div className={styles.btn_box}>
          <button className={styles.login_btn} type="submit">
            Login
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default Login;
