import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function TotalCost({
  output,
  setOutput,
  inputValue,
  setInputValue,
  inputs,
  setInputs,
}) {
  function handleSubmit() {
    const prefixedInputValue = "data." + inputValue;
    setInputs([...inputs, prefixedInputValue]);
    setInputValue("");
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(output);
  }
  return (
    <div className="grid grid-cols-1 w-full shadow-md shadow-black bg-slate-800 p-4 rounded-lg">
      <h1 className="text-3xl text-blue-500 font-bold text-center col-span-2 m-2">
        Total Cost
      </h1>
      <div className="mb-4 mx-12 w-full">
        <input
          id="textBox"
          type="text"
          placeholder="Input Api Key"
          className="rounded-md p-2 hover:shadow-lg hover:shadow-blue-500 transition-all duration-200 ease-in-out border-2 border-blue-500 text-blue-950"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
        />{" "}
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="col-span-2 rounded-md p-2 mx-12 transform-gpu transition-all duration-200 ease-in-out">
        <div className="rounded-lg shadow-md shadow-slate-600 max-h-72 overflow-auto">
          <SyntaxHighlighter language="javascript" style={dracula}>
            {output}
          </SyntaxHighlighter>
        </div>
        <button onClick={copyToClipboard} className="mt-4">
          Copy
        </button>
        <textarea
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          className="w-full h-48 rounded-lg p-2 border-2 border-gray-300 resize-none mt-4 bg-neutral-800 text-white"
          autoCorrect="false"
        />
      </div>
    </div>
  );
}

export default TotalCost;
