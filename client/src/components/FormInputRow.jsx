import React from "react";

const FormInputRow = ({ labelText, name, value, type, handleChange }) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="px-2 py-1 border border-gray-300 rounded-md "
      />
    </div>
  );
};

export default FormInputRow;
