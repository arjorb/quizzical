import { useState, useEffect } from 'react';
import Question from './Question';

const Questions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getData() {
      const res = await fetch('https://opentdb.com/api.php?amount=5');
      const { results } = await res.json();
      const questions = results.map((question, index) => ({
        question: question.question,
        correct: question.correct_answer,
        incorrect: question.incorrect_answers,
        answers: shuffledHandler(question.correct_answer, question.incorrect_answers),
        id: index,
      }));
      setData(questions);
      setLoading(false);
    }
    getData();
  }, []);

  // Generate the random array for answers
  function shuffledHandler(correct, incorrect) {
    const answers = [...[correct], ...incorrect];
    const shuffled = answers.sort(() => Math.random() - 0.5);
    const newArray = shuffled.map(item => item);
    return newArray;
  }

  const [success, setSuccess] = useState(Array.from({ length: 5 }));

  const QuestionElement = data.map((question, index) => (
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
          <div className='flex flex-col justify-center items-center'>{QuestionElement}</div>
          {checked ? (
            <div className='flex items-center gap-16 max-w-96 mx-auto mt-5 pl-40'>
              <h1 className='font-bold text-xl leading-4'>
                <span>You scored </span>
                <span>
                  {success.filter(x => x).length}/{data.length}
                </span>
                <span> correct answers</span>
              </h1>
              <button
                onClick={() => window.location.reload(false)}
                className='text-white bg-indigo-500 rounded-md px-5 py-2'
              >
                Play again
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-16 max-w-96 mx-auto pl-40'>
              <button
                onClick={() => {
                  setChecked(true);
                }}
                className='text-white bg-indigo-500 mt-5 rounded-md px-5 py-2'
              >
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
