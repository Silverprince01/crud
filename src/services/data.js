export const deleteItem = async (singleData) => {
  try {
    const updatedData = await JSON.parse(
      localStorage.getItem("testStorage")
    ).filter((item) => item.id !== singleData.id);
    localStorage.setItem("testStorage", JSON.stringify(updatedData));
    alert("Item has been deleted");
  } catch (error) {
    console.log(error);
  }
};

export const getItems = async (setData) => {
  const existingData =
    (await JSON.parse(localStorage.getItem("testStorage"))) || [];

  setData(existingData);
};

export const handleEdit = async (singleData) => {
  try {
    const updatedData = await JSON.parse(
      localStorage.getItem("testStorage")
    ).map((item) => {
      if (item.id === singleData.id) {
        return singleData;
      }
      return item;
    });
    localStorage.setItem("testStorage", JSON.stringify(updatedData));
    alert("Successfully updated");
    //   navigate("/");
  } catch (error) {
    alert(error);
  }
};

export const submit = async (formValue) => {
  try {
    const existingData =
      (await JSON.parse(localStorage.getItem("testStorage"))) || [];
    const updatedData = [...existingData, formValue];
    localStorage.setItem("testStorage", JSON.stringify(updatedData));
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
