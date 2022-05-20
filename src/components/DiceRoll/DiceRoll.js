import React from "react";
import "./DiceRoll.css";

export class DiceRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  randomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  handleRoll = () => {
    const ran1 = this.randomNumber();
    const ran2 = this.randomNumber();
    this.props.rollResult(ran1, ran2, ran1 + ran2);
  };

  render() {
    return (
      <button className="rollDiceBtn" onClick={this.handleRoll}>
        {this.props.text}
      </button>
    );
  }
}
export default DiceRoll;
