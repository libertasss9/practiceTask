import React from "react";

const InputForm = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  options = [],
  rows = 4,
  required = false,
  className = "",
  pattern,
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={`${className}`}
            required={required}
            pattern={pattern}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`${className}`}
            required={required}
            pattern={pattern}
          />
        );
      case "date":
        return (
          <input
            type="date"
            name={name}
            value={value}
            onChange={onChange}
            className={`${className}`}
            required={required}
            pattern={pattern}
          />
        );
      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${className}`}
            required={required}
          />
        );
    }
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="contact__input-label">
          {label}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default InputForm;
