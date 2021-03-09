import React, { Component } from 'react';
import Timer from './Timer';
import Button from './Button';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      interval: '',
      pomodoro: new Date(),
      title: 'Work',
      breakAudio: new Audio('https://vgmsite.com/soundtracks/super-mario-64-ost-super-mario-35th-anniversary-release/gfuqwunxjv/19%20Correct%20Solution.mp3'),
      workAudio: new Audio('https://vgmsite.com/soundtracks/animal-crossing-new-horizons-2020-switch-gamerip/dtyofndowu/3-01%20Main%20Theme%20-%20Welcome%20Horizons.mp3')
    }
  }

  componentDidMount(){
    this.changeMode('Work');
  }

  changeMode = (mode) => {
    clearInterval(this.state.interval);

      if(mode === 'Work') {        
        this.state.pomodoro.setSeconds(0);
        this.state.pomodoro.setMinutes(25);
        this.setState({pomodoro: this.state.pomodoro});
        this.setState({title: 'Work'});
      }

      else{        
        this.state.pomodoro.setSeconds(0);
        this.state.pomodoro.setMinutes(5);
        this.setState({pomodoro: this.state.pomodoro});
        this.setState({title: 'Break'});
      }

      return;
  }
  
  addMinute = () => {
    this.state.pomodoro.setMinutes(this.state.pomodoro.getMinutes()+1);
    this.setState({pomodoro: this.state.pomodoro});
  }
  
  removeMinute = () => {
    this.state.pomodoro.setMinutes(this.state.pomodoro.getMinutes()-1);
    this.setState({pomodoro: this.state.pomodoro});
  }
  
  startBtn = () => {

    clearInterval(this.state.interval);

    const id = setInterval(() => {
      if(this.state.title === "Break" && this.state.pomodoro.toLocaleTimeString([], {minute: '2-digit', second:'2-digit'}) === '01:00'){
      this.state.workAudio.play();
      }

    this.printTime();
    }, 1000) ;


    this.setState({interval: id});  
  }

  printTime = () => {
    if(this.state.pomodoro.toLocaleTimeString([], {minute: '2-digit', second:'2-digit'}) === '00:00'){
      this.stop();
    }
    else{
      this.state.pomodoro.setSeconds(this.state.pomodoro.getSeconds()-1);
      this.setState({pomodoro: this.state.pomodoro});
    }
  }

  stop = () => {
    clearInterval(this.state.interval);

    if(this.state.title === "Work"){
      this.state.breakAudio.play();
    }

    this.changeMode(this.state.title === 'Work' ? 'Break' : 'Work');
    this.startBtn();
  }
  
  resetBtn = () => {
    clearInterval(this.state.interval);
  
    if(this.state.title === 'Work'){
      this.changeMode('Work');
    }
    else{
      this.changeMode('Break');
    }
  }   

  render() {
    return (
      <div className="container">
        <div className="buttons">
          <Button func={this.changeMode} value="Work"/>
          <Button func={this.changeMode} value="Break"/>
        </div>
        <Timer title={this.state.title} addMinute={this.addMinute} removeMinute={this.removeMinute} pomodoro={this.state.pomodoro} />
        <div className="buttons">  
          <Button func={this.startBtn} value="Start"/>
          <Button func={this.resetBtn} value="Reset"/>
        </div>        
      </div>
    )
  }
}
