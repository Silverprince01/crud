import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../reusable/Input";
import { inputValues } from "../constants/inputs";
import { getItems, handleEdit, deleteItem } from "../services/data";

const EditUsers = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [singleData, setSingleData] = useState({});

  console.log(singleData);
  const { id } = useParams();
console.log(id)
  const handleInputChange = (e, id) => {
    const { value } = e.target;
    setSingleData({ ...singleData, [id]: value });
  };
  const getData = async () => {
    await getItems(setData);
  };

  const editData = async () => {
    try {
      await handleEdit(singleData).then(() => navigate("/"));
    } catch (error) {
      alert(error);
    }
  };

  const deleteData = async () => {
    try {
      await deleteItem(singleData).then(() => {
        navigate("/");
        setSingleData({});
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const dataItem = data.find((item) => item.id === id);
    setSingleData(dataItem);
  }, [data, id]);

  return (
    <div className="body">
      <h3>Edit below</h3>
      <form>
        {inputValues?.map((data) => {
          const { id, label, type } = data;
          return (
            <Input
              key={id}
              label={label}
              value={singleData?.[label] || ""}
              type={type}
              onChange={(e) => handleInputChange(e, label)}
            />
          );
        })}
      </form>
      <div className="btmContainer">
        <button className="greenBtn" onClick={editData}>Edit</button>
        <button className="redBtn" onClick={deleteData}>Delete</button>
      </div>
    </div>
  );
};

export default EditUsers;
