import { useState, useEffect } from 'react';
// import { nanoid } from 'nanoid';
import Question from './Question';
const Questions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [response, setResponse] = useState(shuffledHandler());
  // const [currentSelect, setCurrentSelect] = useState();

  // variables

  // fetching the data from the api

  useEffect(() => {
    async function getData() {
      const res = await fetch('https://opentdb.com/api.php?amount=5');
      const { results } = await res.json();
      setData(results);
    }
    getData();
  }, []);

  console.log(data);
  const QuestionElement = data.map((question, index) => <Question key={index} {...data} />);

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
