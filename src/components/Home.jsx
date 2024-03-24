import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import Input from "../reusable/Input";
import { inputValues } from "../constants/inputs";
import { submit } from "../services/data";
const Home = () => {
  const [formValue, setFormValue] = useState({});
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e, id) => {
    const { value } = e.target;
    setFormValue({ ...formValue, [id]: value });
    setErrors({});
  };
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("testStorage")) || [];
    setData(existingData);
  }, []);

  function generateUniqueId() {
    // Generate a timestamp to ensure uniqueness
    const timestamp = new Date().getTime();

    // Generate a random number (to handle multiple IDs generated in the same millisecond)
    const random = Math.random().toString(36).substring(2, 15);

    // Concatenate timestamp and random number to create the unique ID
    const uniqueId = timestamp + "-" + random;

    return uniqueId;
  }

  const uniqueId = generateUniqueId();

  formValue.id = uniqueId;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    inputValues.forEach((input) => {
      if (!formValue[input.label]) {
        newErrors[input.label] = `${input.label} is required`;
      } else if (
        input.type === "number" &&
        isNaN(Number(formValue[input.label]))
      ) {
        newErrors[input.label] = `${input.label} must be a number`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      submit(formValue);
      // Submit logic here
      console.log("Form submitted:", formValue);
      // Clear form data
      setFormValue({});
      // Clear errors
      setErrors({});
    }
  };

  return (
    <div className="body">
      <h3>Kindly fill in the input</h3>
      <form id="dynamicForm">
        {inputValues.map((input) => {
          const { id, label, type } = input;
          return (
            <Input
              key={id}
              type={type}
              label={label}
              value={formValue[label] || ""}
              onChange={(e) => handleInputChange(e, label)}
              errors={errors}
            />
          );
        })}
        <button className="greenBtn" onClick={handleSubmit}>
          Submit
        </button>
      </form>

      {data.length === 0 ? (
        <h4>You do not have any financial report uploaded yet</h4>
      ) : (
        <div>
          <h3>List of Financial Records</h3>
          {data.map((dat) => {
            const {
              "Name of initiator": NameOfInitiator,
              "Cash Amount": CashAmount,
              "Item count": ItemCount,
              "Manager Name": ManagerName,
            } = dat;
            console.log(NameOfInitiator);
            return (
              <div key={dat.id} id="financeData">
                <div>
                  <div>
                    <p>{NameOfInitiator}</p>
                    <p>{CashAmount}</p>
                    <p>{ManagerName}</p>
                    <p>{ItemCount}</p>
                  </div>
                  <Link to={`${dat.id}`}>Edit</Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
