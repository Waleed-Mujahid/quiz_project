import { useState, useEffect } from "react";
import classes from "./CountdownBar2.module.css";

interface CountdownBar2Props {
  flagQuestion: () => void;
  flag: boolean;
  toggleShowFlagged: () => void;
  stopClick: boolean;
  setGotoNextSection: (gotoNextSection: boolean) => void;
  totalTime: number;
}

export const CountdownBar2 = (props: CountdownBar2Props) => {
  const barColor = "#00ff00";
  const textColor = "#ffffff";
  const totalTimeInSeconds = props.totalTime;
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
        props.setGotoNextSection(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const barWidth = (timeLeft / totalTimeInSeconds) * 100 + "%";

  return (
    <div className={classes.container}>
      <div className={classes.barContainer}>
        <div className={classes.timeLeft} style={{ color: textColor }}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div
          className={classes.bar}
          style={{ width: barWidth, backgroundColor: barColor }}
        >
          &nbsp;&nbsp;
        </div>
      </div>
      <div className={classes.icons}>
        <button className={classes.symbol} onClick={props.flagQuestion} disabled = {props.stopClick} >
          <svg
            viewBox="0 0 1792 1792"
            className={classes.flag}
            fill = {props.flag ? "yellow" : "currentColor"}
          >
            <path d="M320 256q0 72-64 110v1266q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-1266q-64-38-64-110 0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zM1792 320v763q0 25-12.5 38.5t-39.5 27.5q-215 116-369 116-61 0-123.5-22t-108.5-48-115.5-48-142.5-22q-192 0-464 146-17 9-33 9-26 0-45-19t-19-45v-742q0-32 31-55 21-14 79-43 236-120 421-120 107 0 200 29t219 88q38 19 88 19 54 0 117.5-21t110-47 88-47 54.5-21q26 0 45 19t19 45z"></path>
          </svg>
        </button>
        <button className={classes.symbol} onClick={props.toggleShowFlagged} >
          <svg
            fill="currentColor"
            viewBox="0 0 1792 1792"
            className={classes.viewFlagged}
          >
            <path d="M512 1248v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zM512 736v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zM1152 1248v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zM512 224v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zM1152 736v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zM1792 1248v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zM1152 224v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zM1792 736v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zM1792 224v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
