import { useEffect, useState } from "react";
import Keys from "./Keys";

import "./App.css";
import TotalCost from "./TotalCost";

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

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  return (
    <>
      <div className="grid grid-cols-2 align-middle max-w-[1920px] mx-auto max-h-screen mt-48">
        <TotalCost
          output={output}
          setOutput={setOutput}
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputs={inputs}
          setInputs={setInputs}
        />
        <Keys inputs={inputs} setInputs={setInputs} />
      </div>
    </>
  );
}

export default App;
