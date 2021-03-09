import React from 'react';

export default function Timer(props) {

  return (
    <div className="timer">
      <div className="timer__title">{props.title}</div>
      <div className="timer__container">
        <button className="timer__btn" onClick={props.addMinute}>+</button>
        <div className="timer__time">{props.pomodoro.toLocaleTimeString([], {minute: '2-digit', second:'2-digit'})}</div>
        <button className="timer__btn" onClick={props.removeMinute}>-</button>
      </div>
    </div>
  )
}
