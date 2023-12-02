import { useState } from "react";
import LandingPage from "./LandingPage";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/SectionTwo";
import ShowScore from "./components/ShowScore";

export interface error {
  id: number,
  categoryID: number
}

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [sectionNumber, setSectionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [errorListOne, setErrorListOne] = useState<error[]>([]);
  const [errorListTwo, setErrorListTwo] = useState<error[]>([]);
  const [errorListThree, setErrorListThree] = useState<error[]>([]);

  const updateErrorList = (section: number, error: error) => {
    if (section === 1) {
      setErrorListOne((prevErrorList) => [...prevErrorList, error]);
    } else if (section === 2) {
      setErrorListTwo((prevErrorList) => [...prevErrorList, error]);
    } else {
      setErrorListThree((prevErrorList) => [...prevErrorList, error]);
    }
  };

  const pathTwo = "/questions/sectionTwo.json";
  const pathThree = "/questions/sectionThree.json";

  const clickHandler = () => {
    setIsStarted(true);
    setSectionNumber(3);
  };

  const incScore = () => {
    setScore(score + 1);
  };

  const updateScore = (newScore: number) => {
    setScore(score + newScore);
  };

  const nextSection = () => {
    setSectionNumber(sectionNumber + 1);
  };

  if (!isStarted) {
    return <LandingPage startTest={clickHandler} />;
  } else if (sectionNumber === 1) {
    return (
      <SectionOne
        changeSection={nextSection}
        updateScore={incScore}
        section={sectionNumber}
        updateError={updateErrorList}
      />
    );
  } else if (sectionNumber === 2 || sectionNumber === 3) {
    return (
      <SectionTwo
        key={sectionNumber}
        updateScore={updateScore}
        changeSection={nextSection}
        path={sectionNumber === 2 ? pathTwo : pathThree}
        totalTime={sectionNumber === 2 ? 480 : 960}
        section={sectionNumber}
        updateError={updateErrorList}
      />
    );
  }


  return (
    <ShowScore
      score={score}
      sectionOneErrors={errorListOne}
      sectionTwoErrors={errorListTwo}
      sectionThreeErrors={errorListThree}
    />
  );
}

export default App;

