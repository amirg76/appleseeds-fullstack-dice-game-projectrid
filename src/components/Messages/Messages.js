import React from "react";
import "./Messages.css";
export class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleContinue = () => {
    this.props.continuePlay();
  };
  handleStart = () => {
    this.props.start();
  };

  render() {
    return (
      <div
        className={`winnerMessage ${
          this.props.messageActive ? "activeMessage" : "hiddenMessage"
        }`}
      >
        {this.props.text}
        <button
          className="messageBtn"
          onClick={
            this.props.id === "winner" ? this.handleStart : this.handleContinue
          }
        >
          {this.props.btnText}
        </button>
      </div>
    );
  }
}
export default Messages;
