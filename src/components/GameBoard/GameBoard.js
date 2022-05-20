import React from "react";
import "./GameBoard.css";
import MainBoard from "../MainBoard/MainBoard";

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="styleMain">
        <MainBoard />
      </div>
    );
  }
}

export default GameBoard;
