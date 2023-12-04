import React, { useEffect, useState } from "react";
import CountdownBar from "./CountdownBar";
import { Question } from "./Question";
import { error } from "../App";
import { category } from "../App";

interface SectionOneProps {
  changeSection: () => void;
  updateScore: () => void;
  section: number;
  updateError: (section: number, errorList: error) => void;
  totalQuestions: number;
  category: category[];
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
  const fetchData = async () => {
    try {
      const response = await fetch("/questions/sectionOne.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      setData(jsonData);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const setCategory = () => {
    for (let i = 0; i < data.length; i++) {
      props.category[data[i].categoryID - 1].total++;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCategory();
  }, [isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{display: "grid", gridTemplateRows: "1fr 10fr", height: "100%"}} key = {num}>
      <CountdownBar onComplete={startNextQuestion} timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      <Question question={data[num]} startNextQuestion={startNextQuestion} setAnswer={setAnswer} totalQuestions={props.totalQuestions}/>
    </div>
  );
};

export interface QuestionProps {
  question: DataItem;
  startNextQuestion: () => void;
  setAnswer: (answer: string) => void;
  totalQuestions: number;
}

export default SectionOne;