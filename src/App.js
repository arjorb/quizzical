import Questions from './components/Questions';
import { useState } from 'react';
import Home from './components/Home';

const App = () => {
  const [start, setStart] = useState(false);
  const handleStart = () => {
    setStart(true);
  };
  return (
    <div className='bg-background min-h-screen bg-no-repeat bg-cover'>
      {!start ? <Home handleStart={handleStart} /> : <Questions />}
    </div>
  );
};

export default App;
