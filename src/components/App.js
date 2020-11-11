import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, x: 0, y: 0 ,isStarted:false};
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleArrowClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleArrowClick, false);
    clearInterval(this.interval);
  }
  
  startTimer(){
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        time: prevState.time + 1
      }));
    }, 1000);
   }
  

  handleArrowClick(event) {
    let {x,y} = this.state;
    if(!this.state.isStarted){
      return;
    }
    if(x === 250 && y === 250){
      clearInterval(this.interval);
      return;
    }
    if (event.keyCode === 39) {
      let nx = Number(x + 5);
      let ballPosition = {
        left: nx,
        top: y
      };
      this.setState({x:ballPosition.left,y:ballPosition.top});
    } 
    else if (event.keyCode === 40) {
      let ny = Number(y + 5);
      let ballPosition = {
        left:x,
        top: ny
      };
      this.setState({x:ballPosition.left,y:ballPosition.top});

    } else if (event.keyCode === 37) {
      let nx = Number(x - 5);
      let ballPosition = {
        left: nx,
        top: y
      };
      this.setState({x:ballPosition.left,y:ballPosition.top});
    } else if (event.keyCode === 38) {
      let ny = Number(y - 5);
      let ballPosition = {
        left:x,
        top: ny
      };
      this.setState({x:ballPosition.left,y:ballPosition.top});
    
   }
  }

  handleStartButtonClick(){
    if(!this.state.isStarted){
      this.setState({isStarted:true},()=>{
        this.startTimer();
      })
    }
  }



  render() {
    let ballPosition = {
        left:`${this.state.x}px`,
        top:`${this.state.y}px`,
    }
    return (
            <>
            <div className="ball" style={ballPosition}></div>;
            <button className="start" onClick={this.handleStartButtonClick}>
                 Start
           </button>
           <div className="heading-timer">{this.state.time}</div>
           <div className="hole"></div>
            </>
    );
  }
}

export default Timer;
