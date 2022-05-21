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
    this.props.picEnable();
    this.props.activePlayer();
    this.props.globalUpdate();
    this.props.checkWinner();
    setTimeout(() => {
      this.props.winner();
    }, 500);
  };

  render() {
    return (
      <button
        className={`holdDiceBtn newGameButton ${
          !this.props.btnStatus ? "btn-disable" : null
        }`}
        onClick={this.handleHold}
      >
        {this.props.text}
      </button>
    );
  }
}
export default DiceHold;
