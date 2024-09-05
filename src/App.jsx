import { useState } from "react";
import "./assets/styles/App.css";

function App() {
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    address: "",
    age: "",
  });
  const [educational, setEducational] = useState({
    school: "",
    study: "",
    year: "",
  });

  return (
    <>
      <div className="mainContent">
        <p>Hyello</p> <h2>{personal.firstName + " " + personal.lastName}</h2>
        <br />
        <hr />
        <PersonalForm
          className="personalform"
          personal={personal}
          setPersonal={(v) => setPersonal(v)}
        />
        <hr />
        <EducationalForm
          className="educationalForm"
          educational={educational}
          setEducational={(v) => setEducational(v)}
        />
      </div>
    </>
  );
}

function PersonalForm({ formClassName, personal, setPersonal }) {
  const [editedPersonal, setEditedPersonal] = useState(personal);
  const [editedBool, setEditedBool] = useState(false); /* Use object */
  const [editActive, setEditActive] = useState(false);
  /* Lift into parrent, use activeIndex 0,1,2 instead */ /*let edited = false; Either put in state or calculate if editedPersonal is different from personal */

  function handleChange(e, inputName) {
    const newPersonal = { ...editedPersonal, [inputName]: e.target.value };
    setEditedBool(true);
    if (newPersonal[inputName] == personal[inputName]) {
      console.log("newPersonal[inputName] == personal[inputName]");
      setEditedBool(false);
    }
    setEditedPersonal(newPersonal);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (editedBool) {
      setPersonal(editedPersonal);
      setEditActive(false);
      setEditedBool(false);
      return;
    }
  }
  return (
    <>
      <div className="formDiv">
        <h2>Personal Details</h2>
        <form action="" method="post">
          <div className="infoLine">
            {editActive ? (
              <CustomInput
                className="slideInput"
                value={editedPersonal.firstName}
                label="First name: "
                name="firstName"
                id="firstName"
                onChange={(e) => handleChange(e, "firstName")}
              />
            ) : (
              <>
                <p>First name:</p>
                <p> {editedPersonal.firstName}</p>
              </>
            )}
          </div>

          <div className="infoLine">
            {editActive ? (
              <CustomInput
                value={editedPersonal.lastName}
                label="Last name: "
                name="lastName"
                onChange={(e) => handleChange(e, "lastName")}
              />
            ) : (
              <>
                <p>Last name:</p>
                <p>
                  {" "}
                  {editedPersonal.lastName == ""
                    ? " "
                    : editedPersonal.lastName}
                </p>
              </>
            )}
          </div>

          <div className="infoLine">
            {editActive ? (
              <CustomInput
                value={editedPersonal.address}
                label="Address: "
                name="address"
                onChange={(e) => handleChange(e, "address")}
              />
            ) : (
              <>
                <p>Address: </p>
                <p> {editedPersonal.address}</p>
              </>
            )}
          </div>

          <div className="infoLine">
            {editActive ? (
              <CustomInput
                type="date"
                value={editedPersonal.age}
                label="Age: "
                name="age"
                id="age"
                onChange={(e) => handleChange(e, "age")}
                range={["1900-01-01", "2010, 01-01"]}
              />
            ) : (
              <>
                <p>Age:</p>
                <p> {editedPersonal.age}</p>
              </>
            )}
          </div>
          <div className="buttonDiv">
            <CustomButton
              isActive={editedBool === true ? true : false}
              text="Submit Changes"
              type="submit"
              handleClick={handleSubmit}
              hidden={editActive ? false : true}
            />
            <CustomButton
              isActive={true}
              text={editActive ? "Back" : "Edit"}
              type="default"
              handleClick={(e) => {
                e.preventDefault();
                editActive ? setEditActive(false) : setEditActive(true);
              }}
              hidden={false}
            />
          </div>
        </form>
      </div>
    </>
  );
}
function EducationalForm({ formClassName, educational, setEducational }) {
  const [editedEducational, setEditedEducational] = useState(educational);
  const [editedBool, setEditedBool] = useState(false); /* Use object */
  const [editActive, setEditActive] = useState(false);
  /* Lift into parrent, use activeIndex 0,1,2 instead */ /*let edited = false; Either put in state or calculate if editedEducational is different from personal */

  function handleChange(e, inputName) {
    const newEducational = {
      ...editedEducational,
      [inputName]: e.target.value,
    };
    setEditedBool(true);
    if (newEducational[inputName] == educational[inputName]) {
      console.log("newEducational[inputName] == personal[inputName]");
      setEditedBool(false);
    }
    setEditedEducational(newEducational);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (editedBool) {
      setEducational(editedEducational);
      setEditActive(false);
      setEditedBool(false);
      return;
    }
  }
  return (
    <>
      <div className="formDiv">
        <h2>Educational Details</h2>
        <form action="" method="post">
          <div className="infoLine">
            {editActive ? (
              <CustomInput
                value={editedEducational.school}
                label="School: "
                name="school"
                id="school"
                onChange={(e) => handleChange(e, "school")}
              />
            ) : (
              <>
                <p>School:</p>
                <p> {editedEducational.school}</p>
              </>
            )}
          </div>

          <div className="infoLine">
            {editActive ? (
              <CustomInput
                value={editedEducational.study}
                label="Study: "
                name="study"
                id="study"
                onChange={(e) => handleChange(e, "study")}
              />
            ) : (
              <>
                <p>Study:</p>
                <p> {editedEducational.study}</p>
              </>
            )}
          </div>
          <div className="infoLine">
            {editActive ? (
              <CustomInput
                type="date"
                value={editedEducational.year}
                label="year: "
                name="year"
                onChange={(e) => handleChange(e, "year")}
              />
            ) : (
              <>
                <p>Year:</p>
                <p> {editedEducational.year}</p>
              </>
            )}
          </div>

          <div className="buttonDiv">
            <CustomButton
              isActive={editedBool === true ? true : false}
              text="Submit Changes"
              type="submit"
              handleClick={handleSubmit}
              hidden={editActive ? false : true}
            />
            <CustomButton
              isActive={true}
              text={editActive ? "Back" : "Edit"}
              type="default"
              handleClick={(e) => {
                e.preventDefault();
                editActive ? setEditActive(false) : setEditActive(true);
              }}
              hidden={false}
            />
          </div>
        </form>
      </div>
    </>
  );
}

function CustomInput({ className, type, value, label, name, onChange, range }) {
  return (
    <>
      <label>{label}</label>
      <input
        className={className}
        placeholder="has"
        type={type}
        value={value}
        name={name}
        onChange={(e, name) => onChange(e, name)}
        min={range ? range[0] : null}
        max={range ? range[1] : null}
      />
      {/* 
      <span></span> */}
    </>
  );
}
function CustomButton({ text, type, handleClick, isActive, hidden }) {
  return (
    <button
      type={type ? type : "text"}
      onClick={handleClick}
      disabled={!isActive}
      hidden={hidden}
    >
      {text}
    </button>
  );
}
export default App;
