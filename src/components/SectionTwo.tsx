import { useState, useEffect } from "react";
import CountdownBarSecond from "./CountdownBarSecond";
import StartSectionTwo from "./StartSectionTwo";
import StartSectionThree from "./StartSectionThree";
import McqQuestion from "./McqQuestion";
import ShowFlag from "./ShowFlag";
import Overview from "./Overview";
import InputQuestion from "./InputQuestion";
import ImageQuestion from "./ImageQuestion";
import { error } from "../App";

interface SectionTwoProps {
  updateScore: (newScore: number) => void;
  changeSection: () => void;
  path: string;
  totalTime: number;
  section: number;
  updateError: (section: number, errorList: error) => void;
  totalQuestions: number;
}

interface DataItem {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  type: string;
  img: string;
  optionImages: string[];
  categoryID: number;
}

export default function SectionTwo(props: SectionTwoProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [num, setNum] = useState<number>(0);
  const [data, setData] = useState<DataItem[]>([]);
  const [isAnswered, setIsAnswered] = useState<string[]>([]);
  const [flagged, setFlagged] = useState<boolean[]>([]);
  const [showFlagged, setShowFlagged] = useState<boolean>(false);
  const [showOverview, setShowOverview] = useState<boolean>(false);
  const [gotoNextSection, setGotoNextSection] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch(props.path);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      setData(jsonData);
      setFlagged(Array(jsonData.length).fill(false));
      setIsAnswered(Array(jsonData.length).fill(""));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const incNum = () => {
    if (num < data.length - 1) {
      setNum(num + 1);
    } else {
      setShowOverview(true);
    }
  };

  const calcScore = () => {
    let score = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].correctAnswer === isAnswered[i]) {
        score++;
      } else {
        const error: error = {
          id: data[i].id,
          categoryID: data[i].categoryID,
        };
        props.updateError(props.section, error);
      }
    }
    props.updateScore(score);
  };

  useEffect(() => {
    if (gotoNextSection) {
      calcScore();
      props.changeSection();
    }
  }, [gotoNextSection]);

  const decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  };

  const updateAnswer = (answer: string) => {
    const newIsAnswered = [...isAnswered];
    newIsAnswered[num] = answer;
    setIsAnswered(newIsAnswered);
  };

  const toggleFlagged = () => {
    const newFlagged = [...flagged];
    newFlagged[num] = !newFlagged[num];
    setFlagged(newFlagged);
  };

  const toggleShowFlagged = () => {
    setShowFlagged(!showFlagged);
  };

  if (!isStarted) {
    if (props.path === "/questions/sectionTwo.json")
      return <StartSectionTwo setIsStarted={setIsStarted} />;
    else return <StartSectionThree setIsStarted={setIsStarted} />;
  }

  let component;
  if (showFlagged) {
    component = (
      <ShowFlag
        isAnswered={isAnswered}
        flagged={flagged}
        gotoQuestion={setNum}
        setShowFlagged={setShowFlagged}
      />
    );
  } else if (data[num].type === "mcq")
    component = (
      <McqQuestion
        question={data[num]}
        gotoNext={incNum}
        gotoPrev={decNum}
        updateAnswer={updateAnswer}
        answer={isAnswered[num]}
        totalQuestions={props.totalQuestions}
      />
    );
  else if (data[num].type === "input")
    component = (
      <InputQuestion
        question={data[num]}
        gotoNext={incNum}
        gotoPrev={decNum}
        updateAnswer={updateAnswer}
        answer={isAnswered[num]}
        totalQuestions={props.totalQuestions}
      />
    );
  else if (data[num].type === "image")
    component = (
      <ImageQuestion
        question={data[num]}
        gotoNext={incNum}
        gotoPrev={decNum}
        updateAnswer={updateAnswer}
        answer={isAnswered[num]}
        totalQuestions={props.totalQuestions}
      />
    );
  else {
    return <div>Something went wrong</div>;
  }

  return (
    <div style={{display: "grid", gridTemplateRows: "1fr 10fr", height: "100%", boxSizing: "border-box"}}>
      <CountdownBarSecond
        flagQuestion={toggleFlagged}
        flag={flagged[num]}
        toggleShowFlagged={toggleShowFlagged}
        stopClick={showFlagged}
        setGotoNextSection={setGotoNextSection}
        totalTime={props.totalTime}
      />
      {component}
      {showOverview && (
        <Overview
          toggleHide={setShowOverview}
          setGotoNext={setGotoNextSection}
        />
      )}
    </div>
  );
}

export interface McqProps {
  question: DataItem;
  gotoNext: () => void;
  gotoPrev: () => void;
  updateAnswer: (answer: string) => void;
  answer: string;
  totalQuestions: number;
}
