import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Question from './Question';

const Questions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetching the data from the api
  useEffect(() => {
    setLoading(true);
    async function getData() {
      const res = await fetch('https://opentdb.com/api.php?amount=5');
      const { results } = await res.json();
      const questions = results.map(question => ({
        question: question.question,
        correct: question.correct_answer,
        incorrect: question.incorrect_answers,
        answers: shuffledHandler(question.correct_answer, question.incorrect_answers),
        id: nanoid(),
        isSelected: false,
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

  const QuestionElement = data.map((question, index) => <Question key={index} {...question} />);

  return (
    <div>
      {loading ? (
        <div className='flex justify-center'>
          <img src='loader.svg' alt='loading...' />
        </div>
      ) : (
        <div>
          <div>{QuestionElement}</div>
          <div className='mt-10 bg-indigo-400 py-3 px-7 w-max rounded-md cursor-pointer text-white font-semibold'>
            Check Answer
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
