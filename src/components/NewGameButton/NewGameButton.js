import React from "react";
import "./NewGameButton.css";

export class NewGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleStart = () => {
    this.props.start();
  };
  render() {
    return (
      <button className="newGameButton" onClick={this.props.onStart}>
        {this.props.newGameText}
      </button>
    );
  }
}
