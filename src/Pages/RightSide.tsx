import React, { Component } from "react";
import "../Style/Style.css";
import axios from "axios";

interface State {
  newPost: {
    title: string;
    imgUrl: string;
    date: string;
    description: string;
  };
  save: boolean;
}

export default class RightSide extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      newPost: {
        title: "",
        imgUrl: "",
        date: "",
        description: "",
      },
      save: false,
    };

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandleChange(e: any) {
    this.setState((preState) => ({
      newPost: {
        ...preState.newPost,
        [e.target.name]: e.target.value,
      },
    }));
  }

  componentDidUpdate(preProps: any, preState: any) {
    if (preState.newPost !== this.state.newPost) {
      if (
        this.state.newPost.date &&
        this.state.newPost.title &&
        this.state.newPost.imgUrl
      ) {
        this.setState({ save: true });
      } else {
        this.setState({ save: false });
      }
    }
  }

  onSubmit() {
    if (
      this.state.newPost.date &&
      this.state.newPost.title &&
      this.state.newPost.imgUrl
    ) {
      axios
        .post("http://localhost:8080/post", {
          title: this.state.newPost.title,
          description: this.state.newPost.description,
          date: this.state.newPost.date,
          imgUrl: this.state.newPost.imgUrl,
        })
        .then((res: any) => {
          this.setState({
            newPost: {
              title: "",
              imgUrl: "",
              date: "",
              description: "",
            },
          });
          console.log("done");
          window.location.reload();
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="box">
        <form>
          <h3 className="mx-2">Create new post</h3>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.newPost.title}
              onChange={this.onHandleChange}
              placeholder="Title"
            />
          </div>
          <div className="form-group mt-2">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={this.state.newPost.description}
              onChange={this.onHandleChange}
              placeholder="Description"
            />
          </div>
          <div className="form-group mt-2">
            <label>Image URL</label>
            <input
              type="text"
              className="form-control"
              name="imgUrl"
              value={this.state.newPost.imgUrl}
              onChange={this.onHandleChange}
              placeholder="Image URL"
            />
          </div>
          <div className="form-group mt-2">
            <label>Date</label>
            <input
              type="Date"
              className="form-control"
              name="date"
              value={this.state.newPost.date}
              onChange={this.onHandleChange}
              placeholder="Date"
            />
          </div>
          <button
            type="button"
            disabled={this.state.save ? false : true}
            onClick={this.onSubmit}
            className="btn btn-primary mt-4"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}
