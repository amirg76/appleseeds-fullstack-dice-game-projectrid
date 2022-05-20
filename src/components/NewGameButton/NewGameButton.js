import React from "react";
import "./NewGameButton.css";

export class NewGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <button className="newGameButton">{this.props.newGameText}</button>;
  }
}
