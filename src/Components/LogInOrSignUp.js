import React from "react";
import { Link } from "react-router-dom";
import "../Style/Style.css";

function LogInOrSignUp(props) {
  return (
    <div>
      <form className="plate">
        {props.submit ? (
          props.loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "red" }}>
              {props.logInStatus}
            </p>
          )
        ) : null}
        <input
          type="text"
          name="email"
          placeholder="Email address or phone number"
          value={props.logInDetails.email}
          onChange={props.onLogInChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={props.logInDetails.password}
          onChange={props.onLogInChange}
        />
        <button type="button" className="plateBtn" onClick={props.onLogIn}>
          Log In
        </button>
        <hr />
        <button
          type="button"
          className="plateBtn"
          style={{
            width: "52%",
            fontSize: "17px",
            backgroundColor: "rgb(14, 204, 14)",
          }}
        >
          <Link to="/create" style={{ textDecoration: "none", color: "white" }}>
            Create new account{" "}
          </Link>
        </button>
      </form>
    </div>
  );
}

export default LogInOrSignUp;
