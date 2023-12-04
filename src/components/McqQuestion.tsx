import { useEffect, useRef } from "react";
import classes from "./McqQuestion.module.css";
import { McqProps } from "./SectionTwo";

export default function McqQuestion(props: McqProps) {
  const first = props.question.id === 1;
  const answerBoxRef = useRef<HTMLDivElement>(null);
  const isImage = props.question.img !== "";

  useEffect(() => {
    const setMaxHeight = () => {
      const answerBoxHeight = answerBoxRef.current?.offsetHeight || 0;
      const imgBox = document.querySelector(
        `.${classes.imgBox}`
      ) as HTMLDivElement | null;
      if (imgBox) {
        imgBox.style.maxHeight = `${answerBoxHeight * 0.7}px`;
      }
    };

    setMaxHeight();
  }, []);

  const setDims = () => {
    // set css of optionsBox to flex-direction: column
    const option = document.querySelector(
      `.${classes.answerBox}`
    ) as HTMLDivElement | null;
    const isMobile = window.innerWidth <= 600;

    if (option) {
      if (isMobile) {
        option.style.flexDirection = "column";
        option.style.width = "100%";
      } else {
        option.style.flexDirection = "column";
        option.style.width = "50%";
      }
    }
  };

  useEffect(() => {
    if (!isImage) {
      setDims();
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.questionBox}>{props.question.question}</div>
      <div className={classes.clear}></div>
      <div className={classes.answerBox} ref={answerBoxRef}>
        {isImage && (
          <div className={classes.imgBox}>
            <img
              className={classes.img}
              src={props.question.img}
              alt="image for question"
            />
          </div>
        )}
        <div className={classes.optionsBox}>
          {props.question.answers.map((option, index) => (
            <button
              className={`${classes.option} ${
                props.answer === option ? classes.active : ""
              }`}
              key={index}
              onClick={() => {
                props.updateAnswer(option);
              }}
            >
              {option}
            </button>
          ))}
          <div className={classes.btnBox}>
            {!first && (
              <button className={classes.btn} onClick={props.gotoPrev}>
                &lt; Previous One
              </button>
            )}
            <div className={classes.quesNum}>
              {props.question.id}/{props.totalQuestions}
            </div>
            <button className={classes.btn} onClick={props.gotoNext}>
              Next One &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
