import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Keys from "./Keys";

import "./App.css";

function App() {
  const [output, setOutput] = useState("");
  const [inputs, setInputs] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function totalCost(values) {
    let output = "let cost = 0;\n";

    values.forEach((input) => {
      output += `if (${input} !== undefined || ${input} !== null || ${input} !== "") {
          cost += ${input};
      }\n`;
    });

    output += "value = cost;";

    return output;
  }

  useEffect(() => {
    setOutput(totalCost(inputs));
  }, [inputs]);

  function handleSubmit() {
    const prefixedInputValue = "data." + inputValue;
    setInputs([...inputs, prefixedInputValue]);
    setInputValue("");
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(output);
  }

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="mb-4 mx-12 w-full">
            <input
              id="textBox"
              type="text"
              placeholder="Input Api Key"
              className="rounded-md p-2 hover:shadow-lg hover:shadow-blue-500 transition-all duration-200 ease-in-out hover:-translate-y-1 border-2 border-blue-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
            />{" "}
            <button
              onClick={handleSubmit}
              className="rounded-md hover:shadow-lg hover:shadow-blue-500 transition-all duration-200 ease-in-out hover:-translate-y-1"
            >
              Submit
            </button>
          </div>
          <div className="col-span-2 rounded-md p-2 mx-12 transform-gpu transition-all duration-200 ease-in-out">
            <div className="rounded-lg shadow-md shadow-slate-600">
              <SyntaxHighlighter language="javascript" style={dracula}>
                {output}
              </SyntaxHighlighter>
            </div>
            <button
              onClick={copyToClipboard}
              className="rounded-md hover:shadow-lg hover:shadow-blue-500 transition-all duration-200 ease-in-out hover:-translate-y-[2px] self-center mt-4"
            >
              Copy
            </button>
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full h-48 rounded-lg p-2 border-2 border-gray-300 resize-none mt-4"
            />
          </div>
        </div>
        <Keys inputs={inputs} setInputs={setInputs} />
      </div>
    </>
  );
}

export default App;
