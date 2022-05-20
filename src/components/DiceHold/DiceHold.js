import React from "react";
import "./DiceHold.css";
export class DiceHold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  randomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  handleHold = () => {
    this.props.activePlayer();
    this.props.globalUpdate();
    this.props.checkWinner();
    this.props.winner();
  };

  render() {
    return (
      <button className="holdDiceBtn" onClick={this.handleHold}>
        {this.props.text}
      </button>
    );
  }
}
export default DiceHold;
