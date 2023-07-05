import React from "react";

function Input({ name, handleChange, form, text }) {
  return (
    <div className="form-floating mb-3">
      <input
        type="text"
        className="form-control"
        id={name}
        name={name}
        placeholder="name@example.com"
        onChange={handleChange}
        value={form[name]}
      />
      <label className="text-center" htmlFor={name}>
        {text}
      </label>
    </div>
  );
}

export default Input;