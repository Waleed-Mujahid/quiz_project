import { useState, useEffect } from "react";
import classes from "./SectionTwo.module.css";
import { CountdownBar2 } from "./CountdownBar2";
import { StartSectionTwo } from "./StartSectionTwo";
import McqQuestion from "./McqQuestion";

interface SectionTwoProps {
  score: number;
}

interface DataItem {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  type: string;
}

export default function SectionTwo(props: SectionTwoProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [num, setNum] = useState<number>(0);
  const [data, setData] = useState<DataItem[]>([]);

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

  if (!isStarted) return <StartSectionTwo setIsStarted={setIsStarted} />;

  let component;
  if (data[num].type === "mcq")
    component = <McqQuestion question={data[num]} setNum={setNum} />;
  // else if (data[num].type === "tf")
  //   component = <TrueFalse data={data[num]} setNum={setNum} />;
  // else if (data[num].type === "sa")
  //   component = <ShortAnswer data={data[num]} setNum={setNum} />;

  return (
    <>
      <CountdownBar2 />
      {component}
    </>
  );
}

export interface McqProps {
  question: DataItem;
  setNum: (num: number) => void;
}
