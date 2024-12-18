import React from "react";

const SelectBox = ({ props, value, name, onOptionsChange, css }) => {
  return (
    <div>
      <select
        value={value || ""}
        onChange={(e) => onOptionsChange(name, e.target.value)}
        className={css}
      >
        <option value={null}>옵션선택</option>
        {props.map((option) => (
          <option value={option.value}>{option.content}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
