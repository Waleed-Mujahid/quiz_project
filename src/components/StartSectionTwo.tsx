import classes from "./StartSectionTwo.module.css";

interface StartSectionTwoProps {
  setIsStarted: (isStarted: boolean) => void;
}
export const StartSectionTwo = (props: StartSectionTwoProps) => {
  return (
    <div className={classes.textBox}>
      <div className={classes.heading}>Explanation of part of knowledge</div>
      <div className={classes.text}>
        In this part you will be asked 12 questions of which you must get at
        least 10 correct.
      </div>
      <div className={classes.text}>
        You will have a total of 8 minutes. You also have the option to browse
        through the questions.
      </div>
      <button
        className={classes.btn}
        onClick={() => {
          props.setIsStarted(true);
        }}
      >
        Start
      </button>
    </div>
  );
};
