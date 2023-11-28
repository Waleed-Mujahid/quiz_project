import { useState } from 'react'
import LandingPage from './LandingPage'

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const clickHandler = () => {
    setIsStarted(true);
  }

  if (!isStarted) {
    return <LandingPage startTest = {clickHandler} />
  }
  
  return (
    <div>
      <h1>Test started</h1>
    </div>
  )
}

export default App
