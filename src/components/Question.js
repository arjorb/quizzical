import { useState } from 'react';
const Question = ({ question, correct_answer, incorrect_answers }) => {
  const [response, setResponse] = useState(shuffledHandler());

  function shuffledHandler() {
    const answers = [...[correct_answer], ...incorrect_answers];
    const shuffled = answers.sort(() => Math.random() - 0.5);
    return shuffled;
  }

  const responseElement = response.map(response => (
    <div className='border-2 border-gray-200 px-5 rounded-full'>{response}</div>
  ));

  return (
    <div className='mt-10 pb-3 border-b-2 w-9/12'>
      <h1 className='text-2xl'>{question}</h1>
      <div className='flex gap-4 mt-2'>{responseElement}</div>
    </div>
  );
};

export default Question;
