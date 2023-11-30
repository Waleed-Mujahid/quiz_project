import { useState } from 'react'
import LandingPage from './LandingPage'
import SectionOne from './components/SectionOne';
import SectionTwo from './components/SectionTwo';
import SectionThree from './components/SectionThree';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [sectionNumber, setSectionNumber] = useState(0);
  const [score, setScore] = useState(0);  

  const clickHandler = () => {
    setIsStarted(true);
    setSectionNumber(1);
  }

  const nextSection = () => {
    setSectionNumber(sectionNumber + 1);
  }

  if (!isStarted) {
    return <LandingPage startTest = {clickHandler} />
  }
  
  if (sectionNumber === 1) {
    return <SectionOne changeSection = {nextSection} updateScore = {setScore} />
  }
  

  if (sectionNumber === 2) {
    return <SectionTwo score = {score}/>
  }

  if (sectionNumber === 3) {
    return <SectionThree />
  }

}

export default App
