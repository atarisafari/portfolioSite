import React, {useState, useEffect} from 'react';

const CONSTANTS = {
    DELETING_SPEED: 30,
    TYPING_SPEED: 150,
}
  
function Typer({ messages, heading }) {
    const [state, setState] = useState({
      text: "",
      message: "",
      isDeleting: false,
      loopNum: 0,
      typingSpeed: CONSTANTS.TYPING_SPEED,
    });
  
    useEffect(() => {
      let timer = "";
      const handleType = () => {
        setState(cs => ({
          ...cs, // cs means currentState
          text: getCurrentText(cs),
          typingSpeed: getTypingSpeed(cs)
        }));
        timer = setTimeout(handleType, state.typingSpeed);
      };
      handleType();
      return () => clearTimeout(timer);
    }, [state.isDeleting, state.typingSpeed]);
  
    useEffect(() => {
      if (!state.isDeleting && state.text === state.message) {
        setTimeout(() => {
          setState(cs => ({
            ...cs,
            isDeleting: true
          }))
        }, 500);
      } else if (state.isDeleting && state.text === "") {
        setState(cs => ({
          ...cs, // cs means currentState
          isDeleting: false,
          loopNum: cs.loopNum + 1,
          message: getMessage(cs, messages)
        }));
      }
    }, [state.text, state.message, state.isDeleting, messages]);
  
    function getCurrentText(currentState) {
      return currentState.isDeleting
        ? currentState.message.substring(0, currentState.text.length - 1)
        : currentState.message.substring(0, currentState.text.length + 1);
    }
  
    function getMessage(currentState, data) {
      return data[Number(currentState.loopNum) % Number(data.length)];
    }
  
    function getTypingSpeed(currentState) {
      return currentState.isDeleting
        ? CONSTANTS.TYPING_SPEED
        : CONSTANTS.DELETING_SPEED;
    }
    
    //Returning text and blinking cursor
    return (
      <h1>
        <div id="textBox">
          {heading}&nbsp;
            <span>{state.text}</span>
          <span id="cursor" />
        </div>
      </h1>
    );
}

export default Typer