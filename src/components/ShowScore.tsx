import classes from "./ShowScore.module.css";
import CircularChart from "./CircularChart";

interface ShowScoreProps {
  score: number;
}

export default function ShowScore(props: ShowScoreProps) {
  const percentage = (props.score / 65) * 100;
  const msg = percentage > 70 ? "Congratulations!" : "Unfortunately";
  const subMmsg = percentage > 70 ? "You passed the exam" : "You failed the exam";
  const color = percentage > 70 ? `rgb(5,255,5)` : `rgb(255,100,100)`;

  return (
    <div className={classes.outerBox}>
      <div className={classes.subHeading}>Free practice Exam</div>
      <div className={classes.container}>
        <div className={classes.subHeading2}> Your Result </div>
        <div className={classes.result}>
          <CircularChart percentage={percentage} />
          <div className={classes.score}>
            <div className={classes.msg} style = {{color: color}} >{msg}</div>
            <div className={classes.subMsg}>{subMmsg}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


