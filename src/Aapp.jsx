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
      id: crypto.randomUUID(),
    },
    educational: {
      entries: [
        {
          facility: "as",
          dateOfStudy: "2023-01-01",
          study: "man",
          index: 0,
          id: crypto.randomUUID(),
        },
        {
          facility: "test",
          dateOfStudy: "",
          study: "",
          index: 1,
          id: crypto.randomUUID(),
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
  function handleAddEntry(e, token) {
    e.preventDefault();
    //check if last entry is empty
    const prevEntry =
      parentValues[token].entries[parentValues[token].entries.length - 1];
    let prevIsEmpty = true;
    for (let i in prevEntry) {
      i == "index" ? null : prevEntry[i] != "" ? (prevIsEmpty = false) : null;
    }

    if (!parentValues[token].entries || prevIsEmpty) {
      console.log("empty or no entries");
      console.log(parentValues);
      return;
    }
    const newIndex = parentValues[token].entries.length;
    //create copy of entry Templates
    const newEntry = Array.from(entryTemplates[token]);
    newEntry.index = newIndex;
    newEntry.id = crypto.randomUUID();
    const newValues = parentValues[token];
    newValues.entries.push(newEntry);
    setParentValues((prevValues) => ({ ...prevValues, [token]: newValues }));
  }
  function changeIndex(token, ind, up) {
    if (
      (ind == 0 && up == true) ||
      (ind == parentValues[token].entries.length - 1 && up == false)
    ) {
      console.log(parentValues[token]);
      console.log(ind.toString() + " " + up ? "up" : "down");
      console.log("not possible");
      return;
    }
    const newData = parentValues[token].entries;
    console.log(ind);
    console.log(newData[ind]);
    let temp = newData[ind];
    let swapInd = up ? ind - 1 : ind + 1;
    temp.index = swapInd;
    newData[ind] = newData[swapInd];
    newData[ind].index = ind;
    newData[swapInd] = temp;
    console.log(newData);

    let newParentTokenData = { ...parentValues[token] };
    newParentTokenData.entries = newData;
    setParentValues((prevValues) => ({ ...prevValues, ...newData }));
    console.log(parentValues);
  }

  function handleDeleteEntry(e, token, ind) {
    e.preventDefault();
    //splice array
    const newData = parentValues;
    newData[token].entries.splice(ind, 1);
    // reset indexes
    let i = 0;
    newData[token].entries.forEach((entry) => (entry.index = i++));
    //save
    setParentValues((prevValues) => ({ ...prevValues, ...newData }));
  }

  function handleSubmit(childData, submitIdToken) {
    console.log(submitIdToken);
    // saving when the data is in an array
    if (
      parentValues[submitIdToken].entries &&
      parentValues[submitIdToken].entries.length >= 1
    ) {
      let newData = parentValues;
      newData[submitIdToken].entries[childData.index] = childData;
      console.log(newData);
      setParentValues((prevValues) => ({ ...prevValues, ...newData }));

      // return;
    } //no array, only one entry
    else {
      const newData = {};
      newData[submitIdToken] = childData;
      setParentValues((prevValues) => ({ ...prevValues, ...newData }));
    }
    console.log(parentValues);
  }

  function createForms(arr, type) {
    if (type !== "educational" && type !== "work") {
      return;
    }
    let formsArray = [];

    arr.forEach((entry) => {
      formsArray.push(
        <div key={entry.id}>
          <Form
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
          <button
            type="button"
            onClick={(e) => handleDeleteEntry(e, "educational", entry.index)}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => changeIndex("educational", entry.index, true)}
          >
            Up
          </button>
          <button
            type="button"
            onClick={() => changeIndex("educational", entry.index, false)}
          >
            Down
          </button>
        </div>
      );
    });
    return formsArray;
  }
  const edForms = createForms(parentValues.educational.entries, "educational");
  const workForms = createForms(parentValues.work.entries, "work");
  return (
    <>
      <div key={parentValues.personal.id}>
        <Form
          parentValues={parentValues.personal}
          handleFormSubmit={handleSubmit}
          inputElementArr={personalInputs}
          submitIdToken="personal"
        ></Form>
      </div>
      {edForms}
      <button
        type="button"
        className="addBtn"
        onClick={(e) => handleAddEntry(e, "educational")}
      ></button>
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
          <p key={input.id + parentValues.index + "p"}>{input.label}</p>
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
