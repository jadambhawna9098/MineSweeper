import React, { useEffect, useState } from "react";
import "./TimerStyles.css";
import timeUtils from "../../utils/TimeUtils";

const Timer = ({ stage }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timerID;
    if (stage === "init") {
      setSeconds(0);
    }

    if (stage === "playing") {
      timerID = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerID);
    };
  }, [stage]);

  return (
    <div className="control-panel__timer">
      {timeUtils.secondsToMinutes(seconds)}
    </div>
  );
};

export default Timer;
