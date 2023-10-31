import React, { useState } from "react";

// inline destructuring
const Form = ({ formData, handleChange, handleSubmit, handleAdd }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="userId"
        placeholder="userId"
        value={formData.userId}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder="title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="body"
        placeholder="body"
        value={formData.body}
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  );
};

export default Form;
