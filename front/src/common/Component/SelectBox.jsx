import React from "react";

const SelectBox = ({ options, value, name, onOptionsChange, css }) => {
  return (
    <div>
      <select
        value={value || ""}
        onChange={(e) => onOptionsChange(name, e.target.value)}
        className={css}
      >
        <option value="">옵션선택</option>
        {options.map((option) => (
          <option value={option.value}>{option.content}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
