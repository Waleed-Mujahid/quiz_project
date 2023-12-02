import React from "react";
import classes from "./Question.module.css";
import { QuestionProps } from "./SectionOne";
import { useEffect, useRef } from "react";

export const Question: React.FC<QuestionProps> = (props) => {

  const handleButtonClick = () => {
    props.startNextQuestion();
  };

  const answerBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to set max-height based on answerBox height
    const setMaxHeight = () => {
      const answerBoxHeight = answerBoxRef.current?.offsetHeight || 0;
      const imgBox = document.querySelector(`.${classes.imgBox}`) as HTMLDivElement | null;
      if (imgBox) {
        console.log(answerBoxHeight);
        imgBox.style.maxHeight = `${answerBoxHeight*0.7}px`;
      }
    };

    setMaxHeight();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.questionBox}>{props.question.question}</div>
      <div className={classes.clear}></div>
      <div className={classes.answerBox}  ref={answerBoxRef}>
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
