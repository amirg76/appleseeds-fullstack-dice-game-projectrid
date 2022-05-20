import React from "react";
import "./UserInput.css";

export class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInput: "",
    };
  }

  handleInput(event) {
    // this.setState({ userInput: event.target.value });
    this.setState((prevState) => {
      return {
        userInput: Number(event.target.value),
      };
    });

    // console.log(this.props);
  }
  inputMove = (event) => {
    // handleInput(event);
    this.props.takeInput(event);
  };
  render() {
    return <input className="inputTotal" onChange={this.inputMove}></input>;
  }
}
export default UserInput;
