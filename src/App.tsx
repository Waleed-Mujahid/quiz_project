import { useState } from "react";
import LandingPage from "./LandingPage";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/SectionTwo";
import ShowScore from "./components/ShowScore";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [sectionNumber, setSectionNumber] = useState(0);
  const [score, setScore] = useState(0);

  const pathTwo = "/questions/sectionTwo.json";
  const pathThree = "/questions/sectionThree.json";

  const clickHandler = () => {
    setIsStarted(true);
    setSectionNumber(4);
  };

  const incScore = () => {
    setScore(score + 1);
  }

  const updateScore = (newScore: number) => {
    setScore(score + newScore);
  };

  const nextSection = () => {
    setSectionNumber(sectionNumber + 1);
  };

  if (!isStarted) {
    return <LandingPage startTest={clickHandler} />;
  } else if (sectionNumber === 1) {
    return <SectionOne changeSection={nextSection} updateScore={incScore} />;
  } else if (sectionNumber === 2 || sectionNumber === 3) {
    return (
      <SectionTwo
        key={sectionNumber} // Set a unique key to force re-render
        updateScore={updateScore}
        changeSection={nextSection}
        path={sectionNumber === 2 ? pathTwo : pathThree}
        totalTime={sectionNumber === 2 ? 480 : 960}
      />
    );
  }

  return <ShowScore score = {score} />
}

export default App;