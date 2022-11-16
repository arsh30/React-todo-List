import "./styles/App.css";
import React, { useState } from "react";

function App() {
  const [inputField, setInputField] = useState("");
  const [items, setItems] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEdit, setIsEdit] = useState("");
  const addItem = () => {
    if (inputField == "") {
      alert("Please Enter something");
    }

    // Agr input field me data hai and toggle btn false h toh means
    // Edit Item pr click h
    if (inputField && !toggleBtn) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEdit) {
            return { ...elem, name: inputField };
          }
          return elem;
        })
      );
      setInputField("");
      setToggleBtn(false);
      setIsEdit(null);
    } else {
      let newEntry = {
        id: new Date().getTime().toLocaleString(),
        name: inputField,
      };

      setItems([...items, newEntry]);
      setInputField("");
      console.log(items);
    }
  };

  const editItem = (id) => {
    // alert(id);
    // Step 1 -> Fetch the edit item
    const editItem = items.find((elem) => {
      return elem.id == id;
    });

    // 2nd step -> Input field me likha hua aaje
    setInputField(editItem.name);

    // 3rd step -> Toggle Functionality means edit par click kre to edit item show hoye
    setToggleBtn(false);

    // 4th step -> Item kidr add hora hai, udr id bhi bhjege and AddItem isme hum
    // setItem ko setKrege voi item jo sirf update hui h
    setIsEdit(id);
  };

  const removeItem = (id) => {
    // alert(id);
    const newArr = items.filter((elem) => {
      return elem.id !== id;
    });

    setItems(newArr);
  };
  return (
    <div className="container">
      <div className="todo">
        <h1>Todo List</h1>

        <div className="inputBox" style={{ marginTop: "2vmax" }}>
          {/* <label htmlFor="">Add Your Item</label> */}
          <input
            type="text"
            placeholder="Enter your task"
            name="item"
            value={inputField}
            className="inputField"
            onChange={(e) => setInputField(e.target.value)}
          />
          {toggleBtn ? (
            <button onClick={addItem}>Add Your Item</button>
          ) : (
            <button onClick={addItem}>Edit Your Item</button>
          )}
        </div>
        <h1 style={{ padding: "2vmax" }}>YOUR TASK ARE...</h1>

        {items.map((item) => {
          return (
            <div key={item.id} style={{ margin: "1vmax" }}>
              <p style={{ display: "inline-block", margin: "1vmax" }}>
                {item.name}
              </p>
              <button onClick={() => editItem(item.id)}>Edit </button>
              <button
                onClick={() => removeItem(item.id)}
                style={{ margin: "1vmax" }}
              >
                delete{" "}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
