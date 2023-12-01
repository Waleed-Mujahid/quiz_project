import classes from "./StartSectionTwo.module.css";

interface StartSectionThreeProps {
  setIsStarted: (isStarted: boolean) => void;
}
export const StartSectionThree = (props: StartSectionThreeProps) => {
  return (
    <div className={classes.textBox}>
      <div className={classes.heading}>Explanation of the insight part</div>
      <div className={classes.text}>
      In this part you will be asked 28 questions, of which you must get at least 25 correct.
      </div>
      <div className={classes.text}>
      You will have a total of 16 minutes. Here you also have the option to browse through the questions.
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

export default StartSectionThree;

