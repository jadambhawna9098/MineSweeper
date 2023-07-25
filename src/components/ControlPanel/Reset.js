import React from "react";
import "./ResetStyles.css";

function Reset(props) {
    let button = {
        init: "Start",
        playing: "Continue",
        ended: "End",
        won: "You Won",
    };
    return (
        <div className='control-panel__button-reset' onClick={props.callback}>
            {button[props.stage]}
        </div>
    );
}

export default Reset;
