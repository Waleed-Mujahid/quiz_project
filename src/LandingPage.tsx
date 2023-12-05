import classes from "./LandingPage.module.css";

interface LandingPageProps {
  startTest: () => void;
}

export default function LandingPage(props: LandingPageProps) {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>Explanation of theory Exam</div>
      <div className={classes.pageText}>
        Welcome to the practice exam for driving license B. The exam consists of
        three parts: <br/>
        hazard perception, knowledge and insight.
      </div>
      <div className={classes.pageText}>
        To pass, you must obtain a passing grade for all three components
        separately. Afterwards you will immediately see whether you have passed
        or failed.
      </div>
      <div className={classes.pageText}>
        You will first be asked 25 hazard perception questions and you only have
        8 seconds to answer each question. You must answer at least 13 questions
        correctly in this part. With every question you are always given the
        choice of what to do in a situation: brake, release the accelerator or
        nothing.
        <br />
         Good luck!
      </div>
      <button className={classes.btn} onClick = {props.startTest}>Start Test</button>
    </div>
  );
}
