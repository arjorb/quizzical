import Questions from './components/Questions';
import { useState } from 'react';
import Home from './components/Home';

const App = () => {
  const [start, setStart] = useState(false);
  const handleStart = () => {
    setStart(true);
  };
  return (
    <div className='bg-background max-h-fit bg-no-repeat bg-cover py-10 pl-40'>
      {!start ? <Home handleStart={handleStart} /> : <Questions />}
    </div>
  );
};

export default App;
