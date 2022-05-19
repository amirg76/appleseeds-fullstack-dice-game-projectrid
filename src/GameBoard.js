import React from "react";

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          width: 300,
          height: 300,
          display: "flex",
          alignItems: "center",
          backgroundColor: "red",
        }}
      ></div>
    );
  }
}
