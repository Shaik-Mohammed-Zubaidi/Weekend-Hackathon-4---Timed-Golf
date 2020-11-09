import React, { Component } from "react";
import "../styles/App.css";
class Timer extends Component {
  constructor(props) {
    super(props);
    this.tid = 0;
    this.state = { time: 0, x: 0, y: 0, gameStarted: false };
    this.moveTheBall = this.moveTheBall.bind(this);
    this.startGame = this.startGame.bind(this);
  }
  componentDidMount() {
    let start = document.createElement("button");
    start.onclick = this.startGame;
    start.className = "start";
    start.innerHTML = "Start";
    document.getElementsByTagName("body")[0].appendChild(start);

    document.getElementsByClassName("ball")[0].style = {
      left: this.state.x + "px",
      top: this.state.y + "px"
    };
  }
  componentDidUpdate() {
    if (this.state.x === 250 && this.state.y === 250) {
      clearInterval(this.tid);
      document.removeEventListener("keydown", this.moveTheBall);
    }
  }

  componentWillUnmount() {
    clearInterval(this.tid);
  }
  moveTheBall(event) {
    if (event.key === "ArrowDown" || event.keyCode === 40) {
      this.setState({ y: this.state.y + 5 });
    } else if (event.key === "ArrowUp" || event.keyCode === 38) {
      this.setState({ y: this.state.y - 5 });
    } else if (event.key === "ArrowRight" || event.keyCode === 39) {
      this.setState({ x: this.state.x + 5 });
    } else if (event.key === "ArrowLeft" || event.keyCode === 37) {
      this.setState({ x: this.state.x - 5 });
    }
  }
  startGame() {
    this.tid = setInterval(() => {
      let t = this.state.time;
      this.setState({ time: t + 1 });
    }, 1000);
    this.setState({ gameStarted: true });
    document.addEventListener("keydown", this.moveTheBall, false);
  }

  render() {
    return (
      <>
        <div
          className="ball"
          style={{ left: this.state.x + "px", top: this.state.y + "px" }}
        ></div>
        <div className="hole"></div>
        <div className="heading-timer">{this.state.time}</div>
        {/* <button className="start" onClick={this.startGame}>
          Start
        </button> */}
      </>
    );
  }
}

export default Timer;
