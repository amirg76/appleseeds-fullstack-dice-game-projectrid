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
  }

  inputMove = (event) => {
    // this.props.defultInput();
    this.props.takeInput(event);
  };
  render() {
    return (
      <input
        className={`inputTotal newGameButton ${
          !this.props.btnStatus ? "btn-disable" : null
        }`}
        onChange={this.inputMove}
        // placeholder={this.inputMove}
        placeholder={this.props.defultInput}
      ></input>
    );
  }
}
export default UserInput;
