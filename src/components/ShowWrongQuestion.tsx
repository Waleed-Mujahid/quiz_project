import { DataItem } from "./SectionOne";
import { useEffect, useState } from "react";
import classes from "./ShowWrongQuestion.module.css";

interface Props {
  section: string;
  id: number;
}

export default function ShowWrongQuestion(props: Props) {
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/questions/sectionOne.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const selected = jsonData.filter(
          (item: DataItem) => item.id === props.id
        );
        if (selected.length > 0) {
          setShow(true);
          setCorrectAnswer(selected[0].correctAnswer);
          setQuestion(selected[0].question);
          setImg(selected[0].img);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!show) return <div></div>;

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={img} alt="" />
      </div>
      <div className={classes.box}>
        <div className={classes.question}>Question: {question}</div>
        <div className={classes.answer}>Correct Answer: {correctAnswer}</div>
      </div>
    </div>
  );
}
