import React from "react";
import TotalCost from "./TotalCost";
import Keys from "./Keys";
import { useState, useEffect } from "react";

function TotalCostPage() {
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
      <div className="grid grid-cols-2 ">
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

export default TotalCostPage;
