import React from "react";

const Input = ({ type, value, label, onChange, errors }) => {
  return (
    <div className="inputCon">
      <label htmlFor="">{label}</label>
      <input type={type} value={value} onChange={onChange} />
      {errors?.[label] && <span style={{ color: "red" }}>{errors?.[label]}</span>}
    </div>
  );
};

export default Input;
