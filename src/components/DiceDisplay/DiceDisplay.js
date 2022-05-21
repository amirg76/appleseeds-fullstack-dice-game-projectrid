import React from "react";
import "./DiceDisplay.css";
export class DiceDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={`imgGroup ${
          this.props.picEnable ? "activeImg" : "hiddenImg"
        }`}
      >
        <div className={`img${this.props.img1}`}></div>
        <div className={`img${this.props.img2}`}></div>
      </div>
      // <div className="playerContainer"></div>;
    );
  }
}
export default DiceDisplay;
