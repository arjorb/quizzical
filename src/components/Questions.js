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
    <Question
      key={index}
      question={question.question}
      answers={question.answers}
      correct={question.correct}
      id={question.id}
      checked={checked}
      setSuccess={setSuccess}
    />
  ));

  return (
    <div>
      {loading ? (
        <div className='flex justify-center'>
          <img src='loader.svg' alt='loading...' />
        </div>
      ) : (
        <div>
          <div>{QuestionElement}</div>
          {checked ? (
            <div className='flex items-center gap-16 max-w-96 mx-auto'>
              <h1 className='text-primary-100 font-bold text-xl leading-4'>
                <span>You scored</span>
                <span>
                  {success.filter(x => x).length}/{data.length}
                </span>
                <span>correct answers</span>
              </h1>
              <button
                onClick={() => window.location.reload(false)}
                className='text-white bg-primary-200 rounded-xl lg:px-2 py-1'
              >
                Play again
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-16 max-w-96 mx-auto'>
              <button
                onClick={() => {
                  setChecked(true);
                }}
                className='text-white bg-primary-200 rounded-xl px-2 py-1'
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
