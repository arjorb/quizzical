import { useState } from 'react';
import { nanoid } from 'nanoid';
const Question = ({ question, correct_answer, incorrect_answers }) => {
  const [response, setResponse] = useState([{ value: shuffledHandler() }]);

  function shuffledHandler() {
    const answers = [...[correct_answer], ...incorrect_answers];
    const shuffled = answers.sort(() => Math.random() - 0.5);
    const newArray = shuffled.map(item => {
      return {
        id: nanoid(),
        value: item,
        isSelected: false,
      };
    });
    return shuffled;
  }

  function selectResponse(id) {
    console.log(`cliked ${id}`);
  }

  const responseElement = response.map((response, index) => (
    <div
      className={`border-2 border-gray-200 px-5 rounded-full ${isSelected ? 'bg-green-400' : ''}`}
      onClick={() => selectResponse(index)}
    >
      {response}
    </div>
  ));

  return (
    <div className='mt-10 pb-3 border-b-2 w-9/12'>
      <h1 className='text-xl font-semibold' dangerouslySetInnerHTML={{ __html: question }} />
      <div className='flex gap-4 mt-2'>{responseElement}</div>
    </div>
  );
};

export default Question;
