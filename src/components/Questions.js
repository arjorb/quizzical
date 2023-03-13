import { useState, useEffect } from 'react';
import Question from './Question';

const Questions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [success, setSuccess] = useState(Array.from({ length: 5 }));

  const getData = async () => {
    setLoading(true);
    const res = await fetch('https://opentdb.com/api.php?amount=5');
    const { results } = await res.json();
    const questions = results.map((question, index) => ({
      question: question.question,
      correct: question.correct_answer,
      answers: shuffledHandler(question.correct_answer, question.incorrect_answers),
      id: index,
    }));
    setData(questions);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const shuffledHandler = (correct, incorrect) => {
    const answers = [...[correct], ...incorrect];
    const shuffled = answers.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  const resetHandler = () => {
    getData();
    setChecked(false);
  };

  const questionElement = data.map((question, index) => (
    <Question key={index} {...question} checked={checked} setSuccess={setSuccess} />
  ));

  return (
    <div>
      {loading ? (
        <div className='flex justify-center'>
          <img src='loader.svg' alt='loading...' />
        </div>
      ) : (
        <div>
          <div className='flex flex-col justify-center items-center'>{questionElement}</div>
          {checked ? (
            <div className='flex items-center gap-16 max-w-96 mx-auto mt-5 pl-40'>
              <h1 className='font-bold text-xl leading-4'>
                <p>
                  You scored {success.filter(x => x).length}/{data.length} correct answers
                </p>
              </h1>
              <button onClick={resetHandler} className='text-white bg-indigo-500 rounded-md px-5 py-2'>
                Play again
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-16 max-w-96 mx-auto pl-40'>
              <button onClick={() => setChecked(true)} className='text-white bg-indigo-500 mt-5 rounded-md px-5 py-2'>
                Check answers
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
