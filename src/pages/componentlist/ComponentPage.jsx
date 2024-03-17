import React, { useState } from "react";
import jsonData from "./components.json";
import fieldJson from "./fields.json";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function ComponentPage() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [required, setRequired] = useState(false);

  function handleCopyComponent(index) {
    const componentToCopy = jsonData[index].component;
    navigator.clipboard.writeText(JSON.stringify(componentToCopy, null, 2));
    setCopiedIndex(index);
  }

  function handleCopyField(index) {
    navigator.clipboard.writeText(
      JSON.stringify(selectedField.component, null, 2)
    );
    setCopiedIndex(index + jsonData.length); // Adjust index to avoid overlap
  }

  function handleCopyPreview() {
    if (selectedComponent) {
      handleCopyComponent(jsonData.indexOf(selectedComponent));
    } else if (selectedField) {
      handleCopyField(selectedField);
    }
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
    const checkboxChecked = !required;
    setRequired(checkboxChecked);

    if (!checkboxChecked) {
      updatedField.component.validate = { required: false };
    } else {
      updatedField.component.validate = { required: true };
    }

    setSelectedField(updatedField);
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
                  setCopiedIndex(null); // Reset copied state
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
                  setCopiedIndex(null); // Reset copied state
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
              <p className="text-gray-200 mr-4">Make Required?</p>
              <input
                type="checkbox"
                className="bg-gray-900 text-gray-200 font-bold py-2 px-4 rounded-lg mr-4"
                onChange={() => handleRequired(selectedField)}
              />
            </div>
          )}
          <button
            className={copiedIndex !== null ? "bg-green-600" : ""}
            onClick={() => handleCopyPreview(selectedComponent, selectedField)}
          >
            {copiedIndex !== null ? "Copied \u2713" : "Copy"}
          </button>
          <div className="max-h-[800px] overflow-auto">
            <SyntaxHighlighter language="json" style={dracula}>
              {JSON.stringify(
                selectedComponent
                  ? selectedComponent && selectedComponent.component
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
