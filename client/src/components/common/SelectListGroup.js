import React from "react";
import classnames from "classname";
import PropTypes from "prop-types";
const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map((data) => {
    return (
      <option key={data.label} value={data.value}>
        {data.label}
      </option>
    );
  });

  return (
    <div className="form-gropu">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {/*{info && <small className='form-text text-muted'>{info}</small>}*/}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  options: PropTypes.array.isRequired,
};

export default SelectListGroup;
