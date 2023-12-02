import classes from "./InputQuestion.module.css";
import { McqProps } from "./SectionTwo";
import { useState } from "react";

export default function InputQuestion(props: McqProps) {
  const first = props.question.id === 1;
  const value = "Type your answer";
  const [input, setInput] = useState(`${props.answer ? props.answer : ""}`);

  const clickHandler = (selectedAnswer: string) => {
    const newAnswer = input + selectedAnswer;
    setInput(newAnswer);
    props.updateAnswer(newAnswer);
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
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
            alt="image for question"
          />
        </div>
        <div className={classes.optionsBox}>
          <div className={classes.value}>{input === "" ? value : input}</div>
          <div className={classes.gridContainer}>
            <button onClick={() => clickHandler('1')} className={classes.gridChild}>1</button>
            <button onClick={() => clickHandler('2')} className={classes.gridChild}>2</button>
            <button onClick={() => clickHandler('3')} className={classes.gridChild}>3</button>
            <button onClick={() => clickHandler('4')} className={classes.gridChild}>4</button>
            <button onClick={() => clickHandler('5')} className={classes.gridChild}>5</button>
            <button onClick={() => clickHandler('6')} className={classes.gridChild}>6</button>
            <button onClick={() => clickHandler('7')} className={classes.gridChild}>7</button>
            <button onClick={() => clickHandler('8')} className={classes.gridChild}>8</button>
            <button onClick={() => clickHandler('9')} className={classes.gridChild}>9</button>
            <button onClick={() => clickHandler('0')} className={classes.gridChild}>0</button>
            <button onClick={() => clickHandler(',')} className={classes.gridChild}>,</button>
            <button onClick={handleBackspace} className={classes.gridChild}>
            <img width="30" height="30" src="https://img.icons8.com/ios/50/clear-symbol--v1.png" alt="clear-symbol--v1"/>
            </button>
          </div>
          <div className={classes.btnBox}>
            {!first && (
              <button className={classes.btn} onClick={props.gotoPrev}>
                &lt; Previous One
              </button>
            )}
            <div className={classes.quesNum}>{props.question.id}/{props.totalQuestions}</div>
            <button className={classes.btn} onClick={props.gotoNext}>
              Next One &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
