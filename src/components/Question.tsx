import React from "react";
import classes from "./Question.module.css";
import { QuestionProps } from "./SectionOne";

export const Question: React.FC<QuestionProps> = (props) => {

  const handleButtonClick = () => {
    props.startNextQuestion();
  };

  return (
    <div className={classes.container}>
      <div className={classes.questionBox}>{props.question.question}</div>
      <div className={classes.clear}></div>
      <div className={classes.answerBox}>
        <div className={classes.imgBox}>
          <img
            className={classes.img}
            src={props.question.img}
            alt="image for question" />
        </div>
        <div className={classes.optionsBox}>
          {props.question.answers.map((option, index) => (
            <button
              className={classes.option}
              key={index}
              onClick={() => {props.setAnswer(option)}}
            >
              {option}
            </button>
          ))}
          <div className={classes.btnBox}>
            <div className={classes.quesNum}>{props.question.id}/25</div>
            <button className={classes.btn} onClick={handleButtonClick}>
              Next One &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
