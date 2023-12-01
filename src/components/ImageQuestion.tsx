import classes from "./ImageQuestion.module.css";
import { McqProps } from "./SectionTwo";

export default function ImageQuestion(props: McqProps) {
  const first = props.question.id == "1";

  return (
    <div className={classes.container}>
      <div className={classes.questionBox}>{props.question.question}</div>
      <div className={classes.clear}></div>
      <div className={classes.answerBox}>
        <div className={classes.box}>
          {props.question.optionImages.map((option, index) => (
            <button className={`${classes.option} ${props.answer === option ? classes.active : ''}`}
              key={index}
              onClick={() => {props.updateAnswer(option)}} > 
              <img
                className={classes.img}
                src={option}
                alt="image for question" />
            </button>
          ))}
        </div>
        <div className={classes.optionsBox}>
          <div className={classes.btnBox}>
            {!first && <button className={classes.btn}  onClick={props.gotoPrev} >&lt; Previous One</button>}
            <div className={classes.quesNum}>{props.question.id}/25</div>
            <button className={classes.btn} onClick={props.gotoNext} >Next One &gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
