import React, { useState } from "react";
import jsonData from "./components.json";
import fieldJson from "./fields.json";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function ComponentPage() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [inputValue, setInputValue] = useState({ name: "", amount: "" });
  const [required, setRequired] = useState(false);
  const [addedFees, setAddedFees] = useState([]);

  function handleCopyComponent(index) {
    const componentToCopy = jsonData[index].component;
    navigator.clipboard.writeText(JSON.stringify(componentToCopy, null, 2));
    setCopiedIndex(index);
  }

  function handleCopyField(index) {
    navigator.clipboard.writeText(
      JSON.stringify(selectedField.component, null, 2)
    );
    setCopiedIndex(index + jsonData.length);
  }

  function handleCopyPreview() {
    if (selectedComponent) {
      handleCopyComponent(jsonData.indexOf(selectedComponent));
    } else if (selectedField) {
      handleCopyField(selectedField);
    }
  }

  function handleCopyWithFees() {
    const updatedComponent = { ...selectedComponent };

    addedFees.forEach(({ name, amount }) => {
      const newFee = {
        label: name,
        applyMaskOn: "change",
        mask: false,
        spellcheck: true,
        disabled: true,
        tableView: false,
        currency: "USD",
        inputFormat: "plain",
        truncateMultipleSpaces: false,
        clearOnHide: false,
        key: name
          .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          })
          .replace(/\s+/g, ""),
        type: "currency",
        input: true,
        delimiter: true,
        defaultValue: parseInt(amount),
      };

      updatedComponent.component.components[0].columns.push({
        components: [newFee],
        width: 4,
        offset: 0,
        push: 0,
        pull: 0,
        size: "md",
        currentWidth: 4,
      });
    });

    navigator.clipboard.writeText(
      JSON.stringify(updatedComponent.component, null, 2)
    );

    setCopiedIndex(null);
  }

  function handleSubmit(input) {
    if (selectedField) {
      const updatedField = { ...selectedField };
      let camelCase = input
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
      updatedField.component.key = camelCase;
      updatedField.component.label = input;
      setSelectedField(updatedField);
    }
  }

  function handleRequired(field) {
    const updatedField = { ...field };

    if (!updatedField.component.validate) {
      updatedField.component.validate = { required: true };
    } else {
      updatedField.component.validate.required =
        !updatedField.component.validate.required;
    }

    setSelectedField(updatedField);
  }

  function handleAddFee(name, amount) {
    const newFee = {
      name,
      amount,
    };

    setAddedFees([...addedFees, newFee]);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mx-12">
      <div className="shadow-lg shadow-black mr-12 px-4 py-2 bg-slate-950 rounded-lg">
        <h1>Component List</h1>
        <ul>
          {jsonData.map((component, index) => (
            <li key={index} className="p-2 m-2 border-b-2 border-blue-900">
              <h2 className="underline">{component.title}</h2>
              <p>{component.description}</p>
              <button
                className="mr-2"
                onClick={() => {
                  setSelectedComponent(component);
                  setSelectedField(null);
                  setCopiedIndex(null);
                }}
              >
                View
              </button>
              <button
                onClick={() => handleCopyComponent(index)}
                disabled={copiedIndex === index}
                className={
                  copiedIndex === index
                    ? "bg-green-600"
                    : "disabled:bg-green-600"
                }
              >
                {copiedIndex === index ? "Copied \u2713" : "Copy"}
              </button>
            </li>
          ))}
        </ul>
        <h1>Field List</h1>
        <ul>
          {fieldJson.map((field, index) => (
            <li key={index} className="p-2 m-2 border-b-2 border-blue-900">
              <h2 className="underline">{field.title}</h2>
              <p>{field.description}</p>
              <button
                className="mr-2"
                onClick={() => {
                  setSelectedField(field);
                  setSelectedComponent(null);
                  setCopiedIndex(null);
                }}
              >
                View
              </button>
              <button
                onClick={() => handleCopyField(index)}
                disabled={copiedIndex === index + jsonData.length}
                className={
                  copiedIndex === index + jsonData.length
                    ? "bg-green-600"
                    : "disabled:bg-green-600"
                }
              >
                {copiedIndex === index + jsonData.length
                  ? "Copied \u2713"
                  : "Copy"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {(selectedComponent || selectedField) && (
        <div className="shadow-lg shadow-black px-4 py-2 bg-slate-950 rounded-lg">
          <div className="flex flex-col">
            <h1 className="col-span-2">JSON Preview</h1>
            <h2>
              {selectedComponent
                ? selectedComponent.title
                : selectedField.title}
            </h2>
            <p>
              {selectedComponent
                ? selectedComponent.description
                : selectedField.description}
            </p>
          </div>
          {selectedComponent && selectedComponent.title === "Fee Panel" && (
            <div className="flex flex-col flex-wrap">
              <div>
                <input
                  type="text"
                  placeholder="Fee Name"
                  value={inputValue.name}
                  onChange={(e) =>
                    setInputValue({ ...inputValue, name: e.target.value })
                  }
                  className="mr-2 mb-2"
                />
                <input
                  type="text"
                  placeholder="Fee Amount"
                  value={inputValue.amount}
                  onChange={(e) =>
                    setInputValue({ ...inputValue, amount: e.target.value })
                  }
                  className="mr-2 mb-2"
                />
                <button
                  className="mr-2 mb-2"
                  onClick={() =>
                    handleAddFee(inputValue.name, inputValue.amount)
                  }
                >
                  Add Fee
                </button>
              </div>
              {addedFees.length > 0 && (
                <div>
                  <h2>Added Fees</h2>
                  <ul className="flex flex-wrap overflow-auto max-h-56">
                    {addedFees.map((fee, index) => (
                      <li
                        key={index}
                        className="border-2 border-white rounded-md shadow-lg shadow-black mr-2 my-2 p-4 bg-slate-900"
                      >
                        <p className=" text-blue-600">{fee.name}</p>
                        <p className=" text-green-600">${fee.amount}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {selectedField && (
            <input
              type="text"
              placeholder="Custom Field Name..."
              className="mr-4"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? handleSubmit(inputValue) : null
              }
            />
          )}
          {selectedField && (
            <button className="mr-4" onClick={() => handleSubmit(inputValue)}>
              Modify
            </button>
          )}

          {selectedField && (
            <div className="flex">
              <input
                type="checkbox"
                checked={
                  selectedField.component.validate &&
                  selectedField.component.validate.required
                }
                className="bg-gray-900 text-gray-200 font-bold py-2 px-4 rounded-lg mr-2"
                onChange={() => handleRequired(selectedField)}
              />
              <p className="text-gray-200 mr-2">Make Required?</p>
            </div>
          )}

          <button
            className={copiedIndex !== null ? "bg-green-600" : ""}
            onClick={
              selectedComponent && selectedComponent.title === "Fee Panel"
                ? handleCopyWithFees
                : handleCopyPreview
            }
          >
            {copiedIndex !== null ? "Copied \u2713" : "Copy"}
          </button>
          <div className="max-h-[800px] overflow-auto">
            <SyntaxHighlighter language="json" style={dracula}>
              {JSON.stringify(
                selectedComponent
                  ? {
                      ...selectedComponent.component,
                      components: [
                        ...selectedComponent.component.components.slice(0, -1), // Exclude the "New Fee" component
                        {
                          ...selectedComponent.component.components[
                            selectedComponent.component.components.length - 1
                          ],
                          columns: [
                            ...(selectedComponent.component.components[
                              selectedComponent.component.components.length - 1
                            ].columns || []),
                            {
                              components: addedFees.map(({ name, amount }) => ({
                                label: name,
                                applyMaskOn: "change",
                                mask: false,
                                spellcheck: true,
                                disabled: true,
                                tableView: false,
                                currency: "USD",
                                inputFormat: "plain",
                                truncateMultipleSpaces: false,
                                clearOnHide: false,
                                key: name
                                  .replace(
                                    /(?:^\w|[A-Z]|\b\w)/g,
                                    function (word, index) {
                                      return index === 0
                                        ? word.toLowerCase()
                                        : word.toUpperCase();
                                    }
                                  )
                                  .replace(/\s+/g, ""),
                                type: "currency",
                                input: true,
                                delimiter: true,
                                defaultValue: parseInt(amount),
                              })),
                              width: 4,
                              offset: 0,
                              push: 0,
                              pull: 0,
                              size: "md",
                              currentWidth: 4,
                            },
                          ],
                        },
                      ],
                    }
                  : selectedField && selectedField.component,
                null,
                2
              )}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentPage;
