import React from "react";
import "./MainBoard.css";
import { NewGameButton } from "../NewGameButton/NewGameButton";
import { PlayerPage } from "../PlayerPage/PlayerPage";
import { DiceDisplay } from "../DiceDisplay/DiceDisplay";
import DiceRoll from "../DiceRoll/DiceRoll";
import DiceHold from "../DiceHold/DiceHold";
import UserInput from "../UserInput/UserInput";
import Messages from "../Messages/Messages";
export class MainBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sumRoll1: 0,
      sumRoll2: 0,
      random1: 4,
      random2: 5,
      global1: 0,
      global2: 0,
      player1Active: true,
      player2Active: false,
      userInput: "",
      winnerStatus: false,
      winnerMessage: false,
      doubleMessage: false,

      getRoll: (roll1, roll2, sum) => {
        this.setState((prevState) => {
          return {
            doubleMessage: sum === 12 ? true : false,
            sumRoll1:
              prevState.player1Active && sum !== 12
                ? prevState.sumRoll1 + sum
                : prevState.sumRoll1,
            sumRoll2:
              prevState.player2Active && sum !== 12
                ? prevState.sumRoll2 + sum
                : sum !== 12
                ? 0
                : prevState.sumRoll2,

            random1: roll1,
            random2: roll2,
          };
        });
      },
      changeActive: () => {
        this.setState((prevState) => {
          return {
            player1Active: !prevState.player1Active,
            player2Active: !prevState.player2Active,
          };
        });
      },
      changeGlobal: () => {
        this.setState((prevState) => {
          return {
            global1: !prevState.player1Active
              ? prevState.global1 + prevState.sumRoll1
              : prevState.global1,

            sumRoll1: 0,

            global2: !prevState.player2Active
              ? prevState.global2 + prevState.sumRoll2
              : prevState.global2,

            sumRoll2: 0,
          };
        });
      },
    };
  }

  checkWinner = () => {
    this.setState((prevState) => {
      console.log(prevState.global1);
      console.log(prevState.global2);
      console.log(prevState.userInput);
      if (prevState.global1 > prevState.userInput) {
        return { winnerStatus: 2 };
      } else if (prevState.global2 > prevState.userInput)
        return { winnerStatus: 1 };
      else if (prevState.global1 === prevState.userInput) {
        return { winnerStatus: 1 };
      } else if (prevState.global2 === prevState.userInput) {
        return { winnerStatus: 2 };
      } else return { winnerStatus: null };
    });
  };

  getInput = (event) => {
    console.log(event.target.value);
    this.setState((prevState) => {
      // if (this.sumRoll1 > Number(event.target.value)) {
      console.log(prevState.sumRoll1);
      console.log(prevState.sumRoll2);
      return {
        userInput: Number(event.target.value),
      };
    });
  };

  endGame = () => {
    this.setState((prevState) => {
      if (prevState.winnerStatus) {
        console.log(prevState.winnerStatus);
        return {
          winnerMessage: true,
          // player1Active: prevState.winnerStatus === 1 ? true : false,
          // player2Active: prevState.winnerStatus === 2 ? true : false,
        };
      }
    });
  };

  render() {
    return (
      <>
        <NewGameButton newGameText="NEW GAME" />
        <div className="mainBoard">
          <PlayerPage
            playerNum="Player-1"
            totalScore={this.state.global1}
            currentScore={this.state.sumRoll1}
            isActive={this.state.player1Active}
          />
          <div className="middleBoard">
            <DiceDisplay img1={this.state.random1} img2={this.state.random2} />
            <DiceRoll rollResult={this.state.getRoll} text="ROLL DICE" />

            <DiceHold
              text="HOLD"
              pl1Active={this.state.player1Active}
              pl2Active={this.state.player2Active}
              activePlayer={this.state.changeActive}
              globalUpdate={this.state.changeGlobal}
              checkWinner={this.checkWinner}
              winner={this.endGame}
            />

            <UserInput takeInput={this.getInput} />
          </div>
          <PlayerPage
            playerNum="Player-2"
            totalScore={this.state.global2}
            currentScore={this.state.sumRoll2}
            isActive={this.state.player2Active}
          />
        </div>
        <Messages
          text={`Congratulation Player${this.state.winnerStatus} Win!!!`}
          messageActive={this.state.winnerMessage}
        />
        <Messages
          text="You Got Double And Lost Temporary Score"
          messageActive={this.state.doubleMessage}
        />
      </>
    );
  }
}

export default MainBoard;
