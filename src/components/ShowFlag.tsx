import classes from "./ShowFlag.module.css";

interface ShowFlagProps {
  isAnswered: string[];
  flagged: boolean[];
  gotoQuestion: (index: number) => void;
  setShowFlagged: (showFlagged: boolean) => void;
}



export default function ShowFlag(props: ShowFlagProps) {
  const clickHandler = (index: number) => {
    props.gotoQuestion(index-1);
    props.setShowFlagged(false);
  }

  return (
    <div className={classes.container}>
      <div className={classes.heading}>Overview</div>
      <div className={classes.text}>
        Use this overview to quickly jump to a question. By selecting a box, you
        go directly to that question.
      </div>
      <div className={classes.legend}>
        <div>⬛ Answered</div>
        <div>⬜ Unanswered</div>
        <div>⭐ Flagged</div>
      </div>

      <div className={classes.boxContainer}>
        {props.isAnswered.map((answered, index) => (
          <div
            key={index}
            onClick = {() => {clickHandler(index+1)}}
            className={`${classes.box} ${answered ? classes.answered : ""} ${
              props.flagged[index] ? classes.flagged : ""
            }`}
          >
            {index + 1}
            {props.flagged[index] && <span className={classes.star}>★</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
