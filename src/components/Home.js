const Home = ({ handleStart }) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen space-y-3'>
      <h1 className='text-3xl font-semibold '>Quizzical</h1>
      <p>Some description if needed</p>
      <div className='bg-indigo-400 py-2 px-7 text-white cursor-pointer rounded-sm' onClick={handleStart}>
        Start quiz
      </div>
    </div>
  );
};

export default Home;
