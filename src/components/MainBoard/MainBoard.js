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
      current1: 0,
      current2: 0,
      random1: 4,
      random2: 5,
      global1: 0,
      global2: 0,
      player1Active: true,
      player2Active: false,
      userInput: 100,
      winnerStatus: false,
      winnerMessage: false,
      doubleMessage: false,
      btnEnable: true,
      startRoll: false,
      showPic: false,
      allWin1: 0,
      allWin2: 0,

      getRoll: (roll1, roll2, sum) => {
        this.setState((prevState) => {
          return {
            current1:
              prevState.player1Active && sum !== 12
                ? prevState.current1 + sum
                : prevState.current1,
            current2:
              prevState.player2Active && sum !== 12
                ? prevState.current2 + sum
                : sum !== 12
                ? 0
                : prevState.current2,

            random1: roll1,
            random2: roll2,
          };
        });
      },
      checkDouble: (sum) => {
        this.setState((prevState) => {
          return {
            doubleMessage: sum === 12 ? true : false,
            current1: sum === 12 ? 0 : this.state.current1,
            current2: sum === 12 ? 0 : this.state.current2,
          };
        });
        if (sum === 12) this.state.changeActive();
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
              ? prevState.global1 + prevState.current1
              : prevState.global1,

            current1: 0,

            global2: !prevState.player2Active
              ? prevState.global2 + prevState.current2
              : prevState.global2,

            current2: 0,
          };
        });
      },
    };
  }

  componentDidMount() {
    this.loadScoreBoard();
  }

  checkWinner = () => {
    this.setState((prevState) => {
      if (
        prevState.global1 > prevState.userInput ||
        prevState.global2 === prevState.userInput
      )
        return { winnerStatus: 2 };
      else if (
        prevState.global2 > prevState.userInput ||
        prevState.global1 === prevState.userInput
      )
        return { winnerStatus: 1 };
      else return { winnerStatus: null };
    });
  };
  handleMessageDouble = () => {
    this.setState((prevState) => {
      return {
        doubleMessage: false,
      };
    });
  };

  getInput = (event) => {
    this.setState((prevState) => {
      return {
        userInput: Number(event.target.value),
      };
    });
  };
  renderScoreBoard = () => {
    this.setState((prevState) => {
      return {
        allWin1:
          prevState.winnerStatus === 1
            ? prevState.allWin1 + 1
            : prevState.allWin1,
        allWin2:
          prevState.winnerStatus === 2
            ? prevState.allWin2 + 1
            : prevState.allWin2,
      };
    });
  };
  saveScoreBoard = () => {
    if (localStorage.getItem("data") == null)
      localStorage.setItem("data", "[]");
    this.setState((prevState) => {
      console.log(prevState.allWin1);
      const play1Rec = prevState.allWin1;
      const play2Rec = prevState.allWin2;

      let scoreBoard = JSON.parse(localStorage.getItem("data"));
      scoreBoard.push({ play1Rec, play2Rec });
      localStorage.setItem("data", JSON.stringify(scoreBoard));
    });
  };

  loadScoreBoard = () => {
    this.setState((prevState) => {
      if (localStorage.getItem("data") !== null) {
        let scoreBoard = JSON.parse(localStorage.getItem("data"));
        console.log(scoreBoard[scoreBoard.length - 1].play1Rec);
        return {
          allWin1: scoreBoard[scoreBoard.length - 1].play1Rec,
          allWin2: scoreBoard[scoreBoard.length - 1].play2Rec,
        };
      }
    });
  };
  endGame = () => {
    this.setState((prevState) => {
      if (prevState.winnerStatus) {
        return {
          winnerMessage: true,
          btnEnable: false,
        };
      }
    });
    this.renderScoreBoard();
    this.saveScoreBoard();
  };
  showPictures = () => {
    this.setState((prevState) => {
      if (prevState.startRoll) {
        return {
          showPic: !prevState.showPic,
        };
      }
    });
  };

  startRoll = () => {
    this.setState((prevState) => {
      return {
        startRoll: true,
        showPic: true,
      };
    });
  };

  newGame = () => {
    this.setState((prevState) => {
      return {
        current1: 0,
        current2: 0,
        random1: 4,
        random2: 5,
        global1: 0,
        global2: 0,
        player1Active: true,
        player2Active: false,
        userInput: 100,
        winnerStatus: false,
        winnerMessage: false,
        doubleMessage: false,
        btnEnable: true,
        showPic: false,
        startRoll: false,
      };
    });
  };

  render() {
    return (
      <>
        <div className="mainBoard">
          <div className="scoreBoard">
            <h1>Winner Table</h1>
            <h1>Player1</h1>
            <p className="ply1High">{this.state.allWin1}</p>
            <h1>Player2</h1>
            <p className="ply2High">{this.state.allWin2}</p>
          </div>
          <PlayerPage
            playerNum="Player-1"
            totalScore={this.state.global1}
            currentScore={this.state.current1}
            isActive={this.state.player1Active}
          />
          <div className="middleBoard">
            <NewGameButton newGameText="🔄 New game" start={this.newGame} onStart={()=>this.newGame()}/>
            <DiceDisplay
              img1={this.state.random1}
              img2={this.state.random2}
              picEnable={this.state.showPic}
            />
            <DiceRoll
              rollResult={this.state.getRoll}
              double={this.state.checkDouble}
              text="🎲 Roll dice"
              btnStatus={this.state.btnEnable}
              startPlay={this.startRoll}
              picEnable={this.showPictures}
            />

            <DiceHold
              text="📥 Hold"
              activePlayer={this.state.changeActive}
              globalUpdate={this.state.changeGlobal}
              checkWinner={this.checkWinner}
              winner={this.endGame}
              btnStatus={this.state.btnEnable}
              picEnable={this.showPictures}
            />

            <UserInput
              takeInput={this.getInput}
              btnStatus={this.state.btnEnable}
              defultInput={this.state.userInput}
            />
          </div>
          <PlayerPage
            playerNum="Player-2"
            totalScore={this.state.global2}
            currentScore={this.state.current2}
            isActive={this.state.player2Active}
          />
        </div>

        <Messages
          text={`Congratulation Player${this.state.winnerStatus} Win!!!`}
          btnText="Start Again"
          messageActive={this.state.winnerMessage}
          start={this.newGame}
          id="winner"
        />
        <Messages
          text="You Got Double And Lost Temporary Score"
          btnText="Continue"
          messageActive={this.state.doubleMessage}
          continuePlay={this.handleMessageDouble}
          id="continue"
        />
      </>
    );
  }
}

export default MainBoard;
