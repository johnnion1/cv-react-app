/* eslint-disable react/prop-types */
import { act, useState } from "react";
import "./App.css";
import inputTemplates from "./inputTemplates";

const personalInputs = inputTemplates.personalInputs;
const educationalInputs = inputTemplates.educationalInputs;
const workInputs = inputTemplates.workInputs;

function Aapp() {
  //set states for storing and using values of each child form component (personal, edu and work)
  const [parentValues, setParentValues] = useState({
    personal: {
      firstName: "dorio",
      lastName: "",
      birthday: "",
      index: 0,
    },
    educational: {
      entries: [
        {
          facility: "as",
          dateOfStudy: "2023-01-01",
          study: "man",
          index: 0,
        },
        {
          facility: "",
          dateOfStudy: "",
          study: "",
          index: 1,
        },
      ],
    },
    work: {
      entries: [
        //EDIT to the real property names from inputtemplate!
        {
          company: "ACOMPANY",
          position: "Surgon",
          responsibilities: "Surge",
          fromEmployed: "2020-01-01",
          toEmployed: "2024-01-01",
          index: 0,
        },
        {
          company: "",
          position: "",
          responsibilities: "",
          fromEmployed: "",
          toEmployed: "",
          index: 1,
        },
      ],
    },
  });

  function handleSubmit(childData, submitIdToken) {
    //const newParentData = { ...parentValues, personal: { ...childData } };
    if (parentValues[submitIdToken].entries.length >= 1) {
      let newData = parentValues;
      newData[submitIdToken].entries[childData.index] = childData;
      console.log(newData);
      setParentValues((oldValues) => ({ ...oldValues, ...newData }));
    }
  }

  function createForms(arr, type) {
    if (type !== "educational" && type !== "work") {
      return;
    }
    let formsArray = [];

    arr.forEach((entry) => {
      formsArray.push(
        <>
          <Form
            key={"Component" + formsArray.length}
            parentValues={entry}
            handleFormSubmit={handleSubmit}
            inputElementArr={
              type == "educational"
                ? educationalInputs
                : type == "work"
                ? workInputs
                : null
            }
            submitIdToken={type}
          ></Form>
        </>
      );
    });
    return formsArray;
  }
  const edForms = createForms(parentValues.educational.entries, "educational");
  const workForms = createForms(parentValues.work.entries, "work");
  return (
    <>
      <Form
        key={"personalComponent"}
        parentValues={parentValues.personal}
        handleFormSubmit={handleSubmit}
        inputElementArr={personalInputs}
        submitIdToken="personal"
      ></Form>
      {edForms}
      {workForms}
    </>
  );
}

function Form({
  parentValues,
  handleFormSubmit,
  submitIdToken,
  inputElementArr,
}) {
  const [childData, setChildData] = useState(parentValues);
  const [isEditable, setIsEditable] = useState(false);
  /*  let isEditable = false; */
  const handleSetActive = () => {
    if (isEditable == true) {
      childData == parentValues
        ? setIsEditable(() => false)
        : confirm("Discard changes?")
        ? goBack()
        : null;
    } else if (isEditable == false) {
      setIsEditable(() => true);
    }
  };
  const goBack = () => {
    setIsEditable(() => false);
    setChildData(parentValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(childData, submitIdToken);
    setIsEditable(() => false);
  };

  const handleChange = (e) => {
    e.preventDefault();

    let newPersonal = { ...childData, [e.target.name]: e.target.value };
    console.log(newPersonal);
    setChildData(newPersonal);
  };
  console.log(inputElementArr);
  const inputList = inputElementArr.map((input) => (
    <div
      key={
        submitIdToken + "-" + input.name + "-InputDiv-" + parentValues.index
        //`${submitIdToken}-${input.name}-InputDiv-${parentValues.index}`
      }
    >
      {!isEditable ? (
        <>
          <p /* key={input.id} */>{input.label}</p>
          <p>
            {parentValues[input.name] !== "" ? parentValues[input.name] : ""}
          </p>
        </>
      ) : (
        <>
          <label htmlFor={input.id + "-" + parentValues.index}>
            {input.label}
          </label>
          <Custinput
            type={input.type != !null ? input.type : "text"}
            key={input.id + parentValues.index}
            name={input.name}
            id={input.id + "-" + parentValues.index}
            value={childData[input.name] || ""}
            onChange={handleChange}
            required
          ></Custinput>
        </>
      )}
    </div>
  ));

  return (
    <>
      <form
        //noValidate
        key={submitIdToken + "Form-" + parentValues.index}
        onSubmit={handleSubmit}
        action="handleSubmit"
        method="post"
      >
        {inputList}

        <br />

        <button onClick={handleSetActive} type="button">
          {isEditable ? "Back" : "Edit"}
        </button>

        <button type="submit" disabled={!isEditable}>
          Submit
        </button>
      </form>
    </>
  );
}

function Custinput({ ...props }) {
  //very necesiary
  return <input {...props}></input>;
}
/* 
function CustomInput({ value, key, type, onChange }) {
  return (
    <input
      key={key}
      type={type !== null ? type : "text"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
} */

export default Aapp;
