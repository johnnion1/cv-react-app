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
    name: "edFacility",
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
    name: "studyFinish",
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
      isActive: true,
    },
    education: {
      entries: [
        {
          facility: "",
          dateOfStudy: "",
          graduation: "",
        },
      ],
      isActive: false,
    },
    work: {
      isActive: false,
    },
  });
  const [activeForms, setActiveForms] = useState({
    personal: true,
    education: [0, 1],
    work: true,
  });

  function handleSubmit(childData, submitIdToken) {
    //const newParentData = { ...parentValues, personal: { ...childData } };

    setParentValues((prevValues) => ({
      ...prevValues,
      [submitIdToken]: { ...childData },
    }));
    //   setParentValues(newParentData);
    /* 
   let newData = {inputs:[]}
   in parentdata inputs array
    find the input with the name of formData[0].name (or id)
    copy to newData.inputs
    change the value to formData[0].value
  repeat for every formData item
   */
  }
  /* form
      map(inputs)
      button add
      button submit => setParentPersonalInputs
     */
  /* 
  return personalInputs.map((input) => {
    return (
      <input
        type={input.type != !null ? input.type : "text"}
        key={input.id}
        name={input.name}
        id={input.id}
        value={input.value}
      />
    );
  }); */
  function handleSetActive(token, ind) {
    let newActiveForms = [];
    if (ind) {
      const c = activeForms[token].includes(ind);
      if (c) {
        const i = activeForms[token].indexOf(ind);
        newActiveForms = activeForms[token].splice(i, 1);
        console.log(activeForms);
      } else {
        newActiveForms = activeForms[token].push(ind);
      }
    } else {
      newActiveForms = {
        ...activeForms,
        [token]: activeForms[token] == false ? true : false,
      };
    }
    setActiveForms(newActiveForms);
  }

  return (
    <>
      <Form
        isEditable={activeForms.personal}
        handleSetActive={handleSetActive}
        parentValues={parentValues.personal}
        handleFormSubmit={handleSubmit}
        inputElementArr={personalInputs}
        submitIdToken="personal"
      ></Form>
    </>
  );
}

/*  /* <Form
          parentValues={parentValues}
          handleSubmit={handleSubmit}
          personalInputs={personalInputs}
        >
          {  <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {parentValues.isActive ? "Back" : "Edit"}
          </button> }
        </Form> 
function PersonalForm({props}) {
  const [childState, setChildState] = useState(props) // or props.input 

  return (<>
    //input / p if props.inactive 
    //label / p

    //input / p
    //label / p
    
    //input / p
    //label / p

    => = map inputs and render automatically <CustomInputs> : <p> elements

    //Add Button

    //Submit / Edit Button if props.inactive
    if input.value !== props.input.value, submit saves childState to setParentPersonal
    otherwise it's disabled


  </>)
}
*/
function Form({
  isEditable,
  handleSetActive,
  parentValues,
  handleFormSubmit,
  submitIdToken,
  inputElementArr,
}) {
  const [childData, setChildData] = useState(parentValues);

  const handleClick = () => {
    if (parentValues.index) {
      handleSetActive(submitIdToken, parentValues.index);
    } else {
      handleSetActive(submitIdToken);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(childData, submitIdToken);
  };

  const handleChange = (e) => {
    e.preventDefault();
    let newPersonal = { ...childData, [e.target.name]: e.target.value };
    setChildData(newPersonal);
  };

  const inputList = inputElementArr.map((input) =>
    !isEditable ? (
      <>
        <p key={input.id}>{input.label}</p>
        <p>{parentValues[input.name] !== "" ? parentValues[input.name] : ""}</p>
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
    )
  );

  return (
    <>
      <form
        //noValidate
        onSubmit={handleSubmit}
        action="handleSubmit"
        method="post"
      >
        {inputList}

        <br />

        <button onClick={handleClick} type="button">
          {isEditable ? "Back" : "Edit"}
        </button>

        <button type="submit" disabled={!parentValues.isActive}>
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
