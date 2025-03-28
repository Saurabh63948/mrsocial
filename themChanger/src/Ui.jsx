import React, { useState } from "react";

function Ui() {
  const [value, setValue] = useState("");
  const [color,setColor]=useState("red");
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(value); // Logs the value when Enter is pressed
      setValue(""); // Clears the input box
    }
  };

  const handleOnChange = (e) => {
    setValue(e.target.value); // Updates the state with the current input value
    setColor(e.target.value);
  };

  return (
    <>
      <div
        style={{
          backgroundColor:`${color}`,
          width: "200px",
          height: "200px",
          border: "3px solid black",
        }}
      ></div>
      <input
        type="text"
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
    </>
  );
}

export default Ui;
