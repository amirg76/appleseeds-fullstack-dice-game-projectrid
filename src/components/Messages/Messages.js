import React from "react";
import "./Messages.css";
export class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={`winnerMessage ${
          this.props.messageActive ? "activeMessage" : "hiddenMessage"
        }`}
      >
        {this.props.text}
      </div>
    );
  }
}
export default Messages;
