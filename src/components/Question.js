import { useState } from 'react';

const Question = ({ question, answers, correct, id, checked, setSuccess }) => {
  const [submitted, setSubmitted] = useState(null);

  const responseElement = answers.map((response, index) => (
    <div
      key={index}
      className={`border whitespace-nowrap border-primary-100  rounded-lg px-2 py-1 ${
        submitted === index && !checked && 'bg-indigo-200'
      } ${response === correct && checked && 'bg-green-300'} ${
        submitted === index && correct !== response && checked && 'bg-red-100'
      } `}
    >
      <button
        disabled={checked}
        onClick={() => {
          setSubmitted(index);
          setSuccess(prev => {
            prev[id] = response === correct;
            return prev;
          });
        }}
      >
        {response}
      </button>
    </div>
  ));

  return (
    <div className='pt-10 pb-3 border-b-2 w-9/12'>
      <h1 className='text-xl font-semibold' dangerouslySetInnerHTML={{ __html: question }} />
      <div className='flex gap-4 mt-2'>{responseElement}</div>
    </div>
  );
};

export default Question;
