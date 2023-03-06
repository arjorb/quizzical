import { useState, useEffect } from 'react';
import Question from './Question';
const Questions = () => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://opentdb.com/api.php?amount=5');
      const { results } = await res.json();
      console.log(results);
    };

    getData();
  }, []);
  return (
    <div>
      <Question />
    </div>
  );
};

export default Questions;
