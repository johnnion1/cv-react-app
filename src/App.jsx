import { useState } from "react";
import "./App.css";

function App() {
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    address: "",
    age: "",
  });

  return (
    <>
      <p>Hyello</p> <h2>{personal.firstName + " " + personal.lastName}</h2>
      <br />
      <hr />
      <PersonalForm personal={personal} setPersonal={(v) => setPersonal(v)} />
    </>
  );
}

function PersonalForm({ personal, setPersonal }) {
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
      <form action="" method="post">
        {editActive ? (
          <CustomInput
            value={editedPersonal.firstName}
            label="First name: "
            name="firstName"
            id="firstName"
            onChange={(e) => handleChange(e, "firstName")}
          />
        ) : (
          <div className="infoLine">
            <p>First name:</p>
            <p> {editedPersonal.firstName}</p>
          </div>
        )}
        <br />
        {editActive ? (
          <CustomInput
            value={editedPersonal.lastName}
            label="Last Name: "
            name="lastName"
            onChange={(e) => handleChange(e, "lastName")}
          />
        ) : (
          <div className="infoLine">
            <p>Last name:</p>
            <p> {editedPersonal.lastName}</p>
          </div>
        )}
        <br />
        {editActive ? (
          <CustomInput
            value={editedPersonal.address}
            label="Address: "
            name="address"
            onChange={(e) => handleChange(e, "address")}
          />
        ) : (
          <div className="infoLine">
            <p>Address: </p>
            <p> {editedPersonal.address}</p>
          </div>
        )}
        <br />
        {editActive ? (
          <CustomInput
            type="date"
            value={editedPersonal.age}
            label="Age: "
            name="age"
            onChange={(e) => handleChange(e, "age")}
          />
        ) : (
          <div className="infoLine">
            <p>Age:</p>
            <p> {editedPersonal.age}</p>
          </div>
        )}
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
      </form>
    </>
  );
}

function CustomInput({ type, value, label, name, onChange }) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={(e, name) => onChange(e, name)}
      />
    </>
  );
}
function CustomButton({ text, type, handleClick, isActive, hidden }) {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={!isActive}
      hidden={hidden}
    >
      {text}
    </button>
  );
}
export default App;
