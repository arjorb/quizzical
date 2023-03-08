import { useState } from 'react';

const Question = ({ question, answers, selected }) => {
  const responseElement = answers.map((response, index) => (
    <div key={index} className={`border-2 border-gray-200 px-5 rounded-full cursor-pointer`}>
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
