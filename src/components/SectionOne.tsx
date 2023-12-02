import React, { useEffect, useState } from "react";
import CountdownBar from "./CountdownBar";
import { Question } from "./Question";
import { error } from "../App";

interface SectionOneProps {
  changeSection: () => void;
  updateScore: () => void;
  section: number;
  updateError: (section: number, errorList: error) => void;
}

export interface DataItem {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  type: string;
  img: string;
  categoryID: number;
}

const SectionOne: React.FC<SectionOneProps> = (props) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [num, setNum] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [answer, setAnswer] = useState<string>("");


  const incrementNum = () => {
    if (num < data.length - 1) {
      setNum(num + 1);
    } else {
      props.changeSection();
    }
  };

  const startNextQuestion = () => {
    if (answer === data[num].correctAnswer) {
      props.updateScore();
    }
    else {
      const error: error = {
        id: data[num].id,
        categoryID: data[num].categoryID,
      };
      props.updateError(props.section, error);
    }
    setTimeLeft(10);
    incrementNum();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/questions/sectionOne.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [num]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{display: "grid", gridTemplateRows: "1fr 10fr", height: "100%"}} key = {num}>
      <CountdownBar onComplete={startNextQuestion} timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      <Question question={data[num]} startNextQuestion={startNextQuestion} setAnswer={setAnswer} />
    </div>
  );
};

export interface QuestionProps {
  question: DataItem;
  startNextQuestion: () => void;
  setAnswer: (answer: string) => void;
}

export default SectionOne;