function Keys({ inputs, setInputs }) {
  return (
    <div className="rounded-md border-blue-500 border-2 p-2 mx-12 transform-gpu transition-all duration-200 ease-in-out">
      <h2 className="text-blue-500 font-bold border-b-2 border-blue-400">
        Api Keys
      </h2>
      {inputs.map((input, index) => (
        <div
          key={index}
          className="flex justify-between m-2 border-[1px] rounded-md border-slate-400"
        >
          <p className="text-slate-50 p-2">{input}</p>
          <button
            onClick={() => {
              setInputs(inputs.filter((_, i) => i !== index));
            }}
            className="rounded-md hover:shadow-lg hover:shadow-blue-500 transition-all duration-200 ease-in-out"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
export default Keys;
