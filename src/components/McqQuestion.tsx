import classes from "./McqQuestion.module.css";
import { McqProps } from "./SectionTwo";

export default function McqQuestion(props: McqProps) {
  return (
    <div className={classes.container}>
      <div className={classes.questionBox}>{props.question.question}</div>
      <div className={classes.clear}></div>
      <div className={classes.answerBox}>
        <div className={classes.imgBox}>
          <img
            className={classes.img}
            src="pictures/question.png"
            alt="image for question"
          />
        </div>
        <div className={classes.optionsBox}>
          {props.question.answers.map((option, index) => (
            <button className={classes.option} key={index}>
              {option}
            </button>
          ))}
          <div className={classes.btnBox}>
            <button className={classes.btn}>&lt; Previous One</button>
            <div className={classes.quesNum}>{props.question.id}/25</div>
            <button className={classes.btn}>Next One &gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
