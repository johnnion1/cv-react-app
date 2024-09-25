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
          dateOfStudy: "",
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
      isActive: false,
    },
  });

  function handleSubmit(childData, submitIdToken) {
    //const newParentData = { ...parentValues, personal: { ...childData } };
    if (parentValues[submitIdToken].entries.length >= 1) {
      let newData = parentValues;
      newData[submitIdToken].entries[childData.index] = childData;
      console.log(newData);
      setParentValues(newData);
      /* setParentValues((prevValues) => ({
      ...prevValues,
      [submitIdToken].[childData.index] : { ...childData },
    }))
}
    setParentValues((prevValues) => ({
      ...prevValues,
      [submitIdToken] { ...childData },
    })); */
    }
  }

  function createForms(arr) {
    let formsArray = [];
    arr.forEach((entry) => {
      formsArray.push(
        <>
          <Form
            key={"Component" + formsArray.length}
            parentValues={entry}
            handleFormSubmit={handleSubmit}
            inputElementArr={educationalInputs}
            submitIdToken="educational"
          ></Form>
        </>
      );
    });
    return formsArray;
  }
  const edForms = createForms(parentValues.educational.entries);

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
    setIsEditable((isEditable) => (isEditable == true ? false : true));
  };
  /* const handleClick = () => {
    if (parentValues.index) {
      handleSetActive(submitIdToken, parentValues.index);
    } else {
      handleSetActive(submitIdToken);
    }
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(childData, submitIdToken);
    handleSetActive();
  };

  const handleChange = (e) => {
    //   setParentValues(newParentData);
    /* 
   let newData = {inputs:[]}
   in parentdata inputs array
    find the input with the name of formData[0].name (or id)
    copy to newData.inputs
    change the value to formData[0].value
  repeat for every formData item
   */
    e.preventDefault();
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
          <p key={input.id}>{input.label}</p>
          <p>
            {parentValues[input.name] !== "" ? parentValues[input.name] : ""}
          </p>
        </>
      ) : (
        <Custinput
          type={input.type != !null ? input.type : "text"}
          key={input.id}
          name={input.name}
          id={input.id}
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
