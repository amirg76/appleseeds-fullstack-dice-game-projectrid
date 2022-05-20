import React from "react";
import "./PlayerPage.css";
export class PlayerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={`playerContainer ${
          this.props.isActive ? "active" : "hidden"
        }`}
      >
        <h1 style={{ fontSize: 40 }}>{this.props.playerNum}</h1>
        <h1 style={{ fontSize: 50 }}>{this.props.totalScore}</h1>
        <div className="currentBlock">
          <h1>Current</h1>
          <h1 style={{ fontSize: 50, color: "white" }}>
            {this.props.currentScore}
          </h1>
        </div>
      </div>
    );
  }
}
export default PlayerPage;
// className="playerNum"
