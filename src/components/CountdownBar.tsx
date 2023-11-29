import React, { useEffect } from "react";
import classes from "./CountdownBar.module.css";

interface CountdownBarProps {
  onComplete: () => void;
  timeLeft: number;
  setTimeLeft: (timeLeft: number) => void;
}

const CountdownBar: React.FC<CountdownBarProps> = ({
  onComplete,
  timeLeft,
  setTimeLeft,
}) => {
  let barColor = "#00ff00";
  let textColor = "#ffffff";

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const barWidth = (timeLeft / 9) * 100 + "%";
  if (timeLeft <= 5) {
    barColor = "#ffff00";
    textColor = "#ffff00";
  } else if (timeLeft <= 2) {
    barColor = "#ff0000";
    textColor = "#ff0000";
  }

  return (
    <div className={classes.container}>
      <div className={classes.timeLeft} style={{ color: textColor }}>
        00:0{timeLeft}s
      </div>
      <div
        className={classes.bar}
        style={{ width: barWidth, backgroundColor: barColor }}
      >&nbsp;&nbsp;</div>
    </div>
  );
};

export default CountdownBar;
