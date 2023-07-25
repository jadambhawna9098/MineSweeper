import React from "react";
import "./FlagsCounterStyle.css";

function FlagsCounter(props) {
    return <div className='control-panel__counter'> FLAGS :-{props.flags}</div>;
}

export default FlagsCounter;
    