import { useState, useEffect } from 'react';
import Question from './Question';
const Questions = () => {
  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://opentdb.com/api.php?amount=5');
      const { results } = await res.json();
      setQuestion(results);
    };

    getData();
  }, []);

  const QuestionElement = questions.map((question, index) => <Question key={index} {...question} />);
  return (
    <div>
      <div>{QuestionElement}</div>
      <div className='mt-10 bg-indigo-400 py-3 px-7 w-max rounded-md cursor-pointer text-white font-semibold'>
        Check Answer
      </div>
    </div>
  );
};

export default Questions;
