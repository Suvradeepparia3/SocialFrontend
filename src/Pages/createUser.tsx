import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateUser = () => {
  const [submit, setSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [signUpStatus, setSignUpStatus] = useState<string>("");
  const [userRegister, setUserRegister] = useState({
    name: "",
    password: "",
    email: "",
  });

  // ********** Sign Up ***********

  const onSignUpChange = (e: any) => {
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value,
    });
  };

  const onSignUp = () => {
    setSubmit(true);
    if (!userRegister.name || !userRegister.email || !userRegister.password) {
      setSignUpStatus("Please fill all");
    } else {
      setLoading(true);
      axios
        .post("http://localhost:8080/auth/register", {
          name: userRegister.name,
          email: userRegister.email,
          password: userRegister.password,
        })
        .then((res) => {
          setLoading(false);
          setSignUpStatus(res.data);
          setUserRegister({
            name: "",
            email: "",
            password: "",
          });
        })
        .catch((error) => {
          setLoading(false);
          setSignUpStatus(error.response.data);
        });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form className="plate">
        {submit ? (
          loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>{signUpStatus}</p>
          )
        ) : null}
        <input
          type="text"
          name="name"
          value={userRegister.name}
          onChange={onSignUpChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="email"
          value={userRegister.email}
          onChange={onSignUpChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="password"
          value={userRegister.password}
          onChange={onSignUpChange}
          placeholder="Password"
        />
        <button type="button" className="plateBtn" onClick={onSignUp}>
          Sign Up
        </button>
        <button type="button" className="plateBtn backBtn">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Back
          </Link>
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
