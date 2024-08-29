import { useState } from "react";
import "./App.css";

function App() {}

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
function CustomButton(text, type, handleClick) {
  return (
    <button type={type} onClick={handleClick}>
      {text}
    </button>
  );
}
export default App;
