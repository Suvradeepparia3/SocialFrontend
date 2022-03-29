import React, { Component } from "react";
import "../Style/Style.css";
import LogInOrSignUp from "../Components/LogInOrSignUp";
import RecentLoginTab from "../Components/RecentLoginTab";
import axios from "axios";
import { Redirect } from "react-router-dom";

interface State {
  userRegister: {
    name: string;
    email: string;
    password: string;
  };
  logInDetails: {
    email: string;
    password: string;
  };
  loading: boolean;
  submit: boolean;
  logInStatus: string;
  signUpStatus: string;
  loggedIn: boolean;
}

export default class Landing extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      userRegister: {
        name: "",
        email: "",
        password: "",
      },
      logInDetails: {
        email: "",
        password: "",
      },
      loading: false,
      submit: false,
      logInStatus: "",
      signUpStatus: "",
      loggedIn: false,
    };

    this.onLogInChange = this.onLogInChange.bind(this);

    this.onLogIn = this.onLogIn.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token != null) {
      this.setState({ loggedIn: true });
    }
  }

  // ********* Log in *************

  onLogInChange(e: any) {
    this.setState((preState) => ({
      logInDetails: {
        ...preState.logInDetails,
        [e.target.name]: e.target.value,
      },
    }));
  }

  onLogIn() {
    if (!this.state.logInDetails.email) {
      this.setState({ logInStatus: "Email Must", submit: true });
    } else if (!this.state.logInDetails.password) {
      this.setState({ logInStatus: "Password Must", submit: true });
    } else {
      this.setState({ loading: true, submit: true });
      axios
        .post("http://localhost:8080/auth/login", {
          email: this.state.logInDetails.email,
          password: this.state.logInDetails.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", res.data.name);
          this.setState({
            loading: false,
            loggedIn: true,
          });
        })
        .catch((error) => {
          this.setState({
            loading: false,
            logInStatus: error.response.data,
          });
        });
    }
  }

  // *******************************

  render() {
    if (this.state.loggedIn) return <Redirect to="/home" />;

    return (
      <div className="container">
        <div className="leftContent">
          <div className="abc">
            <div className="brandName">faesbook</div>
            <div className="title">Recent logins</div>
            <div className="description">
              Click your picture or add an account.
            </div>
            <RecentLoginTab />
          </div>
        </div>
        <div className="rightContent">
          <LogInOrSignUp
            submit={this.state.submit}
            loading={this.state.loading}
            logInStatus={this.state.logInStatus}
            logInDetails={this.state.logInDetails}
            onLogInChange={this.onLogInChange}
            onLogIn={this.onLogIn}
          />
        </div>
      </div>
    );
  }
}
