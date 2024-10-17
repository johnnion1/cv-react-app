/* eslint-disable react/prop-types */
import { act, useState } from "react";
import "./App.css";

const personalInputs = [
  {
    type: "text",
    name: "firstName",
    value: "",
    id: "userFirstName",
    minlength: 1,
    maxlegth: 60,
    label: "First name:", //goes into label or p element
  },
  {
    type: "text",
    name: "lastName",
    value: "",
    id: "userLastName",
    required: true,
    minlength: 1,
    maxlegth: 60,
    label: "Last name:",
  },
  {
    type: "date",
    name: "birthday",
    value: "",
    id: "userBirthday",
    required: true,
    //range eg 1900-2010
    label: "Birthday:",
  },
];

const educationalInputs = [
  {
    type: "text",
    name: "facility",
    value: "",
    id: "userEdFacility",
    minlength: 1,
    maxlegth: 60,
    label: "Educational Facility:",
  },
  {
    type: "text",
    name: "study",
    value: "",
    id: "userStudy",
    required: true,
    minlength: 1,
    maxlegth: 60,
    label: "Study:",
  },
  {
    //should be two dates or range date picker
    type: "date",
    name: "dateOfStudy",
    value: "",
    id: "userStudyFinish",
    required: true,
    //range
    label: "Finished:",
  },
];
const entryTemplates = {
  educational: {
    facility: "",
    dateOfStudy: "",
    study: "",
    index: null,
  },
};

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
          facility: "test",
          dateOfStudy: "",
          study: "",
          index: 1,
        },
      ],
    },
    work: {
      isActive: false,
    },
  });
  let edForms = null;
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
    const newEntry = entryTemplates[token];
    newEntry.index = newIndex;
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
    //make {entries: newarr, etc: asd} amd put ({...oldValues, [token]: ...newObj})
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

  function createForms(arr) {
    let formsArray = [];
    //use proper keys!!
    let ctr = 0;
    arr.forEach((entry) => {
      formsArray.push(
        <div key={"Component" + ctr++}>
          <Form
            parentValues={entry}
            handleFormSubmit={handleSubmit}
            inputElementArr={educationalInputs}
            submitIdToken="educational"
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
  edForms = createForms(parentValues.educational.entries);

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
      <button
        type="button"
        className="addBtn"
        onClick={(e) => handleAddEntry(e, "educational")}
      ></button>
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
    //e.target.name - last char!
    let newPersonal = { ...childData, [e.target.name]: e.target.value };
    setChildData(newPersonal);
  };

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
        <Custinput
          type={input.type != !null ? input.type : "text"}
          key={input.id + parentValues.index}
          name={input.name}
          id={input.id + parentValues.index}
          value={childData[input.name] || ""}
          onChange={handleChange}
          required
        ></Custinput>
      )}
    </div>
  ));

  return (
    <>
      <form
        //noValidate
        key={
          parentValues.index
            ? submitIdToken + "Form-" + parentValues.index
            : submitIdToken + "Form"
        }
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
