/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

const personalInputs = [
  {
    type: "text",
    name: "firstName",
    value: "",
    id: "userFirstName",
    minlength: 1,
    maxlegth: 60,
    // define onChange in child for it is there that the (controlled) inputs intermediary values get stored until submit
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

function Aapp() {
  //set states for storing and using values of each child form component (personal, edu and work)
  const [parentValues, setParentValues] = useState({
    personal: {
      firstName: "dorio",
      lastName: "",
      birthday: "",
      isActive: true,
    },
    work: {
      isActive: false,
    },
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
  return (
    <>
      <Form
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
  parentValues,
  handleFormSubmit,
  submitIdToken,
  inputElementArr,
}) {
  const [childData, setChildData] = useState(parentValues);

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
    !parentValues.isActive ? (
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

        <button type="button">{parentValues.isActive ? "Back" : "Edit"}</button>

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
