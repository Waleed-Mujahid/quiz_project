import React, { useEffect, useState } from "react";
import CountdownBar from "./CountdownBar";
import { Question } from "./Question";

interface SectionOneProps {
  changeSection: () => void;
  updateScore: (score: number) => void;
}

interface DataItem {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
}

const SectionOne: React.FC<SectionOneProps> = (props) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [num, setNum] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(9);
  const [answer, setAnswer] = useState<string>("");


  const incrementNum = () => {
    if (num < data.length - 1) {
      setNum(num + 1);
    } else {
      props.updateScore(score);
      props.changeSection();
    }
  };

  const incScore = () => {
    setScore(score + 1);
  };

  const startNextQuestion = () => {
    if (answer === data[num].correctAnswer) {
      incScore();
      console.log(score);
    }
    setTimeLeft(9);
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
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CountdownBar onComplete={startNextQuestion} timeLeft = {timeLeft} setTimeLeft = {setTimeLeft} />
      <Question
        question={data[num]}
        startNextQuestion = {startNextQuestion}
        setAnswer = {setAnswer}
      />
    </>
  );
};

export interface QuestionProps {
  question: DataItem;
  startNextQuestion: () => void;
  setAnswer: (answer: string) => void;
}

export default SectionOne;
